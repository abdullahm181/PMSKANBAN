using API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController<ObjectName, TRepository> : ControllerBase
        where ObjectName : class, IEntity
        where TRepository : IGeneralRepository<ObjectName>
    {
        TRepository repository;
        public BaseController(TRepository repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var data = repository.Get();
            return Ok(new { result = 200, data = data });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var data = repository.Get(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(new { result = 200, data = data });

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ObjectName objectName)
        {
            if (!string.IsNullOrWhiteSpace(id.ToString()))
            {
                var result = repository.Put(id, objectName);
                if (result > 0)
                    return Ok(new { result = 200, message = "successfully updated" });
                else if (result == -1)
                    return NotFound();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Post(ObjectName objectName)
        {
            if (ModelState.IsValid)
            {

                var result = repository.Post(objectName);
                if (result != null)
                    return Ok(new { result = 200, data = result });
            }
            return BadRequest();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            if (!string.IsNullOrWhiteSpace(id.ToString()))
            {
                var result = repository.Delete(id);
                if (result > 0)
                    return Ok(new { result = 200, message = "successfully Deleted" });
                else if (result == -1)
                    return NotFound();
            }

            return BadRequest();

        }
    }
}
