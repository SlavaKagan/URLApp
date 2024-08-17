import MetadataService from '../services/MetadataService.js';
import csrf from 'csurf';

// Export the fetchMetadata function as a named export
export async function fetchMetadata(req, res) {
  const { urls } = req.body;
  console.log('Received CSRF token:', req.headers['x-csrf-token']);
  console.log('Expected CSRF token:', req.csrfToken);

   // CSRF token check
   if (!req.headers['x-csrf-token'] || req.csrfToken !== req.headers['x-csrf-token']) {
    return res.status(403).json({ error: 'CSRF token missing or invalid' });
  }

  try {
    const metadata = await Promise.all(urls.map((url) => MetadataService.fetchMetadata(url)));
    return res.json(metadata);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch metadata' });
  }
  console.log('CSRF Token:', req.headers['x-csrf-token']);
  console.log('Expected Token:', req.csrfToken);
}
