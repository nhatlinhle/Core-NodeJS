import bcrypt = require('bcryptjs');
const saltRounds = 10;

export const createHash = (data: string): Promise<string> => {
	return bcrypt.hash(data, saltRounds);
};

export const compareHash = (data: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(data, hash);
};
