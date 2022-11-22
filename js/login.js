function login() {
  const login = document.getElementById("login_button");
  login.addEventListener("click", () => {
    window.history.pushState({}, '', '/');
    handleRoute();
  });
}

window.login = login;
