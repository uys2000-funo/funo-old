import { Timestamp } from "firebase/firestore";
import { f, l } from "../debug";
import {
  addDocument,
  getCollectionOWU,
  updateDocument,
} from "../firebase/firestore";
import { getFiles, uploadFiles } from "../firebase/storage";
import atmosphere from "@/services/app/atmosphere.json";

export const uploadAtmosphere = function (uID, eID, atmosphere, aID, time, images) {
  l("Run - uploadAtmosphere", arguments);
  return f(uploadFiles, [`Atmosphere/${eID}/${uID}`, `image${time}.`, images]) // upload images
    .then(() => [`Atmosphere/${eID}/${uID}/image${time}.`, images.length]) // get arguments
    .then((args) => f(getFiles, args)) // get urls of uploaded images
    .then(({ urls }) => ({ ...atmosphere, photoURLs: urls })) // add urls to arguments
    .then((data) => (aID ? [data, [{ key: "time", value: 1 }]] : data )) // if aID is exists, add increament to arguments
    .then((args) => (aID ? [...args, [{ key: "photoURLs", value: args[0].photoURLs, union: true }],] : args )) // if aID is exists, add arrayunion to arguments
    .then((args) => (aID ? f(updateDocument, ["Atmosphere", aID, ...args]) : args )) // if aID is exists, update atmosphere data
    .then((data) => (!aID ? data.time++ ? data : data : data )) // if aID is not exists, increase time
    .then((data) => (!aID ? f(addDocument, ["Atmosphere", data]) : data )); // if aID is not exists, add atmosphere data
};

export const getAtmosphere = function (uID, eID) {
  l("Run - getAtmosphere", arguments);
  atmosphere.getAtmosphere[0].equality = uID;
  atmosphere.getAtmosphere[1].equality = eID;
  return f(getCollectionOWU, ["Atmosphere", null, atmosphere.getAtmosphere]);
};
export const getAtmospheres = function (last) {
  l("Run - getAtmosphere", arguments);
  const args = ["Atmosphere", last ? last : Timestamp.now(), atmosphere.getAtmospheres]
  return f(getCollectionOWU, args);
};
