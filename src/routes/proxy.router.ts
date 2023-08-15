import { Router } from 'express';
import videoProxy from '../controllers/videoProxy.controller';

class proxyRoutes {
	public router: Router;
	private controller: videoProxy = new videoProxy();

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.get(
			'/add-header/:code/channels.m3u8',
			this.controller.addHeaderProxy,
		);
		this.router.get('/add-header/:code/:offset', this.controller.loadVideo);
	}
}

export default new proxyRoutes();
