import {useApiUrl} from "~/composables/url";

export function axiosHandleError(error: any) {
  let message = 'Something went wrong, please try again';

  if (error.response && error.response._data) {
    if (error.response._data) {
      const type = typeof error.response._data;

      // Handle uncontrolled server error
      if (type === 'string') {
        message = error.response._data;
      }

      // Handle controlled-json error
      if (type === 'object') {
        message = error.response._data.data.message;
      }
    }
  }

  ElMessage({
    message,
    type: 'error',
    duration: 15 * 1000,
    center: true,
    grouping: true,
    showClose: true,
  })

  throw error
}

export async function xhrPost(uri: string, data: any) {
  return $fetch(
    useApiUrl('auth/register'),
    {method: 'POST', body: data}
  ).catch(axiosHandleError);
}
