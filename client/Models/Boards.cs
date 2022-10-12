
using client.Repositories.Interface;
using System;
using System.ComponentModel.DataAnnotations;

namespace client.Models
{
    public class Boards : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string Description { get; set; }

        public DateTime CreateDate { get; set; }


    }
}
