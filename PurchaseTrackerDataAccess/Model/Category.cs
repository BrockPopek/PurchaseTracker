using System;
using System.Collections.Generic;

namespace PurchaseTrackerDataAccess.Model
{
    public partial class Category
    {
        public Category()
        {
            Purchase = new HashSet<Purchase>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public ICollection<Purchase> Purchase { get; set; }
    }
}
