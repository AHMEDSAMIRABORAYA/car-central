// Simple demo auth (localStorage). Not for production.
const AUTH_KEY = "cr_users";
const AUTH_SESSION = "cr_logged_in";

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) { localStorage.setItem(AUTH_KEY, JSON.stringify(users)); }

export function signUp({ firstName, lastName, email, password }) {
  const users = loadUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already exists. Please log in.");
  }
  users.push({ firstName, lastName, email, password });
  saveUsers(users);
  return true;
}

export function logIn({ email, password }) {
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  localStorage.setItem(AUTH_SESSION, JSON.stringify({ email: user.email, name: user.firstName || "" }));
  return true;
}

export function logOut() { localStorage.removeItem(AUTH_SESSION); }
export function currentUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_SESSION)); }
  catch { return null; }
}

export function requireAuth(redirectTo = "login.html") {
  if (!currentUser()) {
    window.location.href = redirectTo;
  }
}

window.Auth = { signUp, logIn, logOut, currentUser, requireAuth };