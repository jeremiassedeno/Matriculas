const BASE_URL = "/api";

async function request(path, options = {}) {
  const token = sessionStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();

  if (!res.ok) {
    let mensaje = "Error desconocido";

    if (text) {
      try {
        const errorBody = JSON.parse(text);

        mensaje =
          errorBody.mensaje ||
          errorBody.message ||
          errorBody.error ||
          errorBody.mensajes?.[0] ||
          mensaje;
      } catch {
        mensaje = text;
      }
    }

    throw new Error(mensaje);
  }

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};