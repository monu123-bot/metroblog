const express = require("express");
var arr = require('./graph.json')
// const con = require("./config");
const app = express();
const fs = require('fs');
app.set("view engine", "ejs");
var session = require("express-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const querystring = require('node:querystring');
const {URLSearchParams} = require('url')
const port = process.env.PORT || 8000;
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: "monudixit0007@gmail.com", // generated ethereal user
    pass: "ytuguwtzogfhmbzd", // generated ethereal password
  },
});
async function mail(email, link,title) {
  
    let mailinfo = await transporter.sendMail({
      from: "monudixit0007@gmail.com", // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      text: "LawBrush", // plain text body
      html: ` <P>Read more</P>
     <a href='${link}'>Click</a>`, // html body
    });
  
    transporter.sendMail(mailinfo, (err, info) => {
      
      if (err) {
        console.log("error occured")
        console.log(err);
      } else {
        console.log(info.response);
      }

   })
  
  
}
function callmail(emails,link,title){
  emails.forEach((item)=>{ 
    
  mail(item.email,link,title)
  })
}
app.use(
  session({
      secret: "secreatkey",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3000000 },
  })
  )
sessioncheck = (req, res, next) => {
    if (!req.session.user) {
      res.render("login");
    } else {
      next();
    }
  };
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let ans = []
  

class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }

    dequeue()
{
    // removing element from the queue
    // returns underflow when called 
    // on empty queue
    if(this.isEmpty())
        return "Underflow";
    return this.items.shift();
}
enqueue(element)
{    
    // adding element to the queue
    this.items.push(element);
}
isEmpty()
{
    // return true if the queue is empty.
    return this.items.length == 0;
}
front()
{
    // returns the Front element of 
    // the queue without removing it.
    if(this.isEmpty())
        return "No elements in Queue";
    return this.items[0];
}
}
function find_paths(paths,path,parent,n,u){
   
    if(u===-1){
    
        paths.push(path)
        
        return
    }
    for(i=0;i<parent[u].length;i++){
        
        path.push(u)
        find_paths(paths,path,parent,n,parent[u][i])
        // path.pop()
    }
}
function bfs(adj,parent,n,s){
    dist = new Array(n)
    for (let i = 0;i<n;i++){
        dist[i] = Number.POSITIVE_INFINITY
    }
    
    q =new Queue()
    q.enqueue(s)
    parent[s] = [-1]
    dist[s] = 0
    while(q.isEmpty() === false){
        
        let u = q.dequeue()
        for(let i = 0;i<adj[u].length;i++){
       
            
            if(dist[adj[u][i]] > dist[u]+1){
                dist[adj[u][i]] = dist[u] + 1
                q.enqueue(adj[u][i])
                parent[adj[u][i]] = []
                parent[adj[u][i]].push(u)
            }
            else if(dist[adj[u][i]] === dist[u]+1){
                parent[adj[u][i]].push(u)
            }
        }
    }
}
function print_paths(adj,n,s,e){

    let paths = []
    let path  = []
    let parent = new Array(n)
    for (let i = 0;i<n;i++){
        parent[i] = []
    }
    bfs(adj,parent,n,s)
    
    find_paths(paths,path,parent,n,e)
    
    for (let v in paths){
        let z = paths[v].reverse()
        ans.push(z)
    }
}

// function createMatrix(){
//   mat = new Array(264)
//   for (let i = 0;i<265; i++){
//     mat[i] = new Array(6)
//     for (j = 0;j<6;j++){
//       mat[i][j] = 0
//     }
    
//   }
//   fs.readFile('./graph.json','utf-8',(err,arr)=>{
//     const data = JSON.parse(arr)
//     for (const item in data) {
//      for(const item1 in data[item] ){ 
//       mat[item][item1] = 1
//       mat[item1][item] = 1
//      }
//   }
//   console.log(mat)
// })

// }
// createMatrix()



app.get('/',(req,res)=>{
  
  // fs.writeFile('graph.jsonon',`${arr1}` , function (err) {
  //   if (err) throw err;
  //   console.log('Replaced!');
  // });
  fs.readFile('./station.json','utf-8',(err,arr)=>{
    const station = JSON.parse(arr)
  
    let ans3 = []
    let ans2  = []
    l = 0
    to = 0
    from = 0
   
  res.render('home',{ans3,station,l,ans2,to,from})
  })

  
    
    
    
})


app.get('/findroute',(req,res)=>{
  
  var from = req.query.from
  var to = req.query.to
  fs.readFile('./graph.json','utf-8',(err,arr)=>{
    const data = JSON.parse(arr)
    fs.readFile('./station.json','utf-8',(err,stations1)=>{
      const station1 = JSON.parse(stations1)
    for(const item in station1){
      if(station1[item].name == from){
        from = parseInt(item)
      }
      if(station1[item].name == to){
        to = parseInt(item)
      }
      
    }
    
    print_paths(data, 278, parseInt(from),parseInt(to))
    let ans1 = []
    
    for (i=0;i<ans.length;i++){
      
      ans1.push(ans[i])
    }
    
    fs.readFile('./station.json','utf-8',(err,stations)=>{
      const station = JSON.parse(stations)
      let ans2 = ans1[0]
      let ans3 = []
      let ans4 = []
      console.log(ans2)
      for(i=0;i<ans2.length;i++){
        if(i<ans2.length-1){ 
        if(ans2[i] == ans2[i+1]+1 || ans2[i] == ans2[i+1]-1){
          ans4.push(ans2[i])
        }
        else{
          ans4.push(ans2[i])
          ans3.push(ans4)
          ans4 = []
        } }
        else{
          if(ans2[i] == ans2[i-1]+1 || ans2[i] == ans2[i-1]-1){
            ans4.push(ans2[i])
          }
          else{
            ans4.push(ans2[i])
            ans3.push(ans4)
            ans4 = []
          }

        }
        if(ans4.length>0 && i == ans2.length-1){
          ans3.push(ans4)
          ans4 = []
        }
      }
    let l = ans2.length
   
    console.log(ans3)
      res.render('home',{ans3,station,l,ans2,to,from})
    ans2 = []
    ans1 = []
    })
  })
  });
    ans = []
  })
  
  app.get('/lines',(req,res)=>{
    let color = req.query.color
    fs.readFile('./station.json','utf-8',(err,stations)=>{
      const station = JSON.parse(stations) 

     
    res.render('lines',{color,station})
    })


  })

app.listen(port, () => {
    console.log(`app is running on port : ${port}`);
});