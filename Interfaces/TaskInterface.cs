using lesson_1.Models;
using System.Collections.Generic;

namespace lesson_1.Interfaces
{

    public interface ITask
    {
        public IEnumerable<MyTask> GetAll(int id);

        public MyTask Get(int id);

        public void Add(MyTask task,int id);

        public bool Update(int id, MyTask newTask);

        public bool Delete(int id);
    }

}