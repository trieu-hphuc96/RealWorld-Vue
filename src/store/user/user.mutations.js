import Cookies from 'js-cookie';

const setUser = 'setUser';

const UserMutations = {
  [setUser](state, { user, route }) {
    state.user = user;
    state.isLogin = true;
    console.log(state.user);
    Cookies.set('user', user, { expires: 0.02 });

    this.commit('route', route);
  }
}

export default UserMutations;