function home() {
    window.history.pushState({}, '', '/login');
    handleRoute();
}

window.home = home;
