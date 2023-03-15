export const setErrorHandler = function () {
  window.onerror = function (msg, url, line, col, error) {
    console.log(msg, url, line, col, error);
  };
};
