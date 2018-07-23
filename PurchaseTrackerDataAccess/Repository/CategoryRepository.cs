using System;
using System.Collections.Generic;
using System.Text;
using PurchaseTrackerDataAccess.Model;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PurchaseTrackerDataAccess.Repository
{
    public class CategoryRepository
    {
        public async Task<List<Category>> GetAll()
        {
            using (var context = new PurchaseTrackerContext())
            {
                var categories = await context.Category
                    .OrderBy(p => p.CategoryName)
                    .ToListAsync();

                return categories;
            }
        }
    }
}
