export function endpointPath(endpoint: string) {
  return `${import.meta.env.VITE_API_URL}${endpoint}`;
}
