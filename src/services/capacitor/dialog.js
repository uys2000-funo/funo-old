import { Dialog } from '@capacitor/dialog';

export const showAlert = function (
  title = "",
  message = "",
  buttonTitle = "Tamam"
) {
  return Dialog.alert({
    title: title,
    message: message,
    buttonTitle: buttonTitle,
  });
};
export const showConfirm = function (
  title = "",
  message = "",
  okButtonTitle = "Tamam",
  cancelButtonTitle = "Iptal"
) {
  return Dialog.confirm({
    title: title,
    message: message,
    okButtonTitle: okButtonTitle,
    cancelButtonTitle: cancelButtonTitle,
  });
};
export const showPrompt = function (
  title = "",
  message = "",
  okButtonTitle = "Tamam",
  cancelButtonTitle = "Iptal",
  inputPlaceholder = "",
  inputText = ""
) {
  return Dialog.prompt({
    title: title,
    message: message,
    okButtonTitle: okButtonTitle,
    cancelButtonTitle: cancelButtonTitle,
    inputPlaceholder: inputPlaceholder,
    inputText: inputText,
  });
};
