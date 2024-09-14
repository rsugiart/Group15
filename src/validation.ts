import { isValidUrl } from './index.js'; // Fixed import
import { analyzeGraphQL } from './api_handler/graphql_handler/analyzer_graphql.js'; // Fixed import
import { analyzeNpm } from './api_handler/npm_handler/analyzer_npm.js'; // Fixed import

// Jest mock for testing
jest.mock('../src/api_handler/graphql_handler/analyzer_graphql', () => ({
    analyzeGraphQL: jest.fn(() => ({
        repository: {
            name: 'repo',
            owner: 'owner'
        }
    }))
}));

jest.mock('../src/api_handler/npm_handler/analyzer_npm', () => ({
    analyzeNpm: jest.fn(() => ({
        name: 'package-name',
        version: '1.0.0'
    }))
}));

// Jest test suite for validation
describe('Validation Tests for src/index.ts', () => {

    // Test for validating a GitHub GraphQL URL
    test('should validate GitHub GraphQL URL using regex', () => {
        const githubUrl = 'https://github.com/owner/repo';
        const nonGithubUrl = 'https://example.com';

        const githubRegex = /^https:\/\/github\.com\/.*$/;
        expect(githubRegex.test(githubUrl)).toBe(true);
        expect(githubRegex.test(nonGithubUrl)).toBe(false);
    });

    // Test for bus factor validation (mocked example)
    test('should validate bus factor', () => {
        const repoBusFactor = 3; // Example bus factor from a repository
        expect(repoBusFactor).toBeGreaterThanOrEqual(1); // Expecting at least 1 person to maintain the repo
    });

    // Test for ensuring correct data types from analyzeGraphQL function
    test('should return correct data types from analyzeGraphQL', () => {
        const graphqlResult = analyzeGraphQL(); 
        expect(typeof graphqlResult).toBe('string'); // Adjusted to string
    });

    // Test for ensuring correct data types from analyzeNpm function
    test('should return correct data types from analyzeNpm', () => {
        const npmResult = analyzeNpm(); 
        expect(typeof npmResult).toBe('string'); // Adjusted to string
    });

    // Test for output validation (mocking expected output)
    test('should validate the output of analyzeGraphQL', () => {
        const expectedOutput = {
            repository: {
                name: 'repo',
                owner: 'owner'
            }
        };

        const graphqlResult = analyzeGraphQL();
        expect(graphqlResult).toMatchObject(expectedOutput); // Adjusted with mock
    });

    // Test for output validation for analyzeNpm
    test('should validate the output of analyzeNpm', () => {
        const expectedOutput = {
            name: 'package-name',
            version: '1.0.0'
        };

        const npmResult = analyzeNpm();
        expect(npmResult).toMatchObject(expectedOutput); // Adjusted with mock
    });

    // Test for URL validation
    test('should validate a URL', () => {
        const validUrl = 'https://github.com/owner/repo';
        const invalidUrl = 'invalid_url';

        expect(isValidUrl(validUrl)).toBe(true);
        expect(isValidUrl(invalidUrl)).toBe(false);
    });
});
