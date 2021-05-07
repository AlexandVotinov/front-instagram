import Home from "./views/Home.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

import Login from "./views/login/Login.js";
import Registration from "./views/registration/Registration.js";
import Profile from "./views/profile/Profile.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings },

        { path: "/registration", view: Registration },
        { path: "/login", view: Login },
        { path: "/profile/:id", view: Profile },
    ];

    if (!sessionStorage.getItem('token') && location.pathname != '/login'  && location.pathname != '/registration') {
        navigateTo('/login');
    }

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    const view = new match.route.view(getParams(match));
    
    // let css = document.querySelector('head link[data-type = app-style]')
    // css.href = `/static/js/views${match.route.path}/style.css`;
    await view.render();

    // document.querySelector('body script[data-type = app-script]').remove()
    // const script = document.createElement("script");
    // script.src = `/static/js/views${match.route.path}/script.js`;
    // script.setAttribute('data-type', 'app-script');
    // script.async = true;
    // document.body.appendChild(script);


};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});



export { navigateTo }; 