import { Network } from "@capacitor/network";
import { c } from "../c";

export const runAtNetworkStatusChange = function (
  f = (status) => c("networkStatusChanged", status)
) {
  return Network.addListener("networkStatusChange", f);
};

export const getCurrentNetworkStatus = function(){
    return Network.getStatus();
}
