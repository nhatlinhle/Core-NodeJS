import { t as lang } from 'i18next';

interface ValidationErrorItem {
	message: string;
	path: Array<string | number>;
	type: string;
	context?: Context;
}

interface Context {
	[key: string]: any;
	key?: string;
	label?: string;
	value?: any;
}

export const removeQuotes = (str: string) => str.replace(/['"]+/g, '');
export const transValidate = (errDetail: ValidationErrorItem): string => {
	return lang(removeQuotes(errDetail.message), {
		label: errDetail.context?.label,
	});
};
