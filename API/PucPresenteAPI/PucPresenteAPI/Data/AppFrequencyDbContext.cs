// Local: /Data/ApplicationDbContext.cs

using Microsoft.EntityFrameworkCore;
using PucPresenteAPI;

namespace SeuProjeto.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        // O construtor é necessário para receber a configuração de conexão
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {}

        // Representa as tabelas no seu banco de dados MySQL
        public DbSet<User> Users { get; set; }
        public DbSet<Classes> Classes { get; set; }
        public DbSet<AttendanceCode> AttendanceCodes { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        // Opcional: Para configurar detalhes do modelo, como chaves compostas e índices
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Exemplo: Configurar o índice de unicidade que corrigimos
            modelBuilder.Entity<Attendance>()
                .HasIndex(a => new {a.StudentId, a.AttendanceCodeId})
                .IsUnique();
                
            // Mapeia o ENUM UserRole como string, já que o MySQL tem ENUM
            modelBuilder.Entity<User>()
                .Property(u => u.UserRole)
                .HasConversion<string>(); 
        }
    }
}