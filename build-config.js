#!/usr/bin/env node

/**
 * Build script to generate config.js from Netlify environment variables
 * This allows you to store the form ID in Netlify's environment variables
 * instead of committing it to the repository.
 * 
 * Usage:
 * 1. Set FORMPREE_FORM_ID in Netlify's environment variables
 * 2. Add this script as a build command in netlify.toml
 */

const fs = require('node:fs');
const path = require('node:path');

// Get form ID from environment variable (set in Netlify dashboard)
const formId = process.env.FORMPREE_FORM_ID || process.env.FORMSPREE_FORM_ID;

if (!formId) {
    console.error('Error: FORMPREE_FORM_ID or FORMSPREE_FORM_ID environment variable not set');
    console.error('Please set it in Netlify dashboard: Site settings → Environment variables');
    process.exit(1);
}

const configContent = `// Configuration file - Auto-generated from Netlify environment variables
// DO NOT EDIT MANUALLY - This file is regenerated on each build

globalThis.WEDDING_CONFIG = {
    formspreeFormId: '${formId}'
};
`;

const configPath = path.join(__dirname, 'config.js');

try {
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log('✓ config.js generated successfully from environment variables');
} catch (error) {
    console.error('Error writing config.js:', error);
    process.exit(1);
}

