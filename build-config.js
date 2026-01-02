#!/usr/bin/env node

/**
 * Build script to generate config.js and update index.html with form ID
 * This allows you to store the form ID in Netlify's environment variables
 * instead of committing it to the repository.
 * 
 * Usage:
 * 1. Set FORMPREE_FORM_ID in Netlify's environment variables
 * 2. Add this script as a build command in netlify.toml
 * 
 * For local development:
 * - If env vars are not set, it will read from existing config.js
 * - If config.js doesn't exist, it will use the example template
 */

const fs = require('node:fs');
const path = require('node:path');

let formId = process.env.FORMPREE_FORM_ID || process.env.FORMSPREE_FORM_ID;

// If no env var, try to read from existing config.js (for local development)
if (!formId) {
    const configPath = path.join(__dirname, 'config.js');
    if (fs.existsSync(configPath)) {
        try {
            const configContent = fs.readFileSync(configPath, 'utf8');
            const match = configContent.match(/formspreeFormId:\s*['"]([^'"]+)['"]/);
            if (match) {
                formId = match[1];
                console.log('✓ Using form ID from existing config.js');
            }
        } catch (error) {
            console.warn('Warning: Could not read config.js:', error.message);
        }
    }
}

if (!formId) {
    console.error('Error: FORMPREE_FORM_ID or FORMSPREE_FORM_ID environment variable not set');
    console.error('Please set it in Netlify dashboard: Site settings → Environment variables');
    console.error('Or create config.js with your form ID for local development');
    process.exit(1);
}

// Generate config.js
const configContent = `// Configuration file - Auto-generated from Netlify environment variables
// DO NOT EDIT MANUALLY - This file is regenerated on each build

globalThis.WEDDING_CONFIG = {
    formspreeFormId: '${formId}'
};
`;

const configPath = path.join(__dirname, 'config.js');

try {
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log('✓ config.js generated successfully');
} catch (error) {
    console.error('Error writing config.js:', error);
    process.exit(1);
}

// Note: Form action is set dynamically via JavaScript to keep form ID out of HTML source
// No need to modify index.html - the form action is set from config.js at runtime

