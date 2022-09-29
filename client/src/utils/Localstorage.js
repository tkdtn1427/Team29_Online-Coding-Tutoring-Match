function addTokenLocalStorage({ refreshToken, accessToken }) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

function getToken() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
}

function addRoleLocalStorage(Role) {
  localStorage.setItem('Role', Role);
}

function addUserLovalStorage(userId) {
  localStorage.setItem('userId', userId);
}

function getUser() {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('Role');
  return { userId, role };
}

function removeUser() {
  localStorage.removeItem('userId');
  localStorage.removeItem('Role');
}

export { addTokenLocalStorage, getToken, addRoleLocalStorage, addUserLovalStorage, getUser, removeUser };
