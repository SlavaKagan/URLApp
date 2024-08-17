import axios from 'axios';
import { JSDOM } from 'jsdom';

class MetadataService {
  async fetchMetadata(url) {
    try {
      const response = await axios.get(url);
      const dom = new JSDOM(response.data);
      const { document } = dom.window;
      const title = document.querySelector('title')?.textContent || 'No title';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 'No description';
      const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

      return { title, description, image };
    } catch (error) {
      throw new Error('Failed to fetch metadata');
    }
  }
}

export default new MetadataService();
