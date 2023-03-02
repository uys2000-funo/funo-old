import { Toast } from "@capacitor/toast";

export const showToast = function (text, duration = "long", position = "bottom") {
  return Toast.show({
    text: text,
    duration: duration,
    position: position,
  });
};
