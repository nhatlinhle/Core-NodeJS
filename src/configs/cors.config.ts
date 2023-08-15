const origin: any = process.env.ORIGIN;

const corsOptions = {
	origin: origin || '*',
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST',
	preflightContinue: false,
};

export { corsOptions };
