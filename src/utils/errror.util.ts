// Error object used in error handling middleware function
export class AppError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);

		this.name = Error.name;
		this.statusCode = statusCode;
	}
}
