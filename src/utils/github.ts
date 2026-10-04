// Section 21: Custom issue URLs
// The Report Issue and Request Feature buttons must automatically include the page from which they were triggered.

const GITHUB_REPO_ISSUES = 'https://github.com/mkr-infinity/android-command-cheatsheet/issues/new';

export interface IssueContext {
  pageUrl?: string;
  command?: string;
  pageTitle?: string;
}

export function createFeatureRequestUrl(context?: IssueContext): string {
  const currentUrl = context?.pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const title = context?.command ? `[Feature] Suggestion for ${context.command}` : `[Feature] Request`;

  const body = `Feature request for Android Command Cheatsheet.

Requested feature: 
Page: ${currentUrl}
Command: ${context?.command || 'N/A'}
Additional details: 
`;

  const params = new URLSearchParams({
    title,
    body,
    labels: 'enhancement',
  });

  return `${GITHUB_REPO_ISSUES}?${params.toString()}`;
}

export function createReportIssueUrl(context?: IssueContext): string {
  const currentUrl = context?.pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  const title = context?.command ? `[Issue] Bug report for ${context.command}` : `[Issue] Bug report`;

  const body = `Issue report for Android Command Cheatsheet.

Page: ${currentUrl}
Command: ${context?.command || 'N/A'}
Problem: 
Expected behavior: 
Browser: ${userAgent}
`;

  const params = new URLSearchParams({
    title,
    body,
    labels: 'bug',
  });

  return `${GITHUB_REPO_ISSUES}?${params.toString()}`;
}
