import { ApiServerName } from "./Constants/CommonConstants";
import auth from "../../services/authService";

const processError = (error, status, errorHandler) => {
  console.log("status code: ", status, " error: ", error);
  if (errorHandler) {
    errorHandler(status, error);
  }
  if (status === 401) {
    auth.deleteToken();
    window.location.replace("/login");
  }
};

class RestAPIHandler {
  static serverName = ApiServerName;

  static Get(moduleName, successHandler, errorHandler) {
    const httpHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    const token = auth.getToken();
    if (token) {
      httpHeaders.append("Authorization", `Bearer ${token}`);
    }

    fetch(this.serverName + moduleName, {
      method: "GET",
      headers: httpHeaders,
    })
      .then((res) => {
        return res.text().then((text) => {
          let data = text.length ? JSON.parse(text) : {};
          return { status: res.status, data: data };
        });
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          successHandler(res.data);
        } else {
          processError(res.data, res.status, errorHandler);
        }
      })
      .catch((err) => {
        processError(err.message, null, errorHandler);
      });
  }

  static Post(moduleName, data, successHandler, errorHandler) {
    const httpHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    const dataBody = JSON.stringify(data);
    const token = auth.getToken();
    if (token) {
      httpHeaders.append("Authorization", `Bearer ${token}`);
    }

    fetch(this.serverName + moduleName, {
      method: "POST",
      headers: httpHeaders,
      body: dataBody,
    })
      .then((res) => {
        return res.text().then((text) => {
          let data = text.length ? JSON.parse(text) : {};
          return { status: res.status, data: data };
        });
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          successHandler(res.data);
        } else {
          processError(res.data, res.status, errorHandler);
        }
      })
      .catch((err) => {
        processError(err.message, null, errorHandler);
      });
  }

  static Put(moduleName, data, successHandler, errorHandler) {
    const httpHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    const dataBody = JSON.stringify(data);
    const token = auth.getToken();

    if (token) {
      httpHeaders.append("Authorization", `Bearer ${token}`);
    }

    fetch(this.serverName + moduleName, {
      method: "PUT",
      headers: httpHeaders,
      body: dataBody,
    })
      .then((res) => {
        return res.text().then((text) => {
          let data = text.length ? JSON.parse(text) : {};
          return { status: res.status, data: data };
        });
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          successHandler(res.data);
        } else {
          processError(res.data, res.status, errorHandler);
        }
      })
      .catch((err) => {
        processError(err.message, null, errorHandler);
      });
  }

  static Delete(moduleName, data, successHandler, errorHandler) {
    const httpHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const token = auth.getToken();
    if (token) {
      httpHeaders.append("Authorization", `Bearer ${token}`);
    }

    fetch(this.serverName + moduleName, {
      method: "DELETE",
      headers: httpHeaders,
      body: data && JSON.stringify(data),
    })
      .then((res) => {
        return res.text().then((text) => {
          let data = text.length ? JSON.parse(text) : {};
          return { status: res.status, data: data };
        });
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          successHandler(res.status, res.data);
        } else {
          processError(res.data, res.status, errorHandler);
        }
      })
      .catch((err) => {
        processError(err.message, null, errorHandler);
      });
  }
}
export default RestAPIHandler;
