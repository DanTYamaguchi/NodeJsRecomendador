SISTEMA DE RECOMENDAÇÃO DE AMIZADES
-----------------------------------

*** Apresentação:

    Este é um programa o qual, por meio de requisições HTTP, 

você cria e gerencia usuários em um banco de dados local com 

dados salvos em um arquivo Json. 

    O programa foi desenvolvido com o intuito de recomendar

novas amizades de acordo com a relevância de conexões com outros

amigos, ou seja, quanto mais amizades o usuário já tiver com 

os seu amigos diretos, mais prioridade ele terá como recomendação.


*** Como rodar?

    Basta baixar o Node.js em seu computador 
e em seguida instalar os pacotes express e nodemon 
utilizando os seguintes comandos no terminal:

-> npm install express
-> npm -g install nodemon
    
...instalados os pacotes, basta digitar:

-> npm start

...neste momento o servidor local estará ouvindo através
da porta 3000.
    Você pode enviar as requisições por meio de um browser a partir 
da url:

http://localhost:3000

...ou utilizar o softtware Postman que simula requisições HTTP

Os testes de requisições estão salvos na pasta "testes_requests"



*** Rotas das Requisições:

 1. http://localhost:3000/person        método: POST

 *Cria um usuário novo passando um objeto com as seguintes entradas:


 Entrada:   {
                "cpf": "12345678909",
                "name": "Joaozinho"
            }


...através do método POST. Deve retornar código HTTP 200 em caso de sucesso
e deve retornar código HTTP 400 caso o usuário cadastrado já exista ou caso o CPF
informado não consista de 11 dígitos numéricos.



2. http://localhost:3000/person/:CPF        método: GET

*Recebe um CPF e, se o usuário existir, retornar seus dados (nome e CPF), caso
contrário, deve retornar erro com status code 404.


Saída:  {
            "cpf": "12345678909",
            "name": "Joaozinho"
        }



3. http://localhost:3000/relationship       método: POST

*Recebe dois CPFs e, caso os dois usuários existam, cria um relacionamento entre
eles, caso contrário, deve retornar erro com status code 404.


entrada:    {
                "cpf1": "11111111111",
                "cpf2": "22222222222"
            }


Saída: Deve retornar código HTTP 200 em caso de sucesso e retornar                código HTTP 404 caso um dos usuários não exista.



4. http://localhost:3000/recommendations/:CPF       método: GET

*Recebe um CPF e retorna a lista de CPFs recomendados como amigos em ordem de maior relevância para menor relevância.

Ex:   A
    /   \
    B   C
    |  / \ 
    |/    \
    D      E

    O usuário A deve receber como recomendaçoes [D,E] pois D possui mais contatos em comum com amigos de A, portanto terá maior importância.


5. http://localhost:3000/relationship       método: DELETE

*Esta rota deve limpar todos os dados (pessoas e relacionamentos) em memória.

