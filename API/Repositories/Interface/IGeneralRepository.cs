using System.Collections.Generic;

namespace API.Repositories.Interface
{
    public interface IGeneralRepository<ObjectName> where ObjectName : class, IEntity
    {
        List<ObjectName> Get();

        ObjectName Get(int id);

        ObjectName Post(ObjectName objectName);

        int Put(int id, ObjectName objectName);

        int Delete(int id);
    }
}
