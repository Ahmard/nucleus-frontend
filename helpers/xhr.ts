import {XhrResponseData} from "~/types/xhr";
import {LooseObject} from "~/types/loose.object";

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

export async function xhrPost(uri: string, data: any, headers: LooseObject = {}): Promise<XhrResponseData> {
  headers = Object.assign(headers, makeAuthorizationHeader());
  // @ts-ignore
  return $fetch(uri, {method: 'POST', body: data, headers})
    .catch(axiosHandleError);
}

export async function xhrPut(uri: string, data: any, headers: LooseObject = {}): Promise<XhrResponseData> {
  headers = Object.assign(headers, makeAuthorizationHeader());
  // @ts-ignore
  return $fetch(uri, {method: 'PUT', body: data, headers})
    .catch(axiosHandleError);
}

export async function xhrGet(uri: string, params: LooseObject = {}): Promise<XhrResponseData> {
  const headers = makeAuthorizationHeader();
  // @ts-ignore
  return $fetch(uri, {params, headers})
    .catch(axiosHandleError);
}

export async function xhrDelete(uri: string, params: LooseObject = {}): Promise<XhrResponseData> {
  const headers = makeAuthorizationHeader();
  // @ts-ignore
  return $fetch(uri, {method:'DELETE', params, headers})
    .catch(axiosHandleError);
}

function makeAuthorizationHeader() {
  return {Authorization: useAuth().tokenStrategy.token?.get()}
}
