const PORT=4000
export const backend_url = `http://localhost:${PORT}/api`

export const UserLocal = JSON.parse(localStorage.getItem('user')!);
