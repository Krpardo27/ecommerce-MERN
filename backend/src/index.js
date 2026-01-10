import server from './server.js';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Frontend permitido: ${process.env.FRONTEND_URL}`);
  console.log(`✅ CONECTADO A http://localhost:${PORT}`);
});
                                                                         