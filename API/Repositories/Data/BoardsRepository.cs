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
        public int DeleteBoard(int BoardId)
        {
            var data = Get(BoardId);
            if (data == null)
                return -1;
            //delete board, list yg boardidnya==id, card yg list idnya == id, comment, task, member,invitedmember
            var dataList = myContext.List.Where(a => a.Board_Id == BoardId).ToList();
            var dataMember = myContext.MemberBoard.Where(a => a.Board_Id == BoardId).ToList();
            var dataIvitedMember = myContext.InvitedMembers.Where(a => a.Board_Id == BoardId).ToList();
            foreach (var list in dataList)
            {
                //delete this list + save
                //colect card in this list
                var dataCard= myContext.Card.Where(a => a.List_Id == list.Id).ToList();
                foreach (var card in dataCard)
                {
                    var dataComment = myContext.Comments.Where(a => a.Card_Id == card.Id).ToList();
                    var dataTask = myContext.TaskCard.Where(a => a.Card_Id == card.Id).ToList();
                    foreach (var comments in dataComment) {
                        myContext.Comments.Remove(comments);
                        myContext.SaveChanges();
                    }
                    foreach (var task in dataTask) {
                        myContext.TaskCard.Remove(task);
                        myContext.SaveChanges();
                    }
                    myContext.Card.Remove(card);
                    myContext.SaveChanges();
                }
                myContext.List.Remove(list);
                myContext.SaveChanges();
            }
            foreach (var member in dataMember)
            {
                myContext.MemberBoard.Remove(member);
                myContext.SaveChanges();
            }
            foreach (var invitedMember in dataIvitedMember)
            {
                myContext.InvitedMembers.Remove(invitedMember);
                myContext.SaveChanges();
            }

            myContext.Boards.Remove(data);
            var result = myContext.SaveChanges();
            return result;
        }
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
                    //buat list todo + done"To-do" && Name != "Done"
                    //Id,Name,Order,Board_Id
                    List newListTodo = new List {
                        Name = "To-do",
                        Order = 0,
                        Board_Id= createdBoardId
                    };
                    myContext.List.Add(newListTodo);
                    myContext.SaveChanges();
                    List newListDone = new List
                    {
                        Name = "Done",
                        Order = 1,
                        Board_Id = createdBoardId
                    };
                    myContext.List.Add(newListDone);
                    myContext.SaveChanges();
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
