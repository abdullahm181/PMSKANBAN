using API.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MemberBoard : IEntity
    {
        [Key]
        public int Id { get; set; }

        public Status status { get; set; }
        public enum Status
        {
            Owner,
            Colaborator
        }

        public virtual User User { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }

        public virtual Boards Boards { get; set; }
        [ForeignKey("Board")]
        public int Board_Id { get; set; }

    }
}
