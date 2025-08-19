const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa todos os ficheiros de rotas necessários para o projeto
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orderRoutes');
const walletRoutes = require('./routes/walletRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
const creditRoutes = require('./routes/creditRoutes');

const app = express();

// --- CORREÇÃO DE CORS (VERSÃO MAIS ROBUSTA) ---
// Esta configuração permite que o seu site no Render faça requisições para a sua API.
const allowedOrigins = [
    'https://smartfridge-frontend-usav.onrender.com' 
    // Adicione outras URLs aqui se necessário, como localhost para testes
    // 'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como apps mobile ou Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// ---------------------------------------------------

app.use(express.json());

// --- Rotas da API ---
// Garante que todas as rotas estejam sendo usadas pelo servidor
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/webhook', webhookRoutes); // Corrigido de 'webhooks' para 'webhook'
app.use('/api/fridge', fridgeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/credit', creditRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor a rodar na porta ${PORT}`));
