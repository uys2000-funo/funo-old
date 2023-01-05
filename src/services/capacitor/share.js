import { Share } from "@capacitor/share";

export const canShare = function () {
  return Share.canShare().then((canShare) => canShare.value);
};

export const share = function (item = { title: "", text: "", url: "" }) {
  return Share.share(item);
};
