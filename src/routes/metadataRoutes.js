import express from 'express';
import { fetchMetadata } from '../controllers/MetadataController.js';

const router = express.Router();

// Use the named export directly
router.post('/', fetchMetadata);

export default router;
