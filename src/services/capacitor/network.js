import { Network } from "@capacitor/network";

export const runAtNetworkStatusChange = function (
  f = (status) => console.log("networkStatusChanged", status)
) {
  return Network.addListener("networkStatusChange", f);
};

export const getCurrentNetworkStatus = function () {
  return Network.getStatus();
};
