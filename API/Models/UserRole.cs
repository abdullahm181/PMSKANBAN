using API.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class UserRole : IEntity
    {
        [Key]
        public int Id { get; set; }

        public virtual User User { get; set; }

        [Required]
        [ForeignKey("User")]
        public int User_Id { get; set; }
        public virtual Role Role { get; set; }

        [Required]
        [ForeignKey("Role")]
        public int Role_Id { get; set; }
    }
}
