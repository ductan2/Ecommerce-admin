export const UserLocal = JSON.parse(localStorage.getItem('user')!) ? JSON.parse(localStorage.getItem('user')!) : null;

export const auth = { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${UserLocal?.token}` } }