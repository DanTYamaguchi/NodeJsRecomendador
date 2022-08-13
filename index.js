const express = require('express');
const http = require('http');
const fs = require('fs');
const Json = require('./src/Json.js');

const app = express();
const PORT = 3000;

//const data = require('./src/user.json');




app.get('/persons', (req,res)=>{

    fs.readFile('./src/user.json', 'utf-8', (err, jsonString) => {
        if(err) {
            console.log(err);
        } else {
            const data = JSON.parse(jsonString);
            res.send(data[2].amigos.map((amigos) => amigos.cpf)) /* separa lista de amigos */
        }
    })
})





    



app.get('/teste', (req,res)=>{
    
    const json = new Json('./src/user.json')
    const criar = json.createNewUser("Amigo F", "66666666666");
    console.log(criar)
    res.send(criar)

    

})

app.listen(3000);