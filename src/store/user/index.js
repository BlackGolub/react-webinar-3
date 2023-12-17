import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      authorization: false,
      user: {
        name: "",
        phone: "",
        email: "",
      },
      error: ""
    };
  }

  async getUser(data) {
    fetch('/api/v1/users/sign', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.json())
      }
      return res.json();
    })
    .then(res => {
      this.setState({
        authorization: true,
        user: {
          name: res.result.user.profile.name,
          phone: res.result.user.profile.phone,
          email: res.result.user.email
        },
        error: ""
      });
    })
    .catch(err => {
      err.then(e => {
        this.setState({
          ...this.initState(),
          error: e.error.data.issues[0].message
        })
      });
    })
  }

  async authUser() {
    if (!document.cookie) return;
    fetch('/api/v1/users/self?fields=*', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": document.cookie.slice(6)
      },
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        authorization: true,
        user: {
          name: res.result.profile.name,
          phone: res.result.profile.phone,
          email: res.result.email
        },
        error: ""
      });
    })
    .catch(err => console.log(err));
  }

  async exitUser() {
    fetch('/api/v1/users/sign', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": document.cookie.slice(6)
      },
    })
    .then(res => res.json())
    .then(() => {
      this.setState({
        authorization: false,
        user: {
          name: "",
          phone: "",
          email: "",
        },
        error: ""
      });
      this.deleteCookies();
    })
    .catch(err => console.log(err));
  }

  deleteCookies() {
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
      const cook = cookie.indexOf("=");
      const name = cook > -1 ? cookie.substring(0, cook) : cookie.trim();
      document.cookie = name + "=;expires=Thu, 06 Dec 1996 00:00:00 GMT; path=/";
    });
  }

  deleteError() {
    this.setState({
      ...this.getState(),
      error: ""
    });
  }
}

export default UserState;