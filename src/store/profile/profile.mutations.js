const changeProfile = 'changeProfile';
const updateProfileData = 'updateProfileData';

const ProfileMutations = {
  [changeProfile](state, profileData) {
    console.log(profileData);
    console.log(state.currentRoute);
    state.profileData = profileData;
    if (Object.keys(state.user).length > 0 && state.profileData.username === state.user.username) {
      state.profileData.isUser = true;
    } else {
      state.profileData.isUser = false;
    }

    // prevent route again
    if (state.currentRoute !== '#/profile') {
      this.commit('route', '/profile')
    }
  },
  [updateProfileData](state, { following }) {
    state.profileData.following = following;
  },
}

export default ProfileMutations;