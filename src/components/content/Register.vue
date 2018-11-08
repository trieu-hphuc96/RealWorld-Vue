<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="" v-on:click.prevent="$store.commit('route','/login')">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="(error,i) in errors" v-bind:key="i">{{error}}</li>
          </ul>

          <form v-on:submit.prevent="register">
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {},
      subscribe: this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'errors') {
          this.errors = state.errors['register'];
        }
      })
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', { user: this.user });
    }
  }
};
</script>

<style>
</style>
