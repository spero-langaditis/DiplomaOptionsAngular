using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DiplomaDataModel.Models;

namespace OptionsWebSite.Controllers
{
    public class ChoiceController : Controller
    {
        private DiplomaDataModelContext db = new DiplomaDataModelContext();

        // GET: Choice
        //[Authorize(Roles ="Admin")]
        public ActionResult Index()
        { 

            return View();
        }
    }
}
