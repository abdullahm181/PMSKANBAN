using client.Models;

namespace client.Repositories.Data
{
    public class CardRepository:GeneralRepository<Card>
    {
        public CardRepository(string request = "Card/") : base(request)
        {

        }
    }
}
