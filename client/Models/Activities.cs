
using client.Repositories.Interface;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class Activities : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public virtual Boards Boards { get; set; }
        [ForeignKey("Boards")]
        public int Board_Id { get; set; }

    } 
}
