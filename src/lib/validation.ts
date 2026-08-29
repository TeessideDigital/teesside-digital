/**
 * Form Validation Utilities
 * Client-side validation for forms (contact, health check)
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email address
 * Uses HTML5 email validation pattern
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      valid: false,
      error: 'Email is required',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: 'Please enter a valid email address',
    };
  }

  return { valid: true };
}

/**
 * Validate URL
 * Accepts http, https, and relative paths
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return {
      valid: false,
      error: 'Website URL is required',
    };
  }

  try {
    // Try to parse as absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url);
      return { valid: true };
    }

    // If no protocol, try adding https
    if (!url.includes('://')) {
      new URL(`https://${url}`);
      return { valid: true };
    }

    return { valid: true };
  } catch {
    return {
      valid: false,
      error: 'Please enter a valid website URL',
    };
  }
}

/**
 * Validate text field (non-empty, reasonable length)
 */
export function validateText(text: string, minLength = 1, maxLength = 5000): ValidationResult {
  if (!text || text.trim() === '') {
    return {
      valid: false,
      error: 'This field is required',
    };
  }

  if (text.length < minLength) {
    return {
      valid: false,
      error: `Minimum ${minLength} character(s) required`,
    };
  }

  if (text.length > maxLength) {
    return {
      valid: false,
      error: `Maximum ${maxLength} character(s) allowed`,
    };
  }

  return { valid: true };
}

/**
 * Validate name field
 */
export function validateName(name: string): ValidationResult {
  const result = validateText(name, 2, 100);

  if (!result.valid) {
    return {
      valid: false,
      error: 'Please enter your name',
    };
  }

  // Basic check: should have at least 2 letters (allows spaces, hyphens, etc)
  const letters = name.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 2) {
    return {
      valid: false,
      error: 'Please enter a valid name',
    };
  }

  return { valid: true };
}

/**
 * Sanitise input to prevent XSS
 * Removes/escapes potentially dangerous characters
 */
export function sanitiseInput(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return input.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Trim and deduplicate whitespace
 */
export function normaliseText(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name?: string;
  email?: string;
  message?: string;
}): ValidationResult {
  if (!data.name) {
    return { valid: false, error: 'Name is required' };
  }

  const nameResult = validateName(data.name);
  if (!nameResult.valid) {
    return nameResult;
  }

  if (!data.email) {
    return { valid: false, error: 'Email is required' };
  }

  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    return emailResult;
  }

  if (!data.message) {
    return { valid: false, error: 'Message is required' };
  }

  const messageResult = validateText(data.message, 10, 5000);
  if (!messageResult.valid) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters' };
  }

  return { valid: true };
}

/**
 * Validate health check form data
 */
export function validateHealthCheckForm(data: { email?: string; url?: string }): ValidationResult {
  if (!data.email) {
    return { valid: false, error: 'Email is required' };
  }

  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    return emailResult;
  }

  if (!data.url) {
    return { valid: false, error: 'Website URL is required' };
  }

  const urlResult = validateUrl(data.url);
  if (!urlResult.valid) {
    return urlResult;
  }

  return { valid: true };
}
