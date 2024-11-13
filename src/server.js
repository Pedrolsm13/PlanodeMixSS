const express = require('express');
const path = require('path');

const app = express();

// Configuração para usar EJS e definir a pasta de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public')); // Aponta a views para 'public'

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para página de login
app.get('/', (req, res) => {
    res.render('login'); // Renderiza o arquivo login.ejs
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Rota para Cadastro de Lojas
app.get('/cadastro-lojas', (req, res) => {
    res.render('cadastroLojas');
});

// Rota para Cadastro de Shopping
app.get('/cadastro-shoppings', (req, res) => {
    res.render('cadastroShopping');
});

// Rota para Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Rota para Lista de Lojas
app.get('/lojas', (req, res) => {
    res.render('ListaLojas');
});

// Rota para Lista de Shopping
app.get('/shoppings', (req, res) => {
    res.render('ListaShopping');
});

// Rota para Relatorios
app.get('/relatorios', (req, res) => {
    res.render('relatorio');
});

app.post('/login', (req, res) => {
    // Aqui você pode adicionar a lógica de autenticação
    res.redirect('/dashboard'); // Redireciona para a Tela Principal após o login
});

// Porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
