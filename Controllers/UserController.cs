using Microsoft.AspNetCore.Mvc;
using lesson_1.Models;
using lesson_1.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using lesson_1.Services;


namespace lesson_1.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UserController : ControllerBase
    {
        private IUser user;

        public UserController(IUser user)
        {
            this.user = user;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult<String> Login([FromBody] User user)
        {
            user = this.user.Login(user.UserName, user.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new List<Claim>
            {
                new Claim("Type", user.Classification),
                new Claim("UserName",user.UserName),
                new Claim("Id",user.Id.ToString()),
            };

            var token = TokenService.GetToken(claims);

            return new OkObjectResult(TokenService.WriteToken(token));
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        public IEnumerable<User> Get()
        {
            return this.user.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var u = this.user.Get(id);
            if (u == null)
                return NotFound();
            return u;
        }

        [HttpPost]
        [Authorize(Policy = "Admin")]
        public ActionResult Post(User user)
        {
            this.user.Add(user);
            return CreatedAtAction(nameof(Post), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Admin")]
        public ActionResult Put(int id, User user)
        {
            if (!this.user.Update(id, user))
                return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public ActionResult Delete(int id)
        {
            if (!this.user.Delete(id))
                return NotFound();
            return NoContent();
        }
    }
}
