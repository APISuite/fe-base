/** fetch wrapper */

export interface ErrorReason {
  status: number,
  message: string,
}

const jsonRgx = /application\/json/;

export async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("Content-Type");

  if (response.ok) {
    if (contentType != null && jsonRgx.test(contentType)) {
      return Promise.resolve(response.json());
    }

    return Promise.resolve(response.text());
  }

  if (contentType != null && jsonRgx.test(contentType)) {
    return response.json().then((json) => {
      const reason: ErrorReason = {
        status: response.status || (response as any).statusCode,
        message: json.message || (response as any).message || response.statusText,
      };

      return Promise.reject(reason);
    });
  }

  return response.text().then((text) => {
    const reason: ErrorReason = {
      status: response.status || (response as any).statusCode,
      message: text,
    };

    return Promise.reject(reason);
  });
}
