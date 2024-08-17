// src/tests/MetadataService.test.js
import MetadataService from '../services/MetadataService.js';
import axios from 'axios';

// Mock axios to simulate HTTP requests
jest.mock('axios');

describe('MetadataService', () => {
  it('should fetch metadata successfully', async () => {
    const url = 'https://example.com';
    const mockedResponse = {
      data: `
        <html>
          <head>
            <title>Example Domain</title>
            <meta name="description" content="This is an example description.">
            <meta property="og:image" content="https://example.com/image.png">
          </head>
        </html>
      `,
    };

    axios.get.mockResolvedValue(mockedResponse);

    const metadata = await MetadataService.fetchMetadata(url);

    expect(metadata).toEqual({
      title: 'Example Domain',
      description: 'This is an example description.',
      image: 'https://example.com/image.png',
    });
  });

  it('should return default values if metadata is missing', async () => {
    const url = 'https://example.com';
    const mockedResponse = {
      data: `
        <html>
          <head>
            <title></title>
          </head>
        </html>
      `,
    };

    axios.get.mockResolvedValue(mockedResponse);

    const metadata = await MetadataService.fetchMetadata(url);

    expect(metadata).toEqual({
      title: 'No title',
      description: 'No description',
      image: '',
    });
  });

  it('should throw an error if fetching metadata fails', async () => {
    const url = 'https://example.com';
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(MetadataService.fetchMetadata(url)).rejects.toThrow('Failed to fetch metadata');
  });
});
