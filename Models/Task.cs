using System;

namespace lesson_1.Models
{
    public class MyTask
    {
        public int UserId { get; set; }

        public int Id { get; set; }

        public string Description { get; set; }
        
        public bool IsDone { get; set; }
    }
}