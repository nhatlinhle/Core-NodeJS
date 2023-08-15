import { Application } from 'express';
import { formBody } from '../utils/media.util';
import proxyRouter from './proxy.router';
import apiRoutes from './api';

const routes = (server: Application): void => {
	server.use('/api', formBody, apiRoutes.router);
	server.use('/proxy', proxyRouter.router);
};

export default routes;
