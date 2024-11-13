const sql = require('mssql');
const jwt = require('jsonwebtoken'); // Importe o jsonwebtoken para geração de tokens
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT), // Converte para número
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Defina como true se estiver usando SSL
        enableArithAbort: true,
    },
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Conexão bem-sucedida com o banco de dados');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

// Função para gerar um token JWT
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,         // ID do usuário
            role: user.role      // Papel do usuário (admin, user, etc.)
        },
        process.env.JWT_SECRET,  // Chave secreta do .env
        { expiresIn: '1h' }      // Expiração do token
    );
}

// Função para verificar o token JWT (opcional, se precisar)
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = { connectToDatabase, sql, generateToken, verifyToken };
