import Vue from "vue";
import VueRouter from "vue-router";

function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            name: "Landing",
            component: importComponent('Landing'),
        },
        {
            path: "/list-kode",
            name: "ListKode",
            component: importComponent('ListKode'),
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

export default router;