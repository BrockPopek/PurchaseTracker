using System;
using System.Collections.Generic;

namespace PurchaseTrackerDataAccess.Model
{
    public partial class Purchase
    {
        public int PurchaseId { get; set; }
        public int CategoryId { get; set; }
        public string PayeeName { get; set; }
        public decimal Amount { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Memo { get; set; }

        public Category Category { get; set; }
    }
}
