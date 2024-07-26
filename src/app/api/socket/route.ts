// pages/api/socket.js
const http = require('http')
const { Server } = require('socket.io')

export async function GET(req, res) {
    if (!res.socket.server.io) {
        console.log('Setting up socket.io for the first time');
        
        // Lấy httpServer từ res.socket.server
        const httpServer = http.createServer()

        // Khởi tạo Socket.IO Server và lưu vào res.socket.server.io
        const io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        // Xử lý các sự kiện từ client
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            // Xử lý khi client disconnect
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });

            // Ví dụ xử lý sự kiện uploadProgress
            socket.on('uploadProgress', (data) => {
                console.log('Received uploadProgress:', data);
                io.emit('message2', data); // Gửi lại thông điệp tới tất cả client
            });
        });

        // Lưu instance của io vào res.socket.server để tái sử dụng
        res.socket.server.io = io;
    }

    // Kết thúc request
    res.end();
}
