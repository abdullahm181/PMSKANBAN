using System.Collections.Generic;
using System.Net;

namespace client.Repositories.Interface
{
    public interface IGeneralRepository<Entity>
        where Entity : class, IEntity
    {
        public IEnumerable<Entity> Get();
        public Entity Get(int? id);
        public Entity Post(Entity entity);
        public HttpStatusCode Put(Entity entity);
        public HttpStatusCode Delete(int id);
    }
}
