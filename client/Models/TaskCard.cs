using client.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class TaskCard : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }  
        public virtual Card Card { get; set; }
        [ForeignKey("Card")]
        public int Card_Id { get; set; }
        public bool Status { get; set; }

    }
}
