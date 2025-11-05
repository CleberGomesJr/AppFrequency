namespace PucPresenteAPI;

public class Discipline
{
    public int Id { get; set; }
    public string Name { get; set; }
    //Quantidade de aulas por semestre pra fazer o cálculo de porcentagem para os alunos, etc.
    public int ClassNumber { get; set; }
    
}