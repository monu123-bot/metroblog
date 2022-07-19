const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'monu',
    
    database:'metroblog'
})
con.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('no error')
    }
})
module.exports = con