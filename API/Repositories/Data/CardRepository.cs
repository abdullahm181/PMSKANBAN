using API.Context;
using API.Models;
using API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{

    public class CardRepository : GeneralRepository<Card, MyContext>
    {
        MyContext myContext;
        public CardRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public List<CardDisplayVM> GetByListId(int ListId)
        {
            List<CardDisplayVM> cardDisplays = new List<CardDisplayVM>();
            var data = myContext.Card.Where(a => a.List_Id == ListId).OrderBy(a => a.Order).ToList();
            foreach (var card in data)
            {
                var comment = myContext.Comments.Where(a => a.Card_Id == card.Id).ToList();
                var taskCard = myContext.TaskCard.Where(a => a.Card_Id == card.Id).ToList();
                CardDisplayVM NewcardDisplayVM = new CardDisplayVM() {
                    Id = card.Id,
                    Name = card.Name,
                    numbercomment = comment.Count,
                    numberTaskItem =taskCard.Count,
                    personIncharge = card.PersonInCharge
                };
                cardDisplays.Add(NewcardDisplayVM);
            }
            
            return cardDisplays;
        }
    }
}
