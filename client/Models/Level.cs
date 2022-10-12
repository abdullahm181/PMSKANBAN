using client.Repositories.Interface;
using System.ComponentModel.DataAnnotations;

namespace client.Models
{
    public class Level : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
    }
}
