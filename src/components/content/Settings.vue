<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ul class="error-messages">
            <li v-for="(error,i) in errors" v-bind:key="i">{{error}}</li>
          </ul>

          <form v-on:submit.prevent="submitEditProfile">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
              </fieldset>
              <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr>
          <button class="btn btn-outline-danger" v-on:click.prevent="logOut">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'settings',
  data() {
    return {
      user: {
        image: this.$store.state.user.image,
        username: this.$store.state.user.username,
        bio: this.$store.state.user.bio,
        email: this.$store.state.user.email,
        password: ''
      },
      errors: {},
      subscribe: this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'errors') {
          this.errors = state.errors['user'];
        }
      })
    };
  },
  methods: {
    submitEditProfile() {
      this.$store.dispatch('updateUser', this.user);
      console.log(this.$store.state.user);
      console.log(this.$store.state.errors);
      console.log(this.user);
    },
    logOut() {
      Cookies.remove('user');
      this.$store.state.user = {};
      this.$store.state.isLogin = false;
      this.$store.commit('route', '');
    }
  }
};
</script>

<style>
</style>
