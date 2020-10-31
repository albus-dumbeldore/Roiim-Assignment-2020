if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}


const express           = require('express')
const app               = express()
var request             = require('request');
const bodyParser        = require("body-parser")
const mongoose          = require('mongoose')
var http                = require('http')
var server              = http.createServer(app)
var port                = process.env.PORT || 3000
var CustomerID          = require('./models/consumerid.js')

const dburl             = process.env.DB_URL || 'mongodb://localhost/roiim-assignment'



// Require Routes so that we can use later
var CustomerIdRoute     = require("./Routes/CustomerId.js")
var SingleCustomerToken = require('./Routes/SingleCustomerToken.js')
var PaymentDone         = require('./Routes/PaymentDone.js')



// Connect database Locally or Live
mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected')
});



app.set('view engine','hbs')
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))



//PaymentForm  route 
app.get('/',(req,res)=>{
    res.render("Payment.ejs")
})



// Routes use
app.use(CustomerIdRoute)
app.use(SingleCustomerToken)
app.use(PaymentDone)




// Server 
server.listen(port,()=>{
    console.log('Server is on port ' + 3000)
})