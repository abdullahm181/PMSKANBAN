using API.Context;
using API.Models;
using API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class BoardsRepository : GeneralRepository<Boards, MyContext>
    {
        MyContext myContext;
        public BoardsRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public List<Boards> GetbyOwner (int OwnerId){
            var data = myContext.Boards.Where(a => a.Owner_Id == OwnerId).ToList();
            return data;
        }
        public List<Boards> GetbyMember(int MemberId)
        {
            List<Boards> boards= new List<Boards>();
            var data = myContext.MemberBoard.Where(a => (a.User_Id == MemberId&&a.Status=="member")).ToList();
            foreach (var memberBoard in data)
            {
                var board = myContext.Boards.FirstOrDefault(a => (a.Id== memberBoard.Board_Id));
                boards.Add(board);
            }
            return boards;
        }
        public (int,Boards) Create(CreateBoardVM createBoard) 
        {
            //check if Name already exist in user scope 
            if (myContext.Boards.Any(x => (x.Name == createBoard.Name && x.Owner_Id == createBoard.User_Id)))
                return (-2,null);
            Boards boards = new Boards
            {
                Name = createBoard.Name,
                Description = createBoard.Description,
                CreateDate = createBoard.CreateDate,
                Owner_Id=createBoard.User_Id
            };
            //add board
            myContext.Boards.Add(boards);
            var resultCreateBoard = myContext.SaveChanges();
            if (resultCreateBoard > 0)
            {
                var createdBoardId = myContext.Boards.SingleOrDefault(x => (x.Name.Equals(createBoard.Name)&& x.Owner_Id.Equals(createBoard.User_Id))).Id;
                MemberBoard memberBoard = new MemberBoard
                {
                    Status = createBoard.Status,
                    User_Id=createBoard.User_Id,
                    Board_Id=createdBoardId
                };
                myContext.MemberBoard.Add(memberBoard);
                var resultCreateMemberBoard = myContext.SaveChanges();
                if (resultCreateMemberBoard > 0)
                {
                    return (resultCreateMemberBoard, boards);
                }
                else
                {
                    //Delete Board
                    var DataUser = myContext.Boards.Find(createdBoardId);
                    myContext.Boards.Remove(DataUser);
                    myContext.SaveChanges();
                }
            }
            return (0,null);
        }

    }
}
