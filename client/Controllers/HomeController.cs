using client.Base;
using client.Models;
using client.Repositories.Data;
using client.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace client.Controllers
{
    public class HomeController : BaseController<Boards, BoardsRepository>
    {
        private readonly ILogger<HomeController> _logger;
        readonly BoardsRepository boardsRepository;
        public HomeController(ILogger<HomeController> logger, BoardsRepository boardsRepository):base(boardsRepository)
        {
            _logger = logger;
            this.boardsRepository = boardsRepository;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Chart()
        {
            return View();
        }
        [HttpDelete]
        public JsonResult DeleteBoard(int BoardId)
        {
            var result = boardsRepository.DeleteBoard(BoardId);
            return Json(result);
        }

        [HttpPost]
        public JsonResult Create(CreateBoardVM createBoardVM)
        {
            var result = boardsRepository.Create(createBoardVM);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetbyOwner(int OwnerId)
        {
            var result = boardsRepository.GetbyOwner(OwnerId);
            return Json(result);
        }
        [HttpGet]
        public JsonResult GetbyMember(int MemberId)
        {
            var result = boardsRepository.GetbyMember(MemberId);
            return Json(result);
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Forbidden()
        {
            return View("forbidden");
        }
        public IActionResult Unauth()
        {
            return View("Unauth");
        }
        public IActionResult NotFound404()
        {
            return View("NotFound404");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
