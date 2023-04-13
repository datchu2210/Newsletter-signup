const express = require('express');
const body_parser = require('body-parser')
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(body_parser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){

  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email

  const data = {
    members:[
      {
        email_address:email,
        status:'subscribed',
        merge_fields:{
          FNAME:fname,
          LNAME:lname,
        }
      }
    ]
  };

  const json = JSON.stringify(data)

  const url = "https://us10.api.mailchimp.com/3.0/lists/ad9c9b7e41";

  const options = {
    method:'POST',
    auth:'datchu:d29a8655b577f7b50c632a01efae1a47-us10'
  }

  const request = https.request(url,options,function(response){


    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }

    response.on('data',function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(json);
  request.end();

});

app.listen(process.env.PORT || 3000,function(){
  console.log('Server Started')
})


//d29a8655b577f7b50c632a01efae1a47-us10
//ad9c9b7e41
