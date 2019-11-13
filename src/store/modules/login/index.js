export default {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("userDate")) || {},
        userId: localStorage.getItem("userId") || ""
    },
    mutations: {
        LOGIN(state, data) {
            state.token = data.token;
            state.user = data;
            state.userId = data.userId;
            localStorage.setItem("token", data.token);
            localStorage.setItem("userDate", JSON.stringify(data));
            localStorage.setItem("userId", data.userId);
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
        },
        userId(state) {
            return state.userId;
        }
    }
};
