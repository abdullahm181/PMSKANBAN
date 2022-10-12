using client.Repositories.Interface;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class MemberCard : IEntity
    {
        [Key]
        public int Id { get; set; }
        public virtual User User { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }

        public virtual Card Card { get; set; }
        [ForeignKey("Card")]
        public int Card_Id { get; set; }

    }
}
