using client.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class MemberBoard : IEntity
    {
        [Key]
        public int Id { get; set; }

        public string status { get; set; }
        public virtual User User { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }

        public virtual Boards Boards { get; set; }
        [ForeignKey("Board")]
        public int Board_Id { get; set; }
    }
}
