import { defineStore } from "pinia";

const user = {
  uID: "",
  general: {
    name: "",
    nickName: "",
    birthdate: { nanoseconds: 0, seconds: 0 },
    gender: false,
  },
  account: {
    isPerson: true,
    mail: "",
    phoneNumber: "",
    photoURL: "",
  },
  settings: {
    isHidden: false,
    isReceivable: true,
    theme: "default",
  },
  count: {
    point: 0,
    follower: 0,
    followed: 0,
  },
};

const company = {
  uID: "",
  general: {
    taxID: "",
    address: "",
  },
  location: {
    latitude: 0,
    longitude: 0,
  },
  isChecked: false,
};

const auth = {
  accessToken: "",
  languageCode: "",
  currentUser: {
    accessToken: "",
    displayName: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: "",
    photoURL: "",
    uid: "",
  },
};
export const useUserRegister = defineStore("UserRegister", {
  state: () => ({
    photo: null,
    photoUrl: "",
    password: "",
    agreement: false,

    user: user,
    company: company,
  }),
  actions: {
    clear() {
      this.photo = null;
      this.photoUrl = "";
      this.password = "";
      this.agreement = false;

      this.user = user;
      this.company = company;
    },
  },
});

export const useUser = defineStore("User", {
  state: () => ({
    user: {
      userAuth: auth,
      userFire: user,
      userComp: company,
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setUserAuth(userAuth) {
      this.user.userAuth = userAuth;
    },
    setUserFire(userFire) {
      this.user.userFire = userFire;
    },
    clear() {
      this.user.userAuth = auth;
      this.user.userFire = user;
      this.user.userComp = company;
    },
  },
  getters: {
    uID: (state) => {
      if (state.user.userAuth) return state.user.userAuth.uid;
      else return false;
    },
    name: (state) => {
      if (state.user.userFire) return state.user.userFire.general.name;
      else return false;
    },
    nickName: (state) => {
      if (state.user.userFire) return state.user.userFire.general.nickName;
      else return false;
    },
    isPerson: (state) => {
      if (state.user.userFire) return state.user.userFire.account.isPerson;
      else return false;
    },
    photoURL: (state) => {
      if (state.user.userFire) return state.user.userFire.account.photoURL;
      else return false;
    },
  },
});

export const useUsers = defineStore("users", {
  state: () => ({
    dict: {},
    lists: {},
  }),
  actions: {
    addData(uID, data) {
      if (!this.dict[uID]) this.dict[uID] = {};
      this.dict[uID].uID = uID;
      this.dict[uID].data = data;
    },
    addDataAs(dID, uID, listID, data) {
      if (!this.dict[uID]) this.dict[uID] = {};
      if (!this.dict[uID][listID]) this.dict[uID][listID] = {};
      this.dict[uID][listID].dID = dID;
      this.dict[uID][listID].data = data;
    },
    addList(listID, uID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(uID)) this.lists[listID].push(uID);
    },
    addListAs(listID, uID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(uID)) this.lists[listID].push(uID);
    },
    addTo(listID, data) {
      this.addData(data.dID, data.data);
      this.addList(listID, data.dID);
    },
    addToMany(listID, data) {
      data.forEach((d) => {
        this.addTo(listID, d);
      });
    },
    addToAs(listID, dID, data) {
      this.addDataAs(data.dID, data.data[dID], listID, data.data);
      this.addListAs(listID, data.data[dID]);
    },
    addToAsMany(listID, dID2, data) {
      data.forEach((d) => {
        this.addToAs(listID, dID2, d);
      });
    },
    removeData(listID) {
      if (this.dict[listID].uID) delete this.dict[listID].uID;
      if (this.dict[listID].data) delete this.dict[listID].data;
    },
    removeDataAs(listID, uID) {
      if (this.dict[uID][listID].dID) delete this.dict[uID][listID].dID;
      if (this.dict[uID][listID].data) delete this.dict[uID][listID].data;
    },
    removeList(listID, uID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != uID);
    },
    removeListAs(listID, uID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != uID);
    },
    removeFrom(listID, data) {
      this.removeData(listID, data);
      this.removeList(listID);
    },
    removeFromAs(listID, dID, data) {
      data.data[dID], listID, this.removeDataAs(listID, data.data[dID]);
      this.removeListAs(listID, data.data[dID]);
    },
    getLastID(listID) {
      return this.lists[listID][this.lists[listID].length - 1];
    },
    getLast(listID) {
      if (!this.lists[listID]) return null;
      else return this.dict[this.getLastID(listID)];
    },
    getFirstID(listID) {
      return this.lists[listID][0];
    },
    getFirst(listID) {
      if (!this.lists[listID]) return null;
      else return this.dict[this.getFirstID(listID)];
    },
    clear() {
      this.dict = {};
      this.lists = {};
    },
  },
});