import { invariant } from "@/shared/utils/invariant";

const BASE_URL = "http://localhost:8080"; // 💡 I would implement a check por a production environment

const apiClientDefaultOptions: RequestInit = {
  headers: { "Content-Type": "application/json" },
};

export const apiClient = {
  get<ResponseType>(url: string, options?: RequestInit): Promise<ResponseType> {
    return typedFetch<ResponseType>(url, {
      method: "GET",
      ...apiClientDefaultOptions,
      ...options,
    });
  },

  post<ResponseType, RequestBodyType = unknown>(
    url: string,
    body: RequestBodyType,
    options?: RequestInit
  ): Promise<ResponseType> {
    return typedFetch<ResponseType>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...apiClientDefaultOptions,
      ...options,
    });
  },

  put<ResponseType, RequestBodyType = unknown>(
    url: string,
    body: RequestBodyType,
    options?: RequestInit
  ): Promise<ResponseType> {
    return typedFetch<ResponseType>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...apiClientDefaultOptions,
      ...options,
    });
  },

  delete<ResponseType>(
    url: string,
    options?: RequestInit
  ): Promise<ResponseType> {
    return typedFetch<ResponseType>(url, { method: "DELETE", ...options });
  },
};

async function typedFetch<ResponseType>(
  url: string,
  options?: RequestInit
): Promise<ResponseType> {
  const response = await fetch(`${BASE_URL}${url}`, options);
  const contentLength = response.headers.get("Content-Length");

  invariant(!!response.ok, `HTTP error! Status: ${response.status}`);
  //Note: this throws always for /events api as the body is an empty body, not parseable as json
  invariant(Number(contentLength), `HTTP error! Content-Length is 0`);

  return response?.json() as Promise<ResponseType>;
}
