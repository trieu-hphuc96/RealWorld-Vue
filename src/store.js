import Vuex from 'vuex';
import Vue from 'vue';
import http from './shared/http';
import Cookies from 'js-cookie';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
    articles: [],
    errors: {},
    currentRoute: window.location.hash
  },
  mutations: {
    setUser(state, { user, route }) {
      state.user = user;
      console.log(state.user);
      Cookies.set('user', user, { expires: 0.02 });

      this.commit('route', route);
    },
    route(state, href) {
      window.location.href = window.location.origin + '/#' + href;
      state.currentRoute = window.location.hash;
    },
    setArticles(state, data) {
      state.articles = data;
      console.log(data);
    },
    errors(state, info) {
      state.errors[info.action] = []
      Object.keys(info.error).map((item, index) => {
        state.errors[info.action].push(item + ' ' + info.error[item][0])
      })
      console.log(state.errors);
    }
  },
  actions: {
    login({ commit }, loginInfo) {
      const data = {
        user: {
          email: loginInfo.email,
          password: loginInfo.password,
        }
      }

      http
        .post('/users/login', data)
        .then(res => {
          commit('setUser', { user: res.data.user, route: '' })
        })
        .catch(error => {
          console.log(error.response);
          commit('errors', { action: 'login', error: error.response.data.errors })
        })
    },
    getArticles({ commit }) {
      http.get('/articles').then(res => {
        commit('setArticles', res.data.articles);
      });
    },
    addArticle({ dispatch, commit, state }, articleInfo) {
      console.log(articleInfo);

      http
        .post('/articles', articleInfo, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          console.log(res);
          dispatch('getArticles');
          this.commit('route', '');
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    updateUser({ commit, state }, userInfo) {
      console.log(userInfo);
      http.put('/user', userInfo,
        {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('setUser', { user: res.data.user, route: '' })
        })
        .catch(error => {
          commit('errors', { action: 'user', error: error.response.data.errors })
        })
    }
  }
})

window.addEventListener('popstate', () => {
  store.state.currentRoute = window.location.hash;
})

export default store;