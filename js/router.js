const scripts = {
    404: null,
    '/': home,
    '/login': login,
    '/register': null,
    '/logout': null,
    '/edit': null,
};

const routes = {
    404: '/html/404.html',
    '/': '/html/home.html',
    '/login': '/html/login.html',
    '/register': '/html/register.html',
    '/logout': '/html/logout.html',
    '/edit': '/html/edit.html',
};

async function handleRoute() {
    const route_name = window.location.pathname;
    const route = routes[route_name] || routes[404];
    const html = await fetch(route).then(res => res.text());
    document.getElementById('page').innerHTML = html;
    scripts[route_name]();
}

window.onpopstate = handleRoute;
window.handleRoute = handleRoute;
window.history.pushState({}, '', '/'); // for testing, while hosting '/' will be the default/starting route
handleRoute();
