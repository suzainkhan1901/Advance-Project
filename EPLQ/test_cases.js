import { userLogin, searchPOIs } from './user.js';
import { adminLogin, uploadData } from './admin.js';

describe('User Authentication', () => {
    test('User login with valid credentials', async () => {
        const result = await userLogin('testuser@example.com', 'password123');
        expect(result).toBe(true);
    });

    test('User login with invalid credentials', async () => {
        await expect(userLogin('invalid@example.com', 'wrongpass')).rejects.toThrow();
    });
});

describe('Admin Functionalities', () => {
    test('Admin login with valid credentials', async () => {
        const result = await adminLogin('admin@example.com', 'adminpass');
        expect(result).toBe(true);
    });

    test('Data upload', async () => {
        const result = await uploadData('testData.json', 'encrypted_data');
        expect(result).toBe(true);
    });
});

describe('POI Search', () => {
    test('Search POIs returns results', async () => {
        const results = await searchPOIs();
        expect(results).toBeInstanceOf(Array);
    });
});
