using API.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class User:IEntity
    {
        public virtual Employees Employees { get; set; }


        [Key]
        [ForeignKey("Employees")]
        public int Id { get; set; }
        public string UserName { get; set; }
      
        public string Password { get; set; }

    }
}
