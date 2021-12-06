require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const uriShortner = [];
let shortner = 0;


app.get('/api/shorturl/:short_url',(req,res)=>{
  let shortUrl = Number(req.params.short_url);
  uriShortnerId= uriShortner.find(a => a.short_url === shortUrl);
  if(uriShortnerId){
    res.redirect(uriShortnerId.original_url);
  }else{
  res.json({error: "No Short Url"});
  }


});




app.post('/api/shorturl',(req,res)=>{

let parsedURI = req.body.url;

if(parsedURI.indexOf("http://")==0|| parsedURI.indexOf("https://")==0){
  shortner++;
  res.json({
  "original_url": parsedURI,
  "short_url": shortner
});
uriShortner.push({
  "original_url": parsedURI,
  "short_url": shortner
});


}else{
  res.json({error: 'invalid url'});
}

});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
