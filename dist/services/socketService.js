"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        // Join outlet-specific rooms
        socket.on('join-outlet', (outletId) => {
            socket.join(`outlet-${outletId}`);
            console.log(`Socket ${socket.id} joined outlet-${outletId}`);
        });
        // Leave outlet-specific rooms
        socket.on('leave-outlet', (outletId) => {
            socket.leave(`outlet-${outletId}`);
            console.log(`Socket ${socket.id} left outlet-${outletId}`);
        });
        // Handle officer joining
        socket.on('officer-join', (data) => {
            socket.join(`outlet-${data.outletId}`);
            socket.join(`officer-${data.officerId}`);
            console.log(`Officer ${data.officerId} connected to outlet-${data.outletId}`);
            // Notify other officers about this officer coming online
            socket.to(`outlet-${data.outletId}`).emit('officer-online', {
                officerId: data.officerId,
                timestamp: new Date(),
            });
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
        // Handle errors
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });
    // Utility functions to emit events from other parts of the application
    const emitToOutlet = (outletId, event, data) => {
        io.to(`outlet-${outletId}`).emit(event, data);
    };
    const emitToOfficer = (officerId, event, data) => {
        io.to(`officer-${officerId}`).emit(event, data);
    };
    const emitGlobal = (event, data) => {
        io.emit(event, data);
    };
    // Attach utility functions to the io instance for external access
    io.emitToOutlet = emitToOutlet;
    io.emitToOfficer = emitToOfficer;
    io.emitGlobal = emitGlobal;
};
exports.socketHandler = socketHandler;
//# sourceMappingURL=socketService.js.map