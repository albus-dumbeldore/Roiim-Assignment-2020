
var {express,router,CustomerID,request,bodyParser} = require('../RoutesheaderFiles/AllheaderFiles.js')




router.post('/roiim/payment',(req,res)=>{
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)

    res.send (intiatePayment(data))
})





function intiatePayment(data){

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
        
        if(response.statusCode>=200 & response.statusCode<300){
            return 'success'
        }else{
            return 'error'
        }
    }); 
    
}

module.exports = router