const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Güvenlik için daha sonra kendi domainini ekleyebilirsin
        methods: ["GET", "POST"]
    }
});

// Admin Paneli (Client) bağlandığında
io.on('connection', (socket) => {
    console.log('Bir admin bağlandı: ' + socket.id);

    // İstenirse 'join' ile sadece belirli admin odalarına eklenebilir
    socket.join('admin-room');

    socket.on('disconnect', () => {
        console.log('Admin koptu: ' + socket.id);
    });
});

// Next.js API'sinden (Webhook) sipariş geldiğinde burası tetiklenir
app.post('/webhook', (req, res) => {
    const { event, data } = req.body;
    
    if (event === 'new-order') {
        console.log('Yeni sipariş alındı, adminlere iletiliyor...');
        // Tüm adminlere "new-order" eventi gönder (Pusher'daki gibi)
        io.to('admin-room').emit('new-order', data);
        return res.status(200).json({ success: true, message: 'Bildirim gönderildi.' });
    }

    return res.status(400).json({ error: 'Bilinmeyen olay türü.' });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket Webhook Sunucusu ${PORT} portunda çalışıyor.`);
});
