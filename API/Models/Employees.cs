﻿using API.Repositories.Interface;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{

    public class Employees : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender gender { get; set; }
        public enum Gender
        {
            Male,
            Female
        }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime HireDate { get; set; }
        public int Salary { get; set; }
        public virtual Jobs Jobs { get; set; }
        
        #nullable enable
        [ForeignKey("Jobs")]
        public int? Job_Id { get; set; }

        public virtual Employees Manager { get; set; }
        
        [ForeignKey("Manager")]
        public int? Manager_Id { get; set; }
        
        public virtual Departments Departments { get; set; }
        [ForeignKey("Departments")]
        
        public int? Department_Id { get; set; }
        #nullable disable
       
    }
}