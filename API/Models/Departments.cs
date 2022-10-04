using API.Repositories.Interface;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Departments:IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
