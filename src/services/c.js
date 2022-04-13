import settings from "./settings";

export default function (function_name, data) {
  if (settings.debug) console.log("Debug :", function_name, data);
  return data;
}
