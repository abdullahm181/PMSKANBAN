using API.Repositories.Interface;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Jobs:IEntity
    {
        [Key]
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public int MinSalary { get; set; }
        public int MaxSalary { get; set; }

    }
}
