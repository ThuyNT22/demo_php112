const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT,function (){
    console.log("Server is running...");
});
//config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123", //dung mamp thi dien "root", dung xamp de trong ""
    multipleStatements: true //Cho phep su dung nhieu cau SQL 1 lan gui yeu cau
};
//connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);
//api list all class
app.get("/get-classes",function(req, res){
    const sql = "select * from classes";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
app.get("/get-students",function (req, res){
    const sql = "select * from students";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
})
//loc cac sinh vien theo ma cid
app.get("/student-by-class",function (req, res){
    const cid = req.query.cid;
    const sql = "select * from students where cid = "+cid;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
})
//tim ten sinh vien
app.get("/student-by-name",function (req, res){
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%' or email like '%${q}%'`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
})
//search by classname
app.get("/search-by-classname",function (req, res){
    const q = req.query.q;
    const sql = `select * from students where cid in (select cid from classes where name like '%${q}%')`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
})
//get 1 student by sid
app.get("/detail-student",function (req, res){
    const sid = req.query.sid;
    const sql = `select * from students where sid = ${sid}'`;
    conn.query(sql,function (err,data){
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data[0]);
        }else{
            res.status(404).send("404 not found");
        }
    })
})