import { Server } from 'socket.io';
import { IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { corsOptions } from './cors.config';
import setupSocketListeners from '../listeners/socket.listener';

const socket = (
	server: HttpServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
	const ioServer = new Server(server, {
		cors: corsOptions,
	});

	setupSocketListeners(ioServer);

	return ioServer;
};

export default socket;
