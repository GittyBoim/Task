using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using lesson_1.Models;
using lesson_1.Interfaces;

namespace lesson_1.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class TasksController : ControllerBase
    {
        private ITask task;


        public TasksController(ITask task)
        {
            this.task = task;
        }


        [HttpGet]
        public IEnumerable<MyTask> Get()
        {
            return this.task.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<MyTask> Get(int id)
        {
            var t=this.task.Get(id);
            if(t == null)
                return NotFound();
            return t;
        }

        [HttpPost]
        public ActionResult Post(MyTask task)
        {
            this.task.Add(task);
            return CreatedAtAction(nameof(Post), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id,MyTask task)
        {
            if (!this.task.Update(id,task))
                return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if(!this.task.Delete(id))
                return NotFound();
            return NoContent(); 
        }
    }
}