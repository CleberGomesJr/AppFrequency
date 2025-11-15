using SeuProjeto.API.Data;

namespace PucPresenteAPI.Services;
using QRCoder;
using Microsoft.EntityFrameworkCore;


public class appServices
{
    private readonly ApplicationDbContext _context;

    public appServices(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public string GenerateQrCodeBase64(string data)
    {
        QRCodeGenerator qrGenerator = new QRCodeGenerator();
        QRCodeData qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        
        BitmapByteQRCode qrCode = new BitmapByteQRCode(qrCodeData);
        byte[] qrCodeBytes = qrCode.GetGraphic(20);
        
        return Convert.ToBase64String(qrCodeBytes);
    }

    public async Task<bool> ValidateAttendanceAsync(string code, int studentId)
    {
        var attendanceCode = await _context.AttendanceCodes.FirstOrDefaultAsync(c => c.Code == code);
    
        if(attendanceCode == null)
            throw new Exception("Código de chamada inválido");
        if (attendanceCode.ExpiresAt < DateTimeOffset.UtcNow)
            throw new Exception("O tempo para registrar a presença expirou.");
        
        var alreadyAttended = await _context.Attendances.AnyAsync(a => 
            a.StudentId == studentId && 
            a.AttendanceCodeId == attendanceCode.Id
        ); 

        if (alreadyAttended)
        {
            throw new Exception("Presença já registrada para esta aula.");
        }
        
        var attendanceRecord = new Attendance 
        {
            StudentId = studentId,
            ClassId = attendanceCode.ClassId, 
            AttendanceCodeId = attendanceCode.Id,
            Timestamp = DateTimeOffset.UtcNow
        };

        _context.Attendances.Add(attendanceRecord);
        int changes = await _context.SaveChangesAsync();

        return changes > 0;
    }
    
}