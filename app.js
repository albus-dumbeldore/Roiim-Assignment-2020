
const express       = require('express')
const hbs           = require('hbs')
const app           = express()
var request         = require('request');
const bodyParser    = require("body-parser")
const mongoose      = require('mongoose')
var http            = require('http')
var server          = http.createServer(app)
var port            = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/roiim-assignment',{useNewUrlParser:true,useUnifiedTopology:true})

app.set('view engine','hbs')
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))


// ============================models============================================================
var consumerIdSchema = new mongoose.Schema({
    email:String,
    id:String
})

var  ConsumerId= mongoose.model('ConsumerId',consumerIdSchema)
// =================================================================================================

app.get('/',(req,res)=>{
    res.render("Payment.ejs")
})


app.post('/roiim/customerid',(req,res)=>{
    
 
    console.log('hello !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
    // res.send('f89e36d8-09cd-4189-b43a-c80dc07ad3a0')
    

    
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)
    var email=data.email

        var result = false;
    ConsumerId.findOne({email:email},(err,result)=>{
        if(result){
            console.log('bc')
            res.send(JSON.stringify(result))
        }
        else{
            console.log('========================================')
            // request({
            //     url: 'https://api.test.paysafe.com/paymenthub/v1/customers', 
            //     method :"POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            //         'Simulator': 'EXTERNAL'
            //     },
            //     body: {
            //         "merchantCustomerId": email,
            //         "locale": "en_US",
            //         "firstName": data.firstName,
            //         "lastName": data.lastName,
            //         "dateOfBirth": {
            //             "year": 1990,
            //             "month": 7,
            //             "day": 1
            //         },
            //         "email": email,
            //         "phone": data.phone,
            //         "ip": "192.0.126.111",
            //         "gender": "M",
            //         "nationality": "Canadian",
            //         "cellPhone": "777-555-8888"
            //     },
            //     json:true
            //     }, function (error, response, body) {
            //     console.log('Status:', response.statusCode);
            //     // console.log(error,body)
            //     console.log(response.body.id)
            //     // console.log(body.error)
            //     // if(body.error){
            //     //     res.end("error"); 
            //     // }
                
            //     var newConsumerId = new ConsumerId({
            //         email:email,
            //         id:response.body.id
            //     })
            //     newConsumerId.save((err,user)=>{
            //         if(err)console.log(err)
            //         else{
            //             res.send(JSON.stringify(user))
            //         } 
            //     })

            //     // res.end(response.body.id)
            // });
            res.send('f89e36d8-09cd-4189-b43a-c80dc07ad3a0')
        } 
        
    })
})

app.post('/roiim/customerToken',(req,res)=>{
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)
    console.log(data)

    request({
        url: 'https://api.test.paysafe.com/paymenthub/v1/customers/'+data.customerid+'/singleusecustomertokens', 
        method :"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            'Simulator': 'EXTERNAL'
        },
        body: {
            "merchantRefNum": data.merchantRefNumber,
            "paymentTypes": ["CARD"]
        },
        json:true
        }, function (error, response, body) {
        console.log('customer Status:', response.statusCode);
        if(body.error){
            res.end("error"); 
        }
        // console.log('ara')
        res.end(JSON.stringify(response))
    }); 

})

app.post('/roiim/payment',(req,res)=>{
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)
    // console.log('bcccccccccccccc')
    // console.log(data)
    request({
        url: 'https://api.test.paysafe.com/paymenthub/v1/payments', 
        method :"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            'Simulator': 'EXTERNAL'
        },
        body: {
            "merchantRefNum": data.merchantNumber,
            "amount": parseInt(data.amount)*100,
            "currencyCode": "USD",
            "dupCheck": true,
            "settleWithAuth": false,
            "paymentHandleToken": data.token,
            "customerIp": "10.10.12.64",
            "description": "Magazine subscription",
        },
        json:true
        }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        // console.log(error,body)
        // console.log(response)
        // console.log(body.error)
        if(body.error){
            res.end("error"); 
        }
        res.end(JSON.stringify(response))
    }); 
})

server.listen(port,()=>{
    console.log('Server is on port ' + 3000)
})