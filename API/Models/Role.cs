using API.Repositories.Interface;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Role : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Level Level { get; set; }
        [ForeignKey("Level")]
        public int Level_Id { get; set; }


    }
}
