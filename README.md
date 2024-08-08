# KoinX-Assignment

Objective: Develop a server side application using Node.js and MongoDB and complete the following tasks.

## Task 1

- Implement an API that accepts a CSV file as the input, parses the data present in it and stores it in a database.
    - CSV file to be taken as input:
        
        [KoinX Assignment CSV Sample.csv](https://prod-files-secure.s3.us-west-2.amazonaws.com/d529bad7-781a-4667-ae70-719d4793d77d/d14b32f7-e76e-4277-b587-b782d795cfda/KoinX_Assignment_CSV_Sample.csv)
        
    - Each row has details about a cryptocurrency trade. The `UTC_Time` column mentions when the trade happened. `Operation` column mentions whether it’s a buy trade or a sell trade. `Market` gives the market in which the trade happened. The `Market` column’s values have 2 `/` separated assets. The asset on the left is called the `base coin` and the asset on the right is called the `quote coin`. For example, in the first row in the above sample file, `BTC` is the `base coin` and `INR` is the `quote coin`. The `Buy/Sell Amount` column has the quantity of `base coin` being bought or sold. For example, in the first row, 25 BTC is being bought. `Price` column’s values mention the price at which the `base coin` is bought or sold in terms of the `quote coin`.
    - Design a database schema and then store the trade data parsed from the CSV in it. Assume that all of these trades that we would upload belong to the same account.
