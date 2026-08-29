/**
 * HealthCheck.tsx
 *
 * Main health check tool component.
 * Handles:
 * - URL input and validation
 * - Running client-side analysis (using health-check.ts)
 * - Displaying results with scores and findings
 * - Error handling
 * - Loading states
 *
 * Props:
 * - onCheckComplete?: (result: HealthCheckResult) => void (callback after check)
 */

import React, { useState, useRef } from 'react';
import { runHealthCheck, type HealthCheckResult } from '@lib/health-check';
import { validateUrl, sanitiseInput, normaliseText } from '@lib/validation';
import HealthCheckForm from './HealthCheckForm';

interface Props {
  onCheckComplete?: (result: HealthCheckResult) => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function HealthCheck({ onCheckComplete }: Props) {
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Validate input
    const validation = validateUrl(urlInput);
    if (!validation.valid) {
      setError(validation.error || 'Invalid URL');
      return;
    }

    // Start loading
    setStatus('loading');

    try {
      // Run health check (all client-side)
      const checkResult = await runHealthCheck(urlInput);
      setResult(checkResult);
      setStatus('success');
      onCheckComplete?.(checkResult);

      // Scroll results into view
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while checking the website.';
      setError(errorMessage);
      setStatus('error');
    }
  };

  /**
   * Reset form and results
   */
  const handleReset = () => {
    setUrlInput('');
    setResult(null);
    setError('');
    setStatus('idle');
    inputRef.current?.focus();
  };

  /**
   * Get score color based on value
   */
  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#4caf50'; // Green (success)
    if (score >= 60) return '#f5a623'; // Orange (warning)
    return '#e74c3c'; // Red (error)
  };

  /**
   * Get priority badge color
   */
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical':
        return 'bg-error text-background';
      case 'high':
        return 'bg-warning text-background';
      case 'medium':
        return 'bg-accent text-background';
      case 'low':
        return 'bg-surface-raised text-text-secondary';
      default:
        return 'bg-surface-raised text-text-secondary';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ============================================================
          Input Form
          ============================================================ */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="mb-8">
          <label htmlFor="url-input" className="block text-sm font-medium text-text-primary mb-3">
            Enter your website URL to get started
          </label>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              ref={inputRef}
              id="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="example.com or https://example.com"
              className={`
                flex-1 px-4 py-3 md:py-3
                bg-surface border-2 rounded
                text-text-primary placeholder-text-secondary
                transition-all duration-200 ease-out
                focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                ${error && status === 'error' ? 'border-error' : 'border-border'}
              `}
              disabled={status === 'loading'}
              aria-label="Website URL"
              aria-invalid={error ? 'true' : 'false'}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`
                px-6 py-3 md:py-3
                bg-accent text-background font-medium rounded
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
                disabled:opacity-60 disabled:cursor-not-allowed
                ${status === 'loading' ? 'opacity-60' : 'hover:bg-accent-hover'}
              `}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-background border-t-accent rounded-full animate-spin" />
                  Checking...
                </span>
              ) : (
                'Check Website'
              )}
            </button>
          </div>

          {/* Error message */}
          {error && status === 'error' && (
            <div className="mt-3 p-4 bg-error bg-opacity-10 border border-error rounded text-error text-sm" role="alert">
              <p className="font-medium mb-1">Unable to check website</p>
              <p>{error}</p>
              <p className="text-xs mt-2 text-error text-opacity-75">
                Tip: Make sure the website is publicly accessible and doesn't block automated requests.
              </p>
            </div>
          )}
        </form>
      )}

      {/* ============================================================
          Results
          ============================================================ */}
      {result && status === 'success' && (
        <div ref={resultsRef} className="space-y-8 animate-fade-in">
          {/* Header */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2">
              Website Health Report for{' '}
              <code className="bg-surface rounded px-2 py-1 text-accent text-sm md:text-base break-all">{result.url}</code>
            </h3>
            <p className="text-sm text-text-secondary">
              Analysed on {new Date(result.timestamp).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-2">Overall Score</p>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#333333" strokeWidth="8" />
                  {/* Filled circle (percentage-based) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={getScoreColor(result.scores.overall)}
                    strokeWidth="8"
                    strokeDasharray={`${(result.scores.overall / 100) * (54 * 2 * Math.PI)} ${54 * 2 * Math.PI}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-text-primary">{result.scores.overall}</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-4">
                {result.scores.overall >= 80 && '✓ Excellent'}
                {result.scores.overall >= 60 && result.scores.overall < 80 && '⚠ Good'}
                {result.scores.overall < 60 && '✗ Needs work'}
              </p>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Performance', score: result.scores.performance },
              { label: 'Accessibility', score: result.scores.accessibility },
              { label: 'Security', score: result.scores.security },
              { label: 'SEO', score: result.scores.seo },
            ].map((category) => (
              <div key={category.label} className="bg-surface border border-border rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-3 font-medium uppercase tracking-wide">{category.label}</p>
                <div className="mb-2">
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-surface-raised rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${category.score}%`,
                        backgroundColor: getScoreColor(category.score),
                      }}
                    />
                  </div>
                </div>
                <p className="text-lg font-bold text-text-primary">{category.score}</p>
              </div>
            ))}
          </div>

          {/* Findings by Category */}
          <div className="space-y-6">
            {['critical', 'high', 'medium', 'low'].map((priority) => {
              const findingsInPriority = result.findings.filter((f) => f.priority === priority);
              if (findingsInPriority.length === 0) return null;

              return (
                <div key={priority}>
                  <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
                    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority ({findingsInPriority.length})
                  </h4>

                  <div className="space-y-3">
                    {findingsInPriority.map((finding, idx) => (
                      <div key={idx} className="bg-surface border border-border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {/* Priority badge */}
                          <span className={`text-xs font-semibold px-2 py-1 rounded flex-shrink-0 ${getPriorityColor(finding.priority)}`}>
                            {finding.priority.toUpperCase()}
                          </span>

                          {/* Finding details */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary mb-1">{finding.title}</p>
                            <p className="text-sm text-text-secondary mb-2">{finding.description}</p>
                            <details className="cursor-pointer">
                              <summary className="text-xs text-accent font-medium hover:text-accent-hover transition-colors">
                                Show recommendation
                              </summary>
                              <p className="mt-2 text-sm text-text-secondary">{finding.recommendation}</p>
                            </details>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="bg-surface-raised border border-border rounded-lg p-4">
            <p className="text-xs text-text-secondary">
              <strong>Disclaimer:</strong> {result.disclaimer}
            </p>
          </div>

          {/* Email Report Form */}
          <HealthCheckForm result={result} onSuccess={handleReset} />

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className={`
              w-full px-4 py-3
              bg-surface-raised text-accent font-medium rounded
              border border-border
              transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
              hover:bg-surface
            `}
          >
            Check Another Website
          </button>
        </div>
      )}

      {/* ============================================================
          Loading State
          ============================================================ */}
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin mb-4" />
          <p className="text-text-secondary text-center">
            Analysing your website...
            <br />
            <span className="text-xs text-text-secondary">This may take a few seconds.</span>
          </p>
        </div>
      )}

      {/* ============================================================
          Empty State
          ============================================================ */}
      {status === 'idle' && !urlInput && (
        <div className="text-center py-8">
          <p className="text-text-secondary text-sm">
            Enter your website URL above to get a free health check. No account needed.
          </p>
        </div>
      )}
    </div>
  );
}
