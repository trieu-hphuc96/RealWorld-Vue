import http from './../../share/http';

const getArticles = 'getArticles';
const addArticle = 'addArticle';
const updateArticle = 'updateArticle';
const deleteArticle = 'deleteArticle';
const favoriteArticle = 'favoriteArticle';
const unFavoriteArticle = 'unFavoriteArticle';

const ArticleActions = {
  [getArticles]({ commit, state }) {
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
  [addArticle]({ state }, articleInfo) {
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
  [updateArticle]({ state }, { article, slug }) {
    http
      .put('/articles/' + slug, article, {
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
  [deleteArticle]({ commit, state }, slug) {
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
  [favoriteArticle]({ commit, state }, slug) {
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
  [unFavoriteArticle]({ commit, state }, slug) {
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
  }
}

export default ArticleActions;