interface loginAttributes {
	email: string;
	password: string;
	remember_me?: boolean;
}

interface managerSessionDataInterface {
	id: number;
	email: string;
	expires?: string;
}

interface authUserInterface {
	id: number;
	email: string;
	expires: string;
	iat: number;
	exp: number;
}

export { loginAttributes, managerSessionDataInterface, authUserInterface };
