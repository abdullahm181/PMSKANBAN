using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("LevelId")]
        public virtual Level Level { get; set; }
        public int LevelId { get; set; }

        public virtual List<User> Users { get; set; }

    }
}
