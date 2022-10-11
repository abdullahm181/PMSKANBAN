
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> dbContext) : base(dbContext)
        {

        }
        //Buat pakai relasi otomatis
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }
        public DbSet<Activities> Activities { get; set; }
        public DbSet<Boards> Boards { get; set; }
        public DbSet<Card> Card { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Departments> Departments { get; set; }
        public DbSet<Employees> Employees { get; set; }
        public DbSet<InvitedMembers> InvitedMembers { get; set; }
        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<Level> Level { get; set; }
        public DbSet<List> List { get; set; }
        public DbSet<MemberBoard> MemberBoard { get; set; }
        public DbSet<MemberCard> MemberCard { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<TaskCard> TaskCard { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }

    }
}
