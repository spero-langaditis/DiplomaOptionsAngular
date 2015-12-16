using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using OptionsApi.Models;

namespace OptionsApi.Controllers
{
    public class YearTermsController : ApiController
    {
        private DiplomaOptions db = new DiplomaOptions();

        // GET: api/YearTerms
        public IQueryable<YearTerm> GetYearTerms()
        {
            return db.YearTerms;
        }

        // GET: api/YearTerms/5
        [ResponseType(typeof(YearTerm))]
        public async Task<IHttpActionResult> GetYearTerm(int id)
        {
            YearTerm yearTerm = await db.YearTerms.FindAsync(id);
            if (yearTerm == null)
            {
                return NotFound();
            }

            return Ok(yearTerm);
        }

        // PUT: api/YearTerms/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutYearTerm(int id, YearTerm yearTerm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != yearTerm.YearTermId)
            {
                return BadRequest();
            }

            db.Entry(yearTerm).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!YearTermExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/YearTerms
        [ResponseType(typeof(YearTerm))]
        public async Task<IHttpActionResult> PostYearTerm(YearTerm yearTerm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.YearTerms.Add(yearTerm);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = yearTerm.YearTermId }, yearTerm);
        }

        // DELETE: api/YearTerms/5
        [ResponseType(typeof(YearTerm))]
        public async Task<IHttpActionResult> DeleteYearTerm(int id)
        {
            YearTerm yearTerm = await db.YearTerms.FindAsync(id);
            if (yearTerm == null)
            {
                return NotFound();
            }

            db.YearTerms.Remove(yearTerm);
            await db.SaveChangesAsync();

            return Ok(yearTerm);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool YearTermExists(int id)
        {
            return db.YearTerms.Count(e => e.YearTermId == id) > 0;
        }
    }
}