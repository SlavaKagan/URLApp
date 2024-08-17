import { fetchMetadata as _fetchMetadata } from '../controllers/MetadataController';
import { fetchMetadata as __fetchMetadata } from '../services/MetadataService';

jest.mock('../services/MetadataService', () => ({
  fetchMetadata: jest.fn(),
}));

describe('MetadataController', () => {
  let req, res;

  beforeEach(() => {
    req = { 
      body: { urls: ['https://example.com'] }, 
      headers: { 'x-csrf-token': 'valid-token' },
      csrfToken: 'valid-token' // Simulate a valid CSRF token in the request
    };
    
    // Mock `res` object with `status` and `json` methods
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Ensure `status` returns `res` for chaining
    };
  });

  it('should handle errors when fetching metadata', async () => {
    // Mock `fetchMetadata` to throw an error
    __fetchMetadata.mockRejectedValue(new Error('Failed to fetch metadata'));

    // Call the controller method
    await _fetchMetadata(req, res);

    // Assert that `res.status` was called with 500
    expect(res.status).toHaveBeenCalledWith(500); // Expected 500 status code
    // Assert that `res.json` was called with the correct error message
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch metadata' });
  });

  it('should handle CSRF token validation errors', async () => {
    // Simulate an invalid CSRF token
    req.headers['x-csrf-token'] = 'invalid-token';
    req.csrfToken = 'valid-token';

    // Call the controller method
    await _fetchMetadata(req, res);

    // Assert that `res.status` was called with 403
    expect(res.status).toHaveBeenCalledWith(403); // Expected 403 status code
    // Assert that `res.json` was called with the correct error message
    expect(res.json).toHaveBeenCalledWith({ error: 'CSRF token missing or invalid' });
  });
});
