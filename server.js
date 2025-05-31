require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

dbPool.getConnection()
    .then(connection => {
        console.log('Conectado ao banco de dados MySQL com sucesso!');
        connection.release(); 
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
    });

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});

app.post('/api/laps', async (req, res) => {
    const { time } = req.body; 

    if (!time) {
        return res.status(400).json({ message: 'O campo "time" é obrigatório.' });
    }

    try {
        const [result] = await dbPool.execute('INSERT INTO laps (time) VALUES (?)', [time]);
        res.status(201).json({ message: 'Tempo de volta salvo com sucesso!', id: result.insertId });
    } catch (error) {
        console.error('Erro ao salvar tempo de volta:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao salvar tempo de volta.', error: error.message });
    }
});

app.get('/api/laps', async (req, res) => {
    try {
        const [rows] = await dbPool.query('SELECT id, time, timestamp FROM laps ORDER BY timestamp DESC');
        res.status(200).json(rows);
    } catch (error){
        console.error('Erro ao carregar voltas do banco de dados:', error);
        res.status(500).json({ error: 'Erro ao carregar voltas do banco de dados' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});