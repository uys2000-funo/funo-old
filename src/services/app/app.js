import { runAtBackButton } from "../capacitor/app";
import { showToast } from "../capacitor/toast";

export const setErrorHandler = function () {
  window.onerror = function (msg, url, line, col, error) {
    console.log(msg, url, line, col, error);
  };
};
export const setBackButton = function () {
  runAtBackButton(({ canGoBack }) =>{
    if (!canGoBack) showToast("Küççük bir sorun oldu :)")
    else window.history.back()
  })
}