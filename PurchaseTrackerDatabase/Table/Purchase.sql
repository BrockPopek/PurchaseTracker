CREATE TABLE [dbo].[Purchase]
(
	[PurchaseID] INT NOT NULL PRIMARY KEY IDENTITY,
    [CategoryID] INT NOT NULL,
    [PayeeName] VARCHAR(200) NOT NULL,
    [Amount] DECIMAL(10, 2) NOT NULL,
    [PurchaseDate] DATETIME2 NOT NULL,
    [Memo] VARCHAR(500) NULL,
    CONSTRAINT [FK_Purchase_Category] FOREIGN KEY (CategoryID) REFERENCES [Category]([CategoryID]),

)
