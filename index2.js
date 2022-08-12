import express from "express";
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', usersRoutes);
app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req,res) => res.send('Hello World from index'));

app.listen (PORT, () => console.log(`server Running on port: http://localhost${PORT}`));

