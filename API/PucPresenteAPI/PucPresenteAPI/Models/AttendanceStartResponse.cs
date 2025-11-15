namespace PucPresenteAPI;

public class AttendanceStartResponse
{
    public string Code  { get; set; }
    public string QrCodeBase64 { get; set; }
    public DateTimeOffset ExpiresAt { get; set; }
    public int DurationMinutes { get; set; } = 2;
}