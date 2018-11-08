const setArticles = 'setArticles';
const updateArticle = 'updateArticle';

const ArticleMutations = {
  [setArticles](state, data) {
    state.articles = data;
  },
  [updateArticle](state, { slug, data }) {
    state.articles.map(item => {
      if (item.slug === slug) {
        data.map(({ field, value }) => {
          item[field] = value;
        })
      }
    })
  }
}

export default ArticleMutations;