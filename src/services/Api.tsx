import VALIDATION from "@/constants/validation";
import { store } from "@/redux/store";
import { ErrorResponse } from "@/types";

const headers = {
  "content-type": "application/json",
  "accept": "application/json",
  "Authorization": "",
};

async function handleResponse(p_response: any) {
  if (p_response.ok) {
    return p_response.json().catch(() => {});
  } else {
    let json = {
      message: "",
      errors: {},
    };
    json = await p_response.json();
    let errorMessages: Array<string> = [];
    let errorsObject: any;
    let errors: Array<string> = [];
    let codeEnumError : number = 0;
    if (json.errors && p_response.status == VALIDATION.ERROR_CODE.VALIDATE_FAILED) {
      errorsObject = Object.fromEntries(
        Object.entries(json.errors).map(([key, value]: [string, string[]]) => [
          key,
          value[0],
        ])
      );

      Object.keys(errorsObject).map(function (index) {
        errorMessages.push(errorsObject[index]);
      });

      errors = errorMessages;
    } else {
      errors = [json.message];
      codeEnumError = json.errors?.code ?? 0;
    }

    let error: ErrorResponse = {
      code: p_response.status,
      message: errors,
      codeEnumError: codeEnumError
    };

    console.log(error);

    throw error;
  }
}

const get: Function = (
  p_route: string,
  params: Record<string, any> | null,
  noCache = false
) => {
  const url = new URL(p_route);
  if (params) {
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });
  }
  
  let newHeaders: any = headers;
  newHeaders.Authorization = `Bearer ${store.getState().auth.token}`;
  if (noCache) {
    newHeaders["cache-control"] = "no-cache";
  }

  return fetch(url, {
    headers: newHeaders,
    method: "GET",
    credentials: "same-origin",
  }).then(async (p_response) => await handleResponse(p_response)).catch((error) => {
    let errorResponse: ErrorResponse = {
      code: error.code ?? 500,
      message: [error.message],
      codeEnumError: error.codeEnumError
    };

    throw errorResponse;
  });
};

const post: Function = (p_route: string, p_body: Object) => {
  headers.Authorization = `Bearer ${store.getState().auth.token}`;
  return fetch(p_route, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(p_body),
  }).then(async (p_response) => await handleResponse(p_response)).catch((error) => {
    let errorResponse: ErrorResponse = {
      code: error.code ?? 500,
      message: [error.message],
      codeEnumError: error.codeEnumError
    };

    throw errorResponse;
  });
};

export const api = {
  get,
  post,
};

