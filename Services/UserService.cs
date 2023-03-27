using lesson_1.Models;
using System.Collections.Generic;
using System.Linq;
using lesson_1.Interfaces;
using System.Text.Json;

namespace lesson_1.Services
{

    public class UserService : IUser
    {

        List<User> users { get; }
        private IWebHostEnvironment  webHost;
        private string filePath;

        public UserService(IWebHostEnvironment webHost)
        {
            this.webHost = webHost;
            this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "User.json");
            using (var jsonFile = File.OpenText(filePath))
            {
                users = JsonSerializer.Deserialize<List<User>>(jsonFile.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
        }

        private void saveToFile()
        {
            File.WriteAllText(filePath, JsonSerializer.Serialize(users));
        }

        public List<User> GetAll()
        {
            return users;
        }

        public User Get(int id)
        {
            return users.FirstOrDefault(u => u.Id == id);
        }

        public void Add(User user)
        {
              user.Id=users.Max(u=> u.Id)+1;
              users.Add(user);
              saveToFile();
        }

        public bool Update(int id, User newUser)
        {
            if(newUser.Id!=id)
                return false;
                 var u=users.FirstOrDefault(user=> user.Id==id);
            if(u==null)
                return false;
            u.Id=newUser.Id;
            u.UserName=newUser.UserName;
            u.Password=newUser.Password;

            u.Classification=newUser.Classification;
            saveToFile();
            return true;
        }

        public bool Delete(int id)
        { 
            var u=users.FirstOrDefault(u => u.Id == id);
            if(u==null)
                return false;
            users.Remove(u);
            saveToFile();
            return true;
        }

        public User Login(string userName, string password)
        {
            return users.FirstOrDefault(u=> u.UserName == userName && u.Password == password);
        }
    }
}