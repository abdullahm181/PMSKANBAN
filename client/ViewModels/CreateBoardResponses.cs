using client.Models;

namespace client.ViewModels
{
    public class CreateBoardResponses
    {
        public int result { get; set; }
        public string message { get; set; }
        public Boards data { get; set; }
    }
}
