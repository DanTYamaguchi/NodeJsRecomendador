import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { readFileSync } from 'fs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('', __dirname);
console.log(path.join(__dirname, '/', 'index.html'));


const router = express.Router();

// json as databas


let loadUsers = () => {
    let users = JSON.parse(readFileSync('../user.json'));
}

const data = loadUsers();

router.get('/users', (req, res) => {
    console.log(data);
    res.send(data);
});

router.get('/person', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

router.post('/person', (req, res) => {
    console.log(req,res);

});

export default router;