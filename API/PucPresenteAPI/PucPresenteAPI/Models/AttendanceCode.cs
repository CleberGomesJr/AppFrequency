namespace PucPresenteAPI;

public class AttendanceCode
{
    public int Id { get; set; }
    public int ClassId { get; set; }
    public string Code { get; set; }
    public DateTimeOffset GeneratedAt { get; set; }
    public DateTimeOffset ExpiresAt { get; set; }
    public int TeacherId { get; set; }
}