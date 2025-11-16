using PucPresenteAPI.Models;
using SeuProjeto.API.Data;

namespace PucPresenteAPI.Services;
using QRCoder;
using Microsoft.EntityFrameworkCore;
using System;


public class appServices
{
    private readonly ApplicationDbContext _context;
    private const int CodeDurationMinutes = 2;

    public appServices(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<bool> IsProfessorAsync(int userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        return user != null && user.UserRole == "Professor";
    }

    public async Task<Classes?> GetClassByIdAsync(int classId)
    {
        return await _context.Classes.Include(c=> c.ProfessorId).FirstOrDefaultAsync(c => c.Id == classId);
    }

    public async Task<AttendanceCode?> GetActiveAttendanceCodeAsync(int classId)
    {
        var now = DateTimeOffset.UtcNow;

        return await _context.AttendanceCodes.
            Where(ac => ac.ClassId == classId && ac.ExpiresAt > now).
            OrderByDescending(ac => ac.GeneratedAt).FirstOrDefaultAsync();
    }
    
    public async Task<List<Attendance>> GetAttendanceListAsync(int classId)
    {
        return await _context.Attendances
            .Where(a => a.ClassId == classId)
            .Include(a => a.StudentId)
            .OrderBy(a => a.Timestamp)
            .ToListAsync();
    }
    
    //Método para registrar presença manual
    public async Task<bool> RegisterAttendanceManualAsync(int classId, int studentId)
    {
        bool alreadyAttended = await _context.Attendances
            .AnyAsync(a => a.ClassId == classId && a.StudentId == studentId);

        if (alreadyAttended)
            return false;

        var attendance = new Attendance
        {
            ClassId = classId,
            StudentId = studentId,
            Timestamp = DateTimeOffset.UtcNow
        };

        _context.Attendances.Add(attendance);
        await _context.SaveChangesAsync();

        return true;
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

    private string GenerateRandomCode(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        
        return new string(Enumerable.Repeat(chars, length).
            Select(s => s[random.Next(s.Length)]).ToArray());
    }
    
    public async Task<bool> IsProfessorOwnerOfClassAsync(int professorId, int classId)
    {
        var classe = await _context.Classes.FirstOrDefaultAsync(c => c.Id == classId);
        if (classe == null) return false;

        return classe.ProfessorId == professorId;
    }
    
    public async Task<AttendanceStartResponse> StartAttendanceAsync(int classId, int teacherId)
    {
        string uniqueCode = GenerateRandomCode(4);
        DateTimeOffset generatedAt = DateTimeOffset.UtcNow;
        DateTimeOffset expiresAt = generatedAt.AddMinutes(CodeDurationMinutes);

        var newCodeEntity = new AttendanceCode
        {
            ClassId = classId,
            TeacherId = teacherId,
            Code = uniqueCode,
            GeneratedAt = generatedAt,
            ExpiresAt = expiresAt,
        };
        
        _context.AttendanceCodes.Add(newCodeEntity);
        await _context.SaveChangesAsync();

        string qrDataContent = $"{uniqueCode}-{newCodeEntity.Code}-{teacherId}";
        
        string qrCodeBase64 = GenerateQrCodeBase64(qrDataContent);

        return new AttendanceStartResponse
        {
            Code = uniqueCode,
            QrCodeBase64 = qrCodeBase64,
            ExpiresAt = expiresAt,
            DurationMinutes = CodeDurationMinutes
        };

    }
    
}