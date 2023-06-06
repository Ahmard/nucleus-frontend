export function useUrl(uri?: string): string {
  const config = useRuntimeConfig()
  return `${config.public.BACKEND_SERVER}/${uri}`
}

export function useApiUrl(uri?: string): string {
  const config = useRuntimeConfig()
  return useUrl(`api/${config.public.BACKEND_API_VERSION}/${uri}`)
}
