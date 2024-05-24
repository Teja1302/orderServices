const express =require('express')

const app = express()

const body = require('body-parser');

app.use(body.json());

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const dotenv = require('dotenv') 
dotenv.config()

const db = require('./config/dbconfig');
const router = require('./router/userRouter');
const Productrouter =require('./router/productRoter');
const Orderrouter = require('./router/cartRouter');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sync({ force: false })
.then(e => console.log("Table Created"))
.catch(e => console.log("error", e));

require('./model/userModel')
require('./model/productModel')
require('./model/cartModel')
require('./model/cartProductModel')

app.use('/api',router)
app.use('/api',Productrouter)
app.use('/api',Orderrouter)


app.listen(3002,()=>
{
    console.log("server connected at port 3002 successfully!")
})