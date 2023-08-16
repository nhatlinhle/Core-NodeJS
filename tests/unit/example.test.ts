import { UserRole } from '../../src/constants/database.constant';

describe('User Model', () => {
	it('Check role admin', () => {
		expect(UserRole.ADMIN).toBe(1);
	});
});
