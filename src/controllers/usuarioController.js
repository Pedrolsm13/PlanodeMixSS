const { sql, connectToDatabase } = require('../config/db');
const { generateToken } = require('../config/db'); // Importe a função de gerar token

async function getUsuarios(req, res) {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM TB_USUARIOS');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários');
    }
}

async function addUsuario(req, res) {
    const { Nome, Senha, Tipo } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('Nome', sql.NVarChar, Nome)
            .input('Senha', sql.NVarChar, Senha)
            .input('Tipo', sql.NVarChar, Tipo)
            .query('INSERT INTO TB_USUARIOS (Nome, Senha, Tipo) VALUES (@Nome, @Senha, @Tipo)');
        res.status(201).send('Usuário adicionado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao adicionar usuário');
    }
}

async function login(req, res) {
    const { Nome, Senha } = req.body;
    
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('Nome', sql.NVarChar, Nome)
            .input('Senha', sql.NVarChar, Senha)
            .query('SELECT * FROM TB_USUARIOS WHERE Nome = @Nome AND Senha = @Senha');
        
        const user = result.recordset[0];
        
        if (user) {
            const token = generateToken(user); // Gera o token JWT
            res.json({ token });               // Retorna o token na resposta
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    } catch (error) {
        res.status(500).send('Erro ao autenticar o usuário');
    }
}

module.exports = {
    getUsuarios,
    addUsuario,
    login
};
