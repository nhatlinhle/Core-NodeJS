import { Server, Socket } from 'socket.io';

const setupSocketListeners = (ioServer: Server) => {
	ioServer.on('connection', (socket: Socket) => {
		console.log('a user connected');

		socket.on('disconnect', function () {
			console.log('Client disconnected');
		});
	});
};

export default setupSocketListeners;
