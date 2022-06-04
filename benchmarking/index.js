const http = require('http') 
const fs = require('fs');
// const fs = require('fs').promises;

const server =  http.createServer((req,res)=>{
    res.setHeader("content-type","text/HTML")
    if(req.url==='/'){
        res.end("sagar")
    }
    if(req.url ==='/texasync'){
      fs.readFile('./data.txt','utf-8',(err,data)=>{
          res.end(data)
      })
  
    }

    if(req.url ==='/texsync'){
     const sa=   fs.readFileSync("./data.txt","utf-8")
     res.end(sa)
    }

    if(req.url==='/stream'){
      const readStream=  fs.createReadStream('./data.txt')
      readStream.pipe(res)
    }

    if(req.url==='/promise'){
        async function readFile(filePath) {
            try {
                await fs.readFile(filePath,"utf-8",(error,data)=>{
                      res.end(data)
              });
             
            } catch (error) {
              console.error(`Got an error trying to read the file: ${error.message}`);
            }
          }
    
          readFile("./data.txt")
    }

 })


 server.listen(3030,()=>{
    console.log("port http://localhost:3030/")
})