import cors from 'cors';
import path from 'path';
import { AddressInfo } from 'net';
import { t as lang } from 'i18next';
import { Server as SocketServer } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { handle as i18Handle } from 'i18next-http-middleware';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes';
import databaseLoader from './loaders/database.loader';
import { corsOptions, env, header, i18nConfig, connectSocket } from './configs';
import ErrorHandler from './exceptions/error.exeption';
import formatResponse from './loaders/response.loader';
import { HttpStatusCode } from 'axios';

class Server {
	public app: Application;
	protected server: HttpServer;
	protected socket: SocketServer;

	constructor() {
		this.app = express();
		this.server = createServer(this.app);
		this.socket = connectSocket(this.server);
		this.config();
	}

	protected config(): void {
		const port = env.app.port;

		this.app.set('port', port);
		this.app.use(cors(corsOptions));

		// config body parse using express
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(path.join(__dirname, 'public')));

		// multiple language
		this.app.use(i18Handle(i18nConfig));

		// header
		header(this.app);

		// import route
		routes(this.app);

		this.app.use(
			(err: Error, req: Request, res: Response, next: NextFunction) => {
				ErrorHandler.handle(err, req, res, next);
			},
		);

		// format response
		this.app.use(formatResponse);
		this.app.all('*', (req: Request, res: Response) => {
			return res
				.status(HttpStatusCode.NotFound)
				.json({ message: lang('error.not_found') });
		});
	}

	public start(): void {
		databaseLoader.connectToDatabase().then(() => {
			this.server.listen(this.app.get('port'), '127.0.0.1', () => {
				const { port } = this.server.address() as AddressInfo;
				console.log(`Server listening in port ${port}`);
			});
		});
	}
}

const server = new Server();
server.start();
