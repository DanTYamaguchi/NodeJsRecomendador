const { error, count } = require('console');
const fs = require('fs');
const { posix } = require('path');
const { exit } = require('process');

class Json {

    constructor(filename = "") {
        if (fs.existsSync(filename)) {
            this.filename = filename;
        } else {
            console.log("File path not found...")
        }
        
    }

    loadJson() {
        return JSON.parse (
        fs.existsSync(this.filename)
            ? fs.readFileSync(this.filename).toString()
            : "null"
        )
    }


    getUserData(cpf) {

        if (cpf.length === 11){
            const users = this.loadJson();
                this.userData = users.filter(function(user) {
                    return user.cpf === cpf;
                })
                if (this.userData === null) {
                    console.log("Erro 404 - Usúario inexistente")
                }
        } else {
            console.log("Error Status 400 - Número de CPF inválido...");
        }
    }


    getUserFriends(cpf) {

        this.getUserData(cpf);
        return this.userData[0].amigos;        

    }

    getUserName(cpf){

        var nomes = []

        for (let i=0; i < cpf.length; i++){
            this.getUserData(cpf[i]);
            nomes.push(this.userData[0].nome) ;
        }
        return nomes;
    }

    getRecommendations(cpf) {

        var recommendations = [];

        const friendsCpf = this.getUserFriends(cpf);

        for(let i=0; i < friendsCpf.length; i++ ) {
            recommendations.push(this.getUserFriends(friendsCpf[i]));
        }

        const list = recommendations.toString();
        const array = list.split(",");
        
        const recCPF = array.filter(function(f){
            return f !== cpf
        });

        return [...new Set(recCPF)]
    }


    recByPoints(arrayCpf, cpf) {

        const points = []
        const friends = this.getUserFriends(cpf)

        arrayCpf.forEach(element => {
            var count = 0;

            for(let i=0; i < friends.length; i++ ){

                var param = friends[i]
                var lista = this.getUserFriends(param)

                if (Object.values(lista).indexOf(element) !== -1) {
                    count++;
                }
                
            }

            const data = {
            [element] : count
            }
            points.push(data);   

        });    
        var list = {}

        for(let i=0; i < points.length; i++ ) {
            list[Object.keys(points[i])] = Object.values(points[i])
        }
        
        let sortable = [];
        for (var pontos in list) {
            sortable.push([pontos, list[pontos]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        const orderCpfList = []
        for(let i=0; i < sortable.length; i++ ){
            orderCpfList.push(sortable[i][0])
        }

        return orderCpfList;
        
    }


}

/*const data = new Json("./user.json");

const cpf = "11111111111";
const arr = data.getRecommendations(cpf)

console.log(data.getUserName(data.recByPoints(arr,cpf)))*/

