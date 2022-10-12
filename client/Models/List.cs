using client.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class List : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }

        public virtual Boards Boards { get; set; }
        [ForeignKey("Board")]
        public int Board_Id { get; set; }
    }
}
