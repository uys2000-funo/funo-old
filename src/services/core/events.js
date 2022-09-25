import { getAllEvents } from "../firebase/event";
import { getEventsFirebase } from "@/services/firebase/event";
import settings from "../settings.json";
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

export const getEvents = function (startPoint = 0) {
  return getEventsFirebase(startPoint, settings.eventFlowRequestLimit).then(
    (res) =>
      res.docs.map((i) => {
        return { eID: i.id, ...i.data() };
      })
  );
};
