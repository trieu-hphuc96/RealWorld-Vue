<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="(error,i) in errors" v-bind:key="i">{{error}}</li>
          </ul>

          <form v-on:submit.prevent="login">
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {},
      subscribe: this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'errors') {
          this.errors = state.errors['login'];
        }
      })
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.user);
    }
  },
  mounted() {
    if(Object.keys(this.$store.state.user).length !== 0) {
      this.$store.commit('route','');
    }
  }
};
</script>

<style>
</style>
