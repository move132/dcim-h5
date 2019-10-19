export default {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("userDate")) || {}
    },
    mutations: {
        LOGIN(state, data) {
            state.token = data.token;
            state.user = data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("userDate", JSON.stringify(data));
        }
    },
    actions: {
        /* async login(state, data) {
            try {
                let res = await login({
                    username: data.username,
                    password: data.password
                })
                state.commit('LOGIN', res);
                Toast('登录成功');
                setTimeout(() => {
                    const redirect = data.$route.query.redirect || '/';
                    data.$router.replace({
                        path: redirect
                    })
                }, 3000);
            } catch (error) {
            }
        } */
    },
    getters: {
        token(state) {
            return state.token;
        },
        user(state) {
            return state.user;
        }
    }
};
