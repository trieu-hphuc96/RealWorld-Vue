import Vuex from 'vuex';
import Vue from 'vue';
import http from './shared/http';
import Cookies from 'js-cookie';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
    isLogin: Cookies.get('user') ? true : false,
    articles: [],
    profileData: Cookies.get('user') ? { ...JSON.parse(Cookies.get('user')), isUser: true } : { isUser: false },
    errors: {},
    currentRoute: window.location.hash
  },
  mutations: {
    setUser(state, { user, route }) {
      state.user = user;
      state.isLogin = true;
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
    },
    updateArticle(state, { slug, data }) {
      state.articles.map(item => {
        if (item.slug === slug) {
          data.map(({ field, value }) => {
            item[field] = value;
          })
        }
      })
    },
    changeProfile(state, profileData) {
      console.log(profileData);
      console.log(state.currentRoute);
      state.profileData = profileData;
      if (state.profileData.username === state.user.username) {
        state.profileData.isUser = true;
      } else {
        state.profileData.isUser = false;
      }

      // prevent route again
      if (state.currentRoute !== '#/profile') {
        this.commit('route', '/profile')
      }
    },
    updateProfileData(state, { following }) {
      state.profileData.following = following;
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
    getArticles({ commit, state }) {
      if (state.isLogin) {
        http.get('/articles', {
          headers: { 'Authorization': 'Token ' + state.user.token }
        }).then(res => {
          commit('setArticles', res.data.articles);
        });
      } else {
        http.get('/articles').then(res => {
          commit('setArticles', res.data.articles);
        });
      }
    },
    addArticle({ dispatch, state }, articleInfo) {
      console.log(articleInfo);

      http
        .post('/articles', articleInfo, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          console.log(res);
          this.commit('route', '');
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    updateArticle({ dispatch, state }, {article, slug}) {
      http
        .put('/articles/'+slug, article, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          console.log(res);
          this.commit('route', '');
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    deleteArticle({ commit, state }, slug) {
      http
        .delete('/articles/' + slug, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('route', '');
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
    },
    favoriteArticle({ commit, state }, slug) {
      http
        .post('/articles/' + slug + '/favorite', {}, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('updateArticle', {
            slug, data: [{
              field: 'favorited', value: true,
            }, {
              field: 'favoritesCount', value: res.data.article.favoritesCount
            }]
          })
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    unFavoriteArticle({ commit, state }, slug) {
      http
        .delete('/articles/' + slug + '/favorite', {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('updateArticle', {
            slug, data: [{
              field: 'favorited', value: false,
            }, {
              field: 'favoritesCount', value: res.data.article.favoritesCount
            }]
          })
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    followPerson({ commit, state }, username) {
      http
        .post('/profiles/' + username + '/follow', {}, {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('updateProfileData', {
            following: true
          })
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    unFollowPerson({ commit, state }, username) {
      http
        .delete('/profiles/' + username + '/follow', {
          headers: { 'Authorization': 'Token ' + state.user.token }
        })
        .then(res => {
          commit('updateProfileData', {
            following: false
          })
        })
        .catch(error => {
          console.log(error.response);
        })
    }
  }
})

window.addEventListener('popstate', () => {
  store.state.currentRoute = window.location.hash;
})

export default store;