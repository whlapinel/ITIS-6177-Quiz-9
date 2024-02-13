-- 1 POST request endpoint
-- POST <ip-address:port>/customers/
-- creates new row 

-- 1 PATCH request endpoint
-- PATCH <ip-address:port>/customers/:id
-- edits the row where customer_code = id
-- request body should specify the field to be modified and the new value

-- 1 PUT request endpoint
-- PUT <ip-address:port>/customers/:id
-- edits the row where customer_code = id
-- replaces current row with new data
-- request body should include all fields and values

-- 1 DELETE request endpoint
-- DELETE <ip-address:port>/customers/:id
-- id = customer code