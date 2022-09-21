var mysql = require('mysql2');
const express = require("express");
const app = express();
const https = require('https')

const bodyParser = require("body-parser");
const { CONNREFUSED } = require('dns');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mani*123",
    database: "data"
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Connected to Database");
});




//GET api 

app.get("/get", function (req, res) {
    con.query("select * from detail", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
        console.log(results);
    });

});
//-get by name
app.get("/get/name/:name", function (req, res) {
    var name = req.params.name;

    con.query("select * from detail where name = ?", [name], function (err, d) {

        if (err) {
            console.log(err);
        } else {
            res.send(d);

        }
        console.log(d);
    });
});

//-get by id

app.get("/get/id/:id", function (req, res) {
    var id = req.params.id;

    con.query("select * from detail where id = ?", [id], function (err, d) {

        if (err) {
            console.log(err);
        } else {
            res.send(d);

        }
        console.log(d);
    });
});


//post api by using params
app.post("/data", function (req, res) {

    //   console.log(res.json())
    var paramas = req.body;

    con.query("INSERT INTO detail SET ?", paramas, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            // res.send(results);
            res.json({
                message: "Data Created successfully",
                data: results
            })
            console.log(results);
        }

    });
});

//---------------------------------------------------PUT  by id---------------------

/* app.put('/update/:name', function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    if (!name || !email) {
        return res.status(400).send({ err: name, message: 'Please provide name ' });
    }
    console.log(message);
    con.query('update detail set name = ? where name = ?', [name, email], function (err, ud) {
        if (err) {
            console.log(err);
        }
        return res.send({ err: false, data: ud, message: 'detail has been updated successfully' });
    })
}); */

app.put('/update/:id', function (req, res) {
    
    let data = [req.body.name, req.body.email, req.body.phone, req.params.id];

    console.log('<<<<<<<<>>>>>>>>>', data);

    // var details = req.body


    // console.log('***********', details);

    con.query('update detail set name = ?, email = ? , phone = ? where id = ?', data, function(err){
        if (err){
            console.log(err);              //'+details.name+'             +details.email             +details.phone
        } else {
            res.send('Updated successfully');
        }
        console.log('Updated successfully');
    })

});

//-----------------------delete by NAME

app.delete('/delete/:name', function (req, res) {
    var name =  req.params.name
    con.query('delete from detail where name = ? ', [name], function (err) {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
});



app.listen(4009, function (err) {
    console.log("server running at localhost:4009....!", err);
});

