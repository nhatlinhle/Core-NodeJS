import { CallbackError } from 'i18next';
import { i18nConfig, logger } from '../configs';

class languageMiddleware {
	protected lng: string;

	constructor(lng = 'en') {
		this.lng = lng;
	}

	public async setLanguage() {
		return i18nConfig.changeLanguage(this.lng, (err: CallbackError) => {
			if (err) {
				logger.error(err);
			}
		});
	}
}

export default languageMiddleware;
