
var {express,router,CustomerID,request,bodyParser} = require('../RoutesheaderFiles/AllheaderFiles.js')



router.post('/roiim/customerid',async(req,res)=>{
    
    var data=JSON.stringify(req.body)
    data=JSON.parse(data)
    
    var CustomerIdOrError = await GenerateCustomerId(data)
    res.send(CustomerIdOrError)
})

function GenerateCustomerId(data){
    return new Promise((resolve,reject)=>{
        var email=data.email
        CustomerID.findOne({email:email},(err,result)=>{
            if(result){
                resolve(JSON.stringify(result))
            }
            else{
                request({
                    url: 'https://api.test.paysafe.com/paymenthub/v1/customers', 
                    method :"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                        'Simulator': 'EXTERNAL'
                    },
                    body: {
                        "merchantCustomerId": email,
                        "locale": "en_US",
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "dateOfBirth": {
                            "year": 1990,
                            "month": 7,
                            "day": 1
                        },
                        "email": email,
                        "phone": data.phone,
                        "ip": "192.0.126.111",
                        "gender": "M",
                        "nationality": "Canadian",
                        "cellPhone": "777-555-8888"
                    },
                    json:true
                    }, function (error, response, body) {
                    console.log('Status:', response.statusCode);
                    
                    var newCustomerID = new CustomerID({
                        email:email,
                        id:response.body.id
                    })
                    newCustomerID.save((err,user)=>{
                        if(err)reject(err)
                        else{
                            resolve(JSON.stringify(user))
                        } 
                    })
                });
            } 
        })
    })
}


module.exports = router