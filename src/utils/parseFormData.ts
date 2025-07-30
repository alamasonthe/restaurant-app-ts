export function parseFormData(body: string): Record<string, string> {
  const result: Record<string, string> = {};
  
  body.split('&').forEach(pair => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      result[key] = value.replace(/\+/g, ' ');
    }
  });

  return result;
}
