var fs = require('fs');

/**
 Classe responsável pela manipulação dos dados do arquivo "user.json" 
 que faz o papel do banco de dados
 */
class Json {

    constructor() {

        this.filename = "./user.json";

        this.loadJson();
        
    }

    loadJson() {        //carrega todos os dados do banco
        
        this.users = JSON.parse (
        fs.existsSync(this.filename)
            ? fs.readFileSync(this.filename).toString()
            : "null"
        );
    }



    isEmpty(obj) {      // Verifica se o objeto está vazio
        for(var prop in obj) {

            if(obj.hasOwnProperty(prop))

                return false;
        }

        return true;
    }



    getUserData(cpf) {      // dados de um usuário pelo seu cpf
   
        var valido = this.validaCpf(cpf)

        if (valido) {
            
            var userData = this.users.filter(function(user) {
               return (user.cpf === cpf)
            })

            if (this.isEmpty(userData)) {
                
                return {
                    "message": "Usuário Inexistente...",
                    "status":404
                };

            } else { 

                return {
                    "message": userData,
                    "status":200
                };
            }


        } else {
            
            return {
                "message": "Número de CPF inválido...",
                "status":400
            }
        }
    }



    verificaExistencia(cpf) {       // verifica se usuario já existe
        var cpfs = [];
        this.users.forEach(user => {
            cpfs.push(user.cpf);
        });

        if (cpfs.indexOf(cpf) > -1) {
            return true;
        }else{
            return false;
        }
    }



    validaCpf(cpf) {        // Valida quantidade de caracteres do CPF
        return cpf.length === 11;
    }


    
    createNewUser(nome, cpf) {      // cria novo usuário no banco
        
        var valido = this.validaCpf(cpf)
        if (valido) {
            var existe = this.verificaExistencia(cpf);
            if (existe) {

                return {
                    "message": "Usuário existente",
                    "status":400
                };

            } else {

                var newUser = {
                                "nome":nome,
                                "cpf":cpf,
                                "amigos":[]
                            }
                
                console.log("Criando novo usuário...")

                this.users.push(newUser)

                this.updateJsonUsers()

                console.log("Usuário cadastrado com sucesso!")
                return {
                    "message": "Usuário cadastrado com sucesso!",
                    "status":200
                };

            }    

        } else { 
            return {
                "message": "Número de CPF inválido",
                "status":400
            };
        }
    }



    createNewRelationship (cpf1, cpf2) {            // cria relação de amizades entre 2 usuarios existentes que não era amigos

        var data1 = this.getUserData(cpf1);
        var data2 = this.getUserData(cpf2);

        var valido1 =  this.validaCpf(cpf1);
        var valido2 =  this.validaCpf(cpf2);

        if (valido1 && valido2) {

            var existe1 = this.verificaExistencia(cpf1);
            var existe2 = this.verificaExistencia(cpf2);

            if (existe1 && existe2) {
                
                var amigos1 = new Set(data1['message'][0].amigos);
                amigos1.add(cpf2);
                data1['message'][0].amigos = Array.from(amigos1);

                var amigos2 = new Set(data2['message'][0].amigos);
                amigos2.add(cpf1);
                data2['message'][0].amigos = Array.from(amigos2);

                this.updateJsonUsers()

                return {
                    "message": "Os dois CPFS agora são amigos!",
                    "status":200
                }
                

            } else {
                return {
                    "message": "CPF não encontrado",
                    "status":404
                }
            };

        } else { 
            return {
            "message": "Número de CPF inválido",
            "status":400
            };
        }
        
    }



    updateJsonUsers(){      // Atualiza o banco de dados do arquivo Json com as novas alterações
        
        fs.writeFileSync(this.filename, JSON.stringify(this.users, null, 2));
        
    }



    getUserFriends(cpf) {       // Retorna os amigos de um CPF

        var userData = this.getUserData(cpf);
        return userData['message'][0].amigos;        

    }



    getUserName(cpf){       // Retorna o nome de um CPF

        var nomes = []

        for (let i=0; i < cpf.length; i++){
            var userData = this.getUserData(cpf[i]);
            nomes.push(userData['message'][0].nome) ;
        }
        return nomes;
    }



    getRecommendations(cpf) {           // descobre novas amizades a partir dos amigos de amigos

        var recommendations = [];

        var friendsCpf = this.getUserFriends(cpf);

        friendsCpf.forEach(friend => {
            recommendations.push(this.getUserFriends(friend));
        });

        var list = recommendations.toString();
        var array = list.split(",");
        
        var recCPF = array.filter(function(f){
            return f !== cpf
        });

        return [...new Set(recCPF)]
    }



    recByPoints(arrayCpf, cpf) {            // ordena a lista de recomendaçoes por relevância

        var points = []
        var friends = this.getUserFriends(cpf)

        arrayCpf.forEach(element => {
            var count = 0;

            for(let i=0; i < friends.length; i++ ){

                var param = friends[i]
                var lista = this.getUserFriends(param)

                if (Object.values(lista).indexOf(element) !== -1) {
                    count++;
                }
                
            }

            var data = {
            [element] : count
            }
            points.push(data);   

        });    
        var list = {}

        for(let i=0; i < points.length; i++ ) {
            list[Object.keys(points[i])] = Object.values(points[i])
        }
        
        var sortable = [];
        for (var pontos in list) {
            sortable.push([pontos, list[pontos]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        var orderCpfList = []
        for(let i=0; i < sortable.length; i++ ){
            orderCpfList.push(sortable[i][0])
        }

        console.log("Recomendações: "+ orderCpfList)
        return {
            "message": orderCpfList,
            "status":200
        };
        
    }


    cleanJson() {           // Apaga todos os dados do banco de dados do arquivo Json

        this.users = [];
        this.updateJsonUsers();
        return {
            
            "message":"Todos usuários foram apagados...",
            "status":200
        }
    }
}

module.exports = Json;