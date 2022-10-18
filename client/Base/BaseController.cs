using client.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace client.Base
{
    public class BaseController<TEntity, TRepository> : Controller
           where TEntity : class, IEntity
           where TRepository : IGeneralRepository<TEntity>
    {
        TRepository repository;


        public BaseController(TRepository repository)
        {

            this.repository = repository;
        }
        [HttpGet]
        public JsonResult GetAll()
        {
            var result = repository.Get();
            return Json(result);
        }

        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = repository.Get(id);
            return Json(result);
        }

        [HttpPost]
        public JsonResult Post(TEntity entity)
        {
            var result = repository.Post(entity);
            return Json(result);
        }

        [HttpPut]
        public JsonResult Put(TEntity entity)
        {
            var result = repository.Put(entity);
            return Json(result);
        }

        [HttpDelete]
        public JsonResult DeleteEntity(int id)
        {
            var result = repository.Delete(id);
            return Json(result);
        }

    }
}
