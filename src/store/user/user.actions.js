import http from './../../share/http';

const register = 'register';
const login = 'login';
const updateUser = 'updateUser';

const UserActions = { 
  [register]({ commit }, registerInfo) {
    http
      .post('/users', registerInfo)
      .then(res => {
        console.log(res);
        commit('setUser', { user: res.data.user, route: '' })
      })
      .catch(error => {
        console.log(error.response);
        commit('errors', { action: 'register', error: error.response.data.errors })
      })
  },
  [login]({ commit }, loginInfo) {
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
  [updateUser]({ commit, state }, userInfo) {
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
}

export default UserActions;