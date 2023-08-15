import { Request, Response } from 'express';
import { api, logger } from '../configs';

export default class videoProxy {
	public async addHeaderProxy(req: Request, res: Response) {
		try {
			const urlDecode = Buffer.from(req.params.code, 'base64').toString();
			const { data, headers } = await api.get(urlDecode, {
				responseType: 'stream',
			});
			res.header('Content-Type', headers['content-type']);
			res.header('Content-Length', headers['content-length']);
			return data.pipe(res);
		} catch (error) {
			logger.error(error);

			return res.json(error);
		}
	}

	public async loadVideo(req: Request, res: Response) {
		const urlDecode = Buffer.from(req.params.code, 'base64').toString();
		const offset = req.params.offset;

		const lastSlashIndex = urlDecode.lastIndexOf('/');
		const urlRequest = `${urlDecode.substring(
			0,
			lastSlashIndex,
		)}/${offset}`;

		try {
			const { data, headers } = await api.get(urlRequest, {
				responseType: 'stream',
			});
			res.header('Content-Type', headers['content-type']);
			res.header('Content-Length', headers['content-length']);
			return data.pipe(res);
		} catch (error) {
			console.error(error);
			return res.status(500).send('Internal Server Error');
		}
	}
}
