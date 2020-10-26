import 'dotenv/config';
import express from "express";
import path from 'path';
import cors from 'cors';

import "express-async-errors";

import "./database/connection";

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')))
app.use(errorHandler);
//Rota = conjunto
//Recurso = usuario
// Métodos ou VERBOS HTTP (GET, POST, PUT, DELETE)

// GET = BUSCAR UMA INFORMAÇÃO NO BACKEND
// POST = CRIANDO UMA INFO NOVA NO BACKEND
// PUT - EDITANDO UMA INFO
// DELETE = DELETANDO UMA INFO
//Parametros ou Argumentos
// Query params: http://localhost:3333/users?search=celio
// Route params: DELETE/GET/POST http://localhost:3333/users/1 (identificador de recurso)
//Body - geralmente criação http://localhost:3333/users/1



app.listen(process.env.PORT || 3333) ;
