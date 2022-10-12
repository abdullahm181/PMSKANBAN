
using client.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace client.Models
{
    public class Comments : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public virtual Card Card { get; set; }
        [ForeignKey("Card ")]
        public int Card_Id { get; set; }

        public virtual User User { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }
    }
}

