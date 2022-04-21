class Auth {
  constructor() {
    this.authenticated = false;
  }

  logIn(callback) {
    this.authenticated = true;
    console.log('successfully login');
    if(this.authenticated == true){
        alert(`current status is log in`)
    }else{
        alert(`current status is log out`)
    }
   
    callback();
  }
  logOut(callback) {
    this.authenticated = false;
    if(this.authenticated == true){
        alert(`current status is log in`)
    }else{
        alert(`current status is log out`)
    }
    callback();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth;
