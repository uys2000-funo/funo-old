import { f, l } from "../debug";
import { addDocument, getCollectionOWU, updateDocument } from "../firebase/firestore";
import { getFiles, uploadFiles } from "../firebase/storage";
import atmosphere from "@/services/app/atmosphere.json"
export const uploadAtmosphere = function (uID, eID, aID, time, images) {
  l("Run - uploadAtmosphere", arguments)
  return f(uploadFiles, [`Atmosphere/${eID}/${uID}`, `image${time}.`, images]) // upload images
    .then(() => [`Atmosphere/${eID}/${uID}/image${time}.`, images.length]) // get arguments
    .then((args) => f(getFiles, args)) // get urls of uploaded images
    .then(({ urls }) => [{ uID, eID, time: 0, photoURLs: urls }]) // add urls to arguments
    .then((args) => (aID ? [...args, [{ key: "time", value: 1 }]] : args)) // if aID is exists, add increament to arguments
    .then((args) => (aID ? [...args, [{ key: "photoURLs", value: args[0].photoURLs, union:true }]] : args)) // if aID is exists, add arrayunion to arguments
    .then((args) => (aID ? f(updateDocument,["Atmosphere", aID, ...args]) : args)) // if aID is exists, update atmosphere data
    .then((args) => (!aID ? f(addDocument,["Atmosphere", ...args]) : args)); // if aID is not exists, add atmosphere data
};

export const getAtmosphere = function(uID, eID){
  l("Run - getAtmosphere", arguments)
  atmosphere.getAtmosphere[0].equality = uID
  atmosphere.getAtmosphere[1].equality = eID
  return getCollectionOWU("Atmosphere", null, atmosphere.getAtmosphere)
}