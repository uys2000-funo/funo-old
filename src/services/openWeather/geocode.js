const url = `http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=10&appid=9017d8de354989a224816b7003709b84`;

export const getLocation = function (lat, lon) {
  const api = url.replace("{lat}", lat).replace("{lon}", lon);
  console.log(api);
  return fetch(api, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((res) => {
    return res.json();
  });
};
