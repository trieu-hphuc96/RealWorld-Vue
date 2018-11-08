import http from './../../share/http';

const followPerson = 'followPerson';
const unFollowPerson = 'unFollowPerson';

const ProfileActions = {
  [followPerson]({ commit, state }, username) {
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
  [unFollowPerson]({ commit, state }, username) {
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

export default ProfileActions;