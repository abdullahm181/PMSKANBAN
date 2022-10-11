using API.Repositories.Interface;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Level : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
    }
}
