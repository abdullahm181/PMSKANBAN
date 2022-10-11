using API.Base;
using API.Context;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BoardsController : BaseController<Boards,BoardsRepository>
    {
        public BoardsController(BoardsRepository boardsRepository) : base(boardsRepository)
    {


    }
}
    }
