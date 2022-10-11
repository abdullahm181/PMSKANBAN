using API.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TaskCard : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }  
        public virtual Card Card { get; set; }
        [ForeignKey("Card")]
        public int Card_Id { get; set; }

    }
}
