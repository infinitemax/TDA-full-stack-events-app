import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  // this is a method to make an authenicatd call to the backend api
  // it makes an axios request to the server to fetch data
  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider(),
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }
    });
  }

  // each of these methods calls authenticatedCall and makes the relevant axios request. 
  getEvents() {
    return this.authenticatedCall("get", url);
  }

  addEvent(name, price) {
    return this.authenticatedCall("post", url, { title, venue, price });
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, price) {
    return this.authenticatedCall("put", `${url}${id}`, { name, price });
  }

  async login(username, password) {
    return await axios({
      method: "post",
      url: `${url}auth`,
      data: { username, password },
    });
  }
}