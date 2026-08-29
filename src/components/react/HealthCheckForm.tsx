/**
 * HealthCheckForm.tsx
 *
 * Email capture form shown after health check results.
 * Handles:
 * - Email input and validation
 * - Submitting results to Netlify Forms
 * - Loading and success states
 * - Error handling
 *
 * Props:
 * - result: HealthCheckResult (from parent HealthCheck component)
 * - onSuccess?: () => void (callback after successful submission)
 */

import React, { useState } from 'react';
import { validateEmail } from '@lib/validation';
import type { HealthCheckResult } from '@lib/health-check';

interface Props {
  result: HealthCheckResult;
  onSuccess?: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function HealthCheckForm({ result, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    setStatus('loading');

    try {
      // Prepare form data for Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'health-check-report');
      formData.append('email', email);
      formData.append('url', result.url);
      formData.append('overall_score', result.scores.overall.toString());
      formData.append('performance_score', result.scores.performance.toString());
      formData.append('accessibility_score', result.scores.accessibility.toString());
      formData.append('security_score', result.scores.security.toString());
      formData.append('seo_score', result.scores.seo.toString());
      formData.append('message', message);

      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
      setEmail('');
      setMessage('');

      // Call success callback after 2 seconds
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send report';
      setError(errorMessage);
      setStatus('error');
    }
  };

  // Show success message
  if (status === 'success') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 text-center animate-fade-in">
        <div className="mb-4">
          <svg className="w-12 h-12 text-success mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-text-primary mb-2">Report Sent!</h4>
        <p className="text-sm text-text-secondary mb-4">
          A summary of your health check results has been sent to <strong>{email}</strong>.
        </p>
        <p className="text-xs text-text-secondary">
          We'll also review your report and reach out with recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h4 className="text-base font-semibold text-text-primary mb-2">Get a Detailed Report</h4>
      <p className="text-sm text-text-secondary mb-4">
        Enter your email below to receive a detailed report summary and get personalised recommendations.
      </p>

      <form onSubmit={handleSubmit} name="health-check-report" method="POST" className="space-y-4">
        {/* Hidden field for Netlify Forms */}
        <input type="hidden" name="form-name" value="health-check-report" />

        {/* Email Input */}
        <div>
          <label htmlFor="report-email" className="block text-sm font-medium text-text-primary mb-2">
            Your Email <span className="text-error">*</span>
          </label>
          <input
            id="report-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`
              w-full px-4 py-2
              bg-surface-raised border-2 rounded
              text-text-primary placeholder-text-secondary
              transition-all duration-200 ease-out
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
              disabled:opacity-60 disabled:cursor-not-allowed
              ${error && status === 'error' ? 'border-error' : 'border-border'}
            `}
            disabled={status === 'loading'}
            required
            aria-label="Your email address"
            aria-invalid={error && status === 'error' ? 'true' : 'false'}
          />
        </div>

        {/* Message (optional) */}
        <div>
          <label htmlFor="report-message" className="block text-sm font-medium text-text-primary mb-2">
            Message <span className="text-text-secondary text-xs">(optional)</span>
          </label>
          <textarea
            id="report-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your site or ask a specific question..."
            rows={3}
            className={`
              w-full px-4 py-2
              bg-surface-raised border-2 rounded
              text-text-primary placeholder-text-secondary
              transition-all duration-200 ease-out
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
              disabled:opacity-60 disabled:cursor-not-allowed
              resize-none
              ${error && status === 'error' ? 'border-error' : 'border-border'}
            `}
            disabled={status === 'loading'}
            aria-label="Optional message"
          />
        </div>

        {/* Error Message */}
        {error && status === 'error' && (
          <div className="p-3 bg-error bg-opacity-10 border border-error rounded text-error text-sm" role="alert">
            Failed to send report: {error}. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`
            w-full px-4 py-3
            bg-accent text-background font-medium rounded
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
            disabled:opacity-60 disabled:cursor-not-allowed
            ${status === 'loading' ? 'opacity-60' : 'hover:bg-accent-hover'}
          `}
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-background border-t-text-primary rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            'Send Report to My Email'
          )}
        </button>

        {/* Consent text */}
        <p className="text-xs text-text-secondary text-center">
          We'll use your email to send the report and reach out with recommendations. We respect your privacy.
        </p>
      </form>

      {/* Hidden Netlify Form Structure */}
      {/* This form is processed by Netlify's form handling */}
      {/* Form data is submitted to "/" via POST */}
    </div>
  );
}
