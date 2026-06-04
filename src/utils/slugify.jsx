// utils/slugify.js

// Cleans raw data text into lowercase URL-friendly slugs
export function cleanUrlSegment(text) {
    if (!text) return "na";
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")          // Replace spaces with hyphens
        .replace(/&/g, "and")          // Convert ampersands to 'and'
        .replace(/[^a-zA-Z0-9\-]/g, ""); // Strip out special characters
}