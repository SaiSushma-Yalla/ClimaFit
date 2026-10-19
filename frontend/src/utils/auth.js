import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // Token expiry check
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return null;
    }

    // Return single role or first from array
    return decoded.role || (Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles) || null;
  } catch (err) {
    return null;
  }
}
