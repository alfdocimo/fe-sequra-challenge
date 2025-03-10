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

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<ResponseType>;
}
