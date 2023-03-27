using lesson_1.Models;
using System.Collections.Generic;

namespace lesson_1.Interfaces
{

    public interface ITask
    {
        public List<MyTask> GetAll();

        public MyTask Get(int id);

        public void Add(MyTask task);

        public bool Update(int id, MyTask newTask);

        public bool Delete(int id);
    }

}