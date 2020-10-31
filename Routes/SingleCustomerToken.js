
var {express,router,CustomerID,request,bodyParser} = require('../RoutesheaderFiles/AllheaderFiles.js')





router.post('/roiim/customerToken',async(req,res)=>{
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)
    console.log(data)

   var CustomerTokenOrError = await GenerateCustomerToken(data)

   res.send(CustomerTokenOrError)

})
function GenerateCustomerToken(data){
    return new Promise((resolve,reject)=>{
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
            },function (error, response, body) {
    
            console.log('customer Status:', response.statusCode);
            
            console.log(response.body.singleUseCustomerToken)
            
            if(response.statusCode>=200 & response.statusCode<300){
                resolve(JSON.stringify(response))
            }
            else{
                reject ('error')
            }
        }); 

    })
}

module.exports = router

