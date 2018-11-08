import Vuex from 'vuex';
import Vue from 'vue';
import Cookies from 'js-cookie';

import ShareMutations from './share/share.mutations';
import UserMutations from './user/user.mutations';
import UserActions from './user/user.actions';
import ArticleMutations from './article/article.mutations';
import ArticleActions from './article/article.actions';
import ProfileMutations from './profile/profile.mutations';
import ProfileActions from './profile/profile.actions';

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
    ...ShareMutations,
    ...UserMutations,
    ...ArticleMutations,
    ...ProfileMutations
  },
  actions: {
    ...UserActions,
    ...ArticleActions,
    ...ProfileActions
  }
})

window.addEventListener('popstate', () => {
  store.state.currentRoute = window.location.hash;
})

export default store;