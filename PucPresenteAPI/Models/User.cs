using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PucPresenteAPI.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("password_hash")]
        public string PasswordHash { get; set; }

        [Required]
        [Column("full_name")]
        public string FullName { get; set; }

        [Required]
        [Column("user_role")]
        public string UserRole { get; set; } // Aluno, Professor, Admin
    }
}