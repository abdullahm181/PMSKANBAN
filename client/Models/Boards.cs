
using client.Repositories.Interface;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class Boards : IEntity
    {
        //Id,Name,Description,CreateDate
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string Description { get; set; }
        public virtual User User { get; set; }
        [ForeignKey("User")]
        public int Owner_Id { get; set; }

        public DateTime CreateDate { get; set; }


    }
}
