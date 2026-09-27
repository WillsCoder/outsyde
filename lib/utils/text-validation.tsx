export const containsUnsafeInput = (value: string) => {
  // Blocks HTML tags, script tags, javascript: URLs, and event handlers
  const unsafePatterns = [
    /<[^>]*>/i, // HTML tags
    /javascript\s*:/i, // javascript: URLs
    /on\w+\s*=/i, // onclick=, onerror=, onload=, etc.
    /<script[\s\S]*?>/i, // script tags
    /<\/script>/i,
  ];

  return unsafePatterns.some((pattern) => pattern.test(value));
};
