<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form v-on:submit.prevent="submitArticle">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tag" v-on:keydown.enter.prevent="addTag">
                <div class="tag-list">
                  <span class="tag-default tag-pill ng-binding ng-scope" v-for="(item, i) in article.tagList" v-bind:key="i">
                    <i class="ion-close-round"></i>
                    {{item}}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editor',
  props: ['editArticle'],
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tag: '',
        tagList: []
      }
    };
  },
  methods: {
    submitArticle() {
      console.log(this.article);
      const data = {
        article: {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList
        }
      };

      this.$store.dispatch('addArticle', data);
    },
    addTag() {
      if (this.article.tag !== '') {
        this.article.tagList.push(this.article.tag);
        this.article.tag = '';
        console.log(this.article.tagList);
      }
    }
  }
};
</script>

<style>
</style>
