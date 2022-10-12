
using client.Repositories.Interface;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace client.Models
{
    public class Card : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int  Order { get; set; }
        public string Description { get; set; }
        public DateTime DeadLine { get; set; }
        public virtual List List { get; set; }
        [ForeignKey("List")]
        public int List_Id { get; set; }

        public virtual MemberBoard MemberBoard { get; set; }
        [ForeignKey("MemberBoard")]
        public int PersonInCharge { get; set; }
    }
}
