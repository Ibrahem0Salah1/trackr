type ErrorRecord = Record<string, unknown>;

function extractMessage(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const message = extractMessage(item);
      if (message) {
        return message;
      }
    }
    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as ErrorRecord & { _errors?: unknown[] };

  if (Array.isArray(record._errors)) {
    for (const item of record._errors) {
      const message = extractMessage(item);
      if (message) {
        return message;
      }
    }
  }

  for (const nestedValue of Object.values(record)) {
    const message = extractMessage(nestedValue);
    if (message) {
      return message;
    }
  }

  return null;
}

export function getApiErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const record = payload as { error?: unknown; message?: unknown };

  return (
    extractMessage(record.error) ??
    extractMessage(record.message) ??
    fallback
  );
}
