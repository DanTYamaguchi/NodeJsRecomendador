const express = require('express');
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = 3000;

//const data = require('./src/user.json');

// novos dados para escrever json file
const newData = [{
    "name":"Amigo F",
    "CPF":"66666666666",
    "amigos":[{
        "CPF":"55555555555"
    }]
}]



// rescrever json file
/*fs.writeFile('user.json', JSON.stringify(newData), (err) => {
    if (err) throw err;
    console.log("done writing...")
})*/



// update json file
/*jsonReader('./user.json', (err, data) =>{
    if(err) {
        console.log(err);
    } else {
        data[0].amigos[0] =*/ /*novo cpf*/ /*"";
        fs.writeFile('./src/user.json', JSON.stringify(data, null, 2), err=>{
            if(err){
                console.log(err);
            }
        })

    }
})*/


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





    



app.get('/test', (req,res)=>{

    const cpfAmigos = [];

    fs.readFile('./user.json', 'utf-8', (err, jsonString) => {
        if(err) {
            console.log(err);
        } else {
            const data = JSON.parse(jsonString);
            
            const dataEntries = Object.entries(data);

            dataEntries.forEach(entry => {
                if (entry[1]['cpf'] === "22222222222"){
                    const amigos = Object.values(entry[1]['amigos']);
                    cpfAmigos.push(Object.values(amigos));
                }
            }) 
            res.send(cpfAmigos)           
        }
    })
})

app.listen(3000);