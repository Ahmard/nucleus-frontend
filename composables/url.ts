export function useUrl(uri?: string): string {
  const config = useRuntimeConfig()
  return `${config.public.BACKEND_SERVER}/${uri}`
}

export function useApiUrl(uri?: string): string {
  return useUrl(`api/v1/${uri}`)
}
