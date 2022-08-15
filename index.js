// importando bibliotecas
const express = require('express');
const http = require('http');
const fs = require('fs');
const Json = require('./src/Json.js');
const bodyParser = require("body-parser")

const app = express();
const PORT = 3000;

const user = new Json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



// Rotas: 
app.get('/person/:cpf', (req,res)=>{

    var cpf = req.params.cpf.toString()
    
    var retorno = user.getUserData(cpf)
    
    res.status(retorno.status)
    res.send(retorno.message)

})


app.post('/person', (req,res)=>{
    
    var retorno = user.createNewUser(req.body.nome, req.body.cpf)

    res.status(retorno.status)
    res.send(retorno.message)

})


app.post('/relationship', (req,res)=>{

    var retorno = user.createNewRelationship(req.body.cpf1, req.body.cpf2) // recebe variaveis via post => cpf1, cpf2
    
    res.status(retorno.status)
    res.send(retorno.message)

   
})


app.get('/recommendations/:cpf', (req,res)=> {

    var arr = user.getRecommendations(req.params.cpf)
    var retorno = user.recByPoints(arr, req.params.cpf)

    res.status(retorno.status)
    res.send(retorno.message)

})



app.delete('/clean', (req,res)=>{

    var retorno = user.cleanJson()

    res.status(retorno.status)
    res.send(retorno.message)

})


app.listen(3000);