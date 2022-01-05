import { ApiServerName } from "./Constants/CommonConstants";

const processError = (error, status, errorHandler) => {
  console.log("status code: ", status, " error: ", error);
  if (errorHandler) {
    errorHandler(status, error);
  }
};

class RestAPIHandler {
  static serverName = ApiServerName;

  static Get(moduleName, successHandler, errorHandler) {
    const httpHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

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
}
export default RestAPIHandler;