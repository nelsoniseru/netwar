# backend
Technology used:
* Nodejs
* Typescript
* Expressjs
* Mongodb
* Redis

Steps to take: 
* clone the repo with this command git clone ""
* create an env file
* make sure redis is running in your computer
* make sure you have mongodb installed and running
* cd into the folder and enter this command "yarn install"
* cd into the folder and enter this command "yarn run start:dev"

Env file parameter
DB_URL_LOCAL = 
EXPIRES_IN =
JWT_SECRET =

User Route

Post 
token:false
http://localhost:3002/api/v1/users {
    username:"nelson",
    email:"nelsoniseru08@gmail.com,
    password:"Nelson@2023"
}

Get  
token:true
http://localhost:3002/api/v1/users

token:true
http://localhost:3002/api/v1/users/:id

Delete
token:true
http://localhost:3002/api/v1/users/:id

Put  
token:true
http://localhost:3002/api/v1/users/:id {
    username:"nelson",
    email:"nelsoniseru08@gmail.com,
    password:"Nelson@2024"
   
}


Auth Route
Post  
token:false
http://localhost:3002/api/v1/login {
    email:"nelsoniseru08@gmail.com,
    password:"Nelson@2024"
}

Product Route


Post 
token:true
http://localhost:3002/api/v1/products {
    username:"Gucci",
    email:900,
}

Get  
token:true
http://localhost:3002/api/v1/products

token:true
http://localhost:3002/api/v1/products/:id

Delete
token:true
http://localhost:3002/api/v1/products/:id

Put  
token:true
http://localhost:3002/api/v1/products/:id {
    name:"Gucci",
    price:500,
   
}
