using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PurchaseTrackerDataAccess.Model;
using PurchaseTrackerDataAccess.Repository;

namespace PurchaseTrackerWeb.Controllers
{
    [Route("api/[controller]")]
    public class PurchaseController : Controller
    {
        [HttpGet("[action]")]
        public async Task<List<Purchase>> GetAll()
        {
            var repository = new PurchaseTrackerRepository();
            return await repository.GetAll();
        }

        [HttpGet("[action]")]
        public async Task<Purchase> Get(int purchaseID)
        {
            var repository = new PurchaseTrackerRepository();
            return await repository.GetByID(purchaseID);
        }

        [HttpGet("[action]")]
        public async Task<List<Category>> GetCategories()
        {
            var repository = new CategoryRepository();
            return await repository.GetAll();
        }

        [HttpPost("[action]")]
        public async Task<int> Create([FromBody] Purchase purchase)
        {
            var repository = new PurchaseTrackerRepository();
            return await repository.AddPurchase(purchase);
        }

        [HttpPut("[action]")]
        public async Task<int> Edit([FromBody]Purchase purchase)
        {
            var repository = new PurchaseTrackerRepository();
            return await repository.UpdatePurchase(purchase);
        }

        [HttpDelete("[action]")]
        public async Task<int> Delete(int purchaseID)
        {
            var repository = new PurchaseTrackerRepository();
            return await repository.DeleteByID(purchaseID);
        }
    }
}
