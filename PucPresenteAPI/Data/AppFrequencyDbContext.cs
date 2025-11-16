// Local: /Data/ApplicationDbContext.cs

using Microsoft.EntityFrameworkCore;
using PucPresenteAPI;
using PucPresenteAPI.Models;

namespace SeuProjeto.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {}

        // Suas tabelas do banco
        public DbSet<User> Users { get; set; }
        public DbSet<Classes> Classes { get; set; }
        public DbSet<AttendanceCode> AttendanceCodes { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapeamento da tabela Users
            modelBuilder.Entity<User>()
                .Property(u => u.UserRole)
                .HasConversion<string>(); // converte enum para string (MySQL enum)

            // Configuração de relacionamentos
            modelBuilder.Entity<Classes>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(c => c.ProfessorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AttendanceCode>()
                .HasOne<Classes>()
                .WithMany()
                .HasForeignKey(ac => ac.ClassId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Attendance>()
                .HasOne<Classes>()
                .WithMany()
                .HasForeignKey(a => a.ClassId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Attendance>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<Attendance>()
                .HasIndex(a => new { a.ClassId, a.StudentId })
                .IsUnique();
        }
    }
}
