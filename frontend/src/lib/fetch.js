const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

export async function fetchInstance(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
    body: options.body && JSON.stringify(options.body),
  });

  if (!res.ok) {
    throw new Error((await res.text()) || `HTTP ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
