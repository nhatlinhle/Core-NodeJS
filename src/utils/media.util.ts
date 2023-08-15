import multer from 'multer';

const formData = multer();

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, './uploads');
	},
	filename: function (request, file, callback) {
		const [, filename] = (request.url as string).split('/');
		const [, fileExtension] = file.originalname.split('.');

		callback(null, filename + '-' + Date.now() + '.' + fileExtension);
	},
});

export const upload = multer({ storage: storage });
export const formBody = formData.none();
