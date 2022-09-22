import { getAllEvents } from "../firebase/event";

const f = () => "";

export const getAllEventsFunction = function (
  storageFunction = f, //storageFunction runs with returned events
  loadFunction = f //loadFunction runs alone
) {
  const manipuleEvent = function (event) {
    let i = event.data();
    i["id"] = event.id;
    return i;
  };
  getAllEvents().then((res) => {
    const events = res.docs.map((event) => manipuleEvent(event));
    storageFunction(events);
    loadFunction();
  });
};
export const checkOwner = function (eventId = "", events = []) {
  return events.some((val) => val == eventId);
};
