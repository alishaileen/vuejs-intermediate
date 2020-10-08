import Vue from "vue";
import VueRouter from "vue-router";

function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Landing",
            component: importComponent('Landing'),
        },
        // {
        //     path: "/list-code",
        //     name: "list-code",
        //     component: importComponent('Admin'),
        //     children: [
        //         // SPESIES
        //         {
        //             path: "/spesies",
        //             name: "AllSpesies",
        //             component: importComponent('Spesies/AllSpesies'),
        //             meta: {
        //                 auth: false,
        //                 title: 'eBurung'
        //             },
        //         },
        //     ]
        // },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

export default router;