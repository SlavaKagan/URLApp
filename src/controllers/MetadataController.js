import MetadataService from '../services/MetadataService.js';

// Export the fetchMetadata function as a named export
export async function fetchMetadata(req, res) {
  const { urls } = req.body;

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
}
