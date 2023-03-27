using lesson_1.Models;
using System.Collections.Generic;

namespace lesson_1.Interfaces
{

    public interface IUser
    {
        public List<User> GetAll();

        public User Get(int id);

        public void Add(User user);

        public bool Update(int id, User newUser);

        public bool Delete(int id);

        public User Login(string userName, string password);
    }

}