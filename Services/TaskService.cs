using lesson_1.Models;
using System.Collections.Generic;
using System.Linq;
using lesson_1.Interfaces;
using System.Text.Json;


namespace lesson_1.Services
{

    public class TaskService : ITask
    {

        List<MyTask> tasks { get; }
        private IWebHostEnvironment webHost;
        private string filePath;

        public TaskService(IWebHostEnvironment webHost)
        {
            this.webHost = webHost;
            this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "Task.json");
            using (var jsonFile = File.OpenText(filePath))
            {
                tasks = JsonSerializer.Deserialize<List<MyTask>>(jsonFile.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
        }

        private void saveToFile()
        {
            File.WriteAllText(filePath, JsonSerializer.Serialize(tasks));
        }

        public IEnumerable<MyTask> GetAll(int id)
        {
            return tasks.Where((task) => task.UserId == id);
        }

        public MyTask Get(int id)
        {
            return tasks.FirstOrDefault(t => t.Id == id);
        }

        public void Add(MyTask task, int id)
        {
            task.UserId = id;
            task.Id = tasks.Max(t => t.Id) + 1;
            tasks.Add(task);
            saveToFile();
        }

        public bool Update(int id, MyTask newTask)
        {
            if (newTask.Id != id)
                return false;
            var t = tasks.FirstOrDefault(task => task.Id == id);
            if (t == null)
                return false;
            t.Id = newTask.Id;
            t.Description = newTask.Description;
            t.IsDone = newTask.IsDone;
            saveToFile();
            return true;
        }

        public bool Delete(int id)
        {
            var t = tasks.FirstOrDefault(t => t.Id == id);
            if (t == null)
                return false;
            tasks.Remove(t);
            saveToFile();
            return true;
        }
    }
}