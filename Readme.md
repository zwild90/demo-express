# References
[Expressjs](https://expressjs.com/en/4x/api.html#express)
[Axios](https://axios-http.com/docs/intro)
[Nodejs:Readline](https://nodejs.org/api/readline.html)

# Installing Packages
`npm ci`

in package.json, in the scripts section you can see that there are a list of commands to run, to execute different js files

# Running server.js
### Terminal 1
`npm run server:0` will start the server `0-server.js`, on localhost:3000

### Web page
you can type localhost:3000 in the url and you can see the response on the page

### Terminal 2
or you can make a curl command, `curl localhost:3000` and you will see a response in the terminal


# Running server-routes.js
### Terminal 1
`npm run server:1` will start the server `1-server-routes.js`, on localhost:3000

### Terminal 2
run the following: (when running curl commands -X flag defaults to GET, that why its not defined for the curl command above)
`curl -X GET localhost:3000`

`curl -X GET localhost:3000/one`

`curl -X POST localhost:3000/two`

`curl -X PUT localhost:3000/three`

`curl -X DELETE localhost:3000/four`

# Running server-req-body.js
### Terminal 1
`npm run server:2` will start the server `2-server-req-body.js`, on localhost:3000

in this example we start with a list of users that have a name and id.

because this data isn't being stored in a database, everytime the server is killed, the list of users will be reinitialized.

here we are using each of our CRUD (Create, Read, Update, and Delete) operations

each of our endpoints have validation on the requests to notify the client why their request has failed

GET -> Read
POST -> Create
PUT -> Update
DELETE -> Delete

POST and PUT are the only two that can have a body in the request, GETS and DELETE cannot

### Terminal 2
`npm run client:2` will start `2-client-req-body.js`

the client is using axios to make http calls to our api

in the function `main`, you can modify the function to make different api calls to modify and read our list of users
