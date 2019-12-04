export default {
    namespaced: true,
    state: {
        areaCache: ""
    },
    mutations: {
        AREACACHE(state, data) {
            state.areaCache = data;
        }
    },
    actions: {
        areaCache(state, data) {
            state.commit('AREACACHE', data);
        }
    },
    getters: {
        areaCache(state) {
            return state.areaCache;
        }
    }
};
