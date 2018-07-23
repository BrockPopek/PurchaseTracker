/*
Post-Deployment Script Template
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.
 Use SQLCMD syntax to include a file in the post-deployment script.
 Example:      :r .\myfile.sql
 Use SQLCMD syntax to reference a variable in the post-deployment script.
 Example:      :setvar TableName MyTable
               SELECT * FROM [$(TableName)]
--------------------------------------------------------------------------------------
*/

IF NOT EXISTS(SELECT 1 FROM dbo.Category WHERE CategoryID = 1)
BEGIN
	INSERT INTO dbo.Category
		(CategoryID, CategoryName) VALUES (1, 'Meals')
END

IF NOT EXISTS(SELECT 1 FROM dbo.Category WHERE CategoryID = 2)
BEGIN
	INSERT INTO dbo.Category
		(CategoryID, CategoryName) VALUES (2, 'Utilities')
END

IF NOT EXISTS(SELECT 1 FROM dbo.Category WHERE CategoryID = 3)
BEGIN
	INSERT INTO dbo.Category
		(CategoryID, CategoryName) VALUES (3, 'Miscellaneous')
END

-- Insert records if there are not any.
IF NOT EXISTS(SELECT 1 FROM dbo.Purchase)
BEGIN
	INSERT INTO dbo.Purchase
		(CategoryID, PayeeName, Amount, PurchaseDate, Memo) VALUES 
		(1, 'Jack Smith', 10.50, GETUTCDATE(), 'Meal at Taco Stand')

	INSERT INTO dbo.Purchase
		(CategoryID, PayeeName, Amount, PurchaseDate, Memo) VALUES 
		(2, 'Bill Williams', 55.75, GETUTCDATE(), 'Gas Bill')

	INSERT INTO dbo.Purchase
		(CategoryID, PayeeName, Amount, PurchaseDate) VALUES 
		(3, 'John Brent', 20.00, GETUTCDATE())
END
