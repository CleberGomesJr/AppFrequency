using Microsoft.AspNetCore.Mvc;
using PucPresenteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using PucPresenteAPI;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Aluno")]
public class AppController : ControllerBase
{
    private readonly appServices _appServices;

    public AppController(appServices appServices)
    {
        _appServices = appServices;
    }

    [HttpPost("Validar")]
    public async Task<IActionResult> Validate([FromBody] AttendanceValidationRequest request)
    {
        if(!int.TryParse(User.FindFirst("id")?.Value, out int studentId))
           return Unauthorized(new {message = "ID do usuário inválido no token"});

        try
        {
            bool sucess = await _appServices.ValidateAttendanceAsync(request.Code, studentId);

            if (sucess)
                return StatusCode(201, new { message = "Presença registrada com sucesso" });

            return StatusCode(500, new { message = "Falha ao registrar presença" });
        }
        catch (Exception ex)
        {
            return ex.Message switch
            {
                "Código de chamada inválido." => NotFound(new { message = ex.Message }),
                "O tempo para registrar a presença expirou" => Conflict(new {message = ex.Message}),
                "Presença já confirmada para essa aula." => Conflict(new { messagew = ex.Message }),

                _ => StatusCode(500, new { message = "Erro interno ao processar a chamada." })
            };
        }
    }

    [HttpPost("start/{classId}")]
    [Authorize(Roles = "Professor")]
    public async Task<IActionResult> StartAttendance(int classId)
    {
        if(!int.TryParse(User.FindFirst("id")?.Value, out int teacherId))
            return Unauthorized(new {message = "ID do professor inválido no token."});

        try
        {
            var response = await _appServices.StartAttendanceAsync(classId, teacherId);

            return StatusCode(201, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new {message = "Erro interno ao iniciar a chamada." });
        }
    }
}