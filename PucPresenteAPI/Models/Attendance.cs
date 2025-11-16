using System.ComponentModel.DataAnnotations.Schema;

namespace PucPresenteAPI;

public class Attendance
{
    public int Id { get; set; }
    public int ClassId { get; set; }
    public int StudentId { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public int AttendanceCodeId { get; set; }
    
    [NotMapped]
    public DateOnly AttendanceDate => DateOnly.FromDateTime(Timestamp.Date);
}