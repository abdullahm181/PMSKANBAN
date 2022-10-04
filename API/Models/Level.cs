using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Level
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
    }
}
