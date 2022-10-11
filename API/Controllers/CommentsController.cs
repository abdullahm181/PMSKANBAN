using API.Models;
using API.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Base;
using API.Repositories.Data;

namespace API.Controllers
{
    public class CommentsController : BaseController<Comments, CommentsRepository>
    {
        public CommentsController(CommentsRepository commentsRepository) : base(commentsRepository)
        {
        }

        }
    }
