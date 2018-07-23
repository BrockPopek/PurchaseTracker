using System;
using System.Collections.Generic;
using System.Text;
using PurchaseTrackerDataAccess.Model;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PurchaseTrackerDataAccess.Repository
{
    public class PurchaseTrackerRepository
    {
        public async Task<List<Purchase>> GetAll()
        {
            using (var context = new PurchaseTrackerContext())
            {
                var purchases = await context.Purchase
                    .Include(p => p.Category)
                    .OrderBy(p => p.PurchaseDate)
                    .ToListAsync();

                return purchases;
            }
        }

        public async Task<Purchase> GetByID(int purchaseID)
        {
            using (var context = new PurchaseTrackerContext())
            {
                return await context.Purchase
                    .FirstOrDefaultAsync(p => p.PurchaseId == purchaseID);
            }
        }

        public async Task<int> AddPurchase(Purchase purchase)
        {
            using (var context = new PurchaseTrackerContext())
            {
                context.Purchase.Add(purchase);

                return await context.SaveChangesAsync();
            }
        }

        public async Task<int> UpdatePurchase(Purchase purchase)
        {
            using (var context = new PurchaseTrackerContext())
            {
                var updatePurchase = await context.Purchase.FindAsync(purchase.PurchaseId);
                context.Entry(updatePurchase).CurrentValues.SetValues(purchase);

                return await context.SaveChangesAsync();
            }
        }

        public async Task<int> DeleteByID(int purchaseID)
        {
            using (var context = new PurchaseTrackerContext())
            {
                var purchase = await context.Purchase.FindAsync(purchaseID);
                context.Entry(purchase).State = EntityState.Deleted;

                return await context.SaveChangesAsync();
            }
        }
    }
}
