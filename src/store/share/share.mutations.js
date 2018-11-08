const route = 'route';
const errors = 'errors';

const ShareMutations = {
  [route](state, href) {
    window.location.href = window.location.origin + '/#' + href;
    state.currentRoute = window.location.hash;
  },
  [errors](state, info) {
    state.errors[info.action] = []
    Object.keys(info.error).map((item, index) => {
      state.errors[info.action].push(item + ' ' + info.error[item][0])
    })
    console.log(state.errors);
  }
}

export default ShareMutations;