using Microsoft.AspNetCore.Mvc;
using PucPresenteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using PucPresenteAPI;

[Route("api/[controller]")]
[ApiController]
public class AppController : ControllerBase
{
    private readonly appServices _appServices;

    public AppController(appServices appServices)
    {
        _appServices = appServices;
    }
    
    [Authorize(Roles = "Aluno")]
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
        // 1️⃣ Pega o ID do professor vindo do Token JWT
        if (!int.TryParse(User.FindFirst("id")?.Value, out int teacherId))
            return Unauthorized(new { message = "ID do professor inválido no token." });

        try
        {
            // 2️⃣ Valida se o usuário existe
            var teacher = await _appServices.GetUserByIdAsync(teacherId);
            if (teacher == null)
                return Unauthorized(new { message = "Professor não encontrado." });

            // 3️⃣ Valida se o usuário realmente é professor
            if (teacher.UserRole != "Professor")
                return Forbid("Usuário não possui permissão de professor.");

            // 4️⃣ Valida se o professor é responsável pela turma
            bool isProfessorOwner = await _appServices.IsProfessorOwnerOfClassAsync(teacherId, classId);
            if (!isProfessorOwner)
                return Forbid("Você não é o professor responsável por esta turma.");

            // 5️⃣ Inicia a chamada
            var response = await _appServices.StartAttendanceAsync(classId, teacherId);

            return StatusCode(201, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro interno ao iniciar a chamada." });
        }
    }


}
