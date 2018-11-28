const readline = require('readline');
const http = require('http');
//enable the file system modile
const fs = require('fs');
//set the host ip
const hostname = '/';
//set the port to listen on
const port = process.env.PORT;
//create a new server using the http module
const server = http.createServer((req, res) => 
{ 
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  //here are some changes
  var content;
  //set the body to be an array
  let body = [];
  //when the request comes in
  req.on('data', (chunk) =>
  {
    //push the chunk from the request into the body
    body.push(chunk);
  //when the request is done
  }).on('end', () => 
  {
    //concatnate the body array into a string
    body = Buffer.concat(body).toString();
    //log that there has been a hit on the server
    if(req.method === "GET")
    {
      var content = getInfo();
      console.log(content); 
    }   else if(req.method === 'POST') 
    {
      var message = JSON.parse(body);
      //replace any quotation marks from the post data
      message.data = message.data.replace("\"", "");
      //write the new message to the chat document.
      writeInfo(message.data);
    }
    //send the response back with the body.
    res.setHeader('Content-Type', 'text/plain');
    res.end(content);
  })
});
//set the server to listen for the hostname being called over port 3000 by a request.
server.listen(port, () => {
    //when the server sarts, log that the server is running.
  console.log(`Server running at http://${hostname}:${port}/`);
});
var writeInfo = function(data)
{
    fs.appendFile("logs.txt", data, function (err)
    {
        if(err) throw err;
        console.log("File Saved!");
    });
}
var getInfo = function(){
  var contents = fs.readFileSync('logs.txt', 'utf8');
  return contents;
}