Functions can be implemented by using many different computer languages and by using many different platforms. Since this class is not a programming class, I am ok if you want to choose the programming language that you are more familiar with and use the platform that you prefer.

That said, please create 1 (one) function that receives 1 (one) parameter and then returns your name plus that parameter. Example: If the query parameter "keyword" is set to "hello", then your Function should return "YOUR-NAME says hello".

So... If I try to use your REST API like this:

GET http://xxx.xxx.xxx.xxx:3000/say?keyword=hello

Once I send this GET request to your web service in Digital Ocean, it should forward the request to your Function, the function executes, return the response to your web service, and your web service will return the response to me.

In other words, your web service will be a bridge between me and your Function. I know that this scapes the concept of REST, but let's do it in this way because by this time you already have a REST Web Service up and running at Digital Ocean. Just keep in mind that this is just so we can practice Functions... and it is not part of the REST exercise anymore.

Please follow the recommendations:

On your web service, the endpoint should be GET and named "/say"
The query parameter should be "keyword""
You can use whatever technology you want to forward the call to your Funciton
But I think Axios my come handy to help you
You can use AWS Lambda, Azure Function, Google Cloud, etc, to create your Function
You can use any computer language to create your Function
Once you wrote your function and know that it is working
Please copy that source code and add to your repo using the file name "my-function"
So, for example, if you wrote your function in NodeJS
Then create a new file on the same repo as your web service
give it a name of "my-function.js"
Commit and push to GitHub
This will help us to be able to read your function code
This file doesn't need to do anything... it is just for us to be able to read the code you used in your Function
For completing the Assignment (Quiz 09) you will need to:

a) Paste the URL to your web service repo on GitHub containing

>> the changes to your web service

>> the copy of the function code inside the "my-function" file

b) The URL to your Digital Ocean web service

c) The URL that we can use to perform the GET request that will allow us to test your function

If you have any questions about this assignment 09, please use Piazza to send your questions.