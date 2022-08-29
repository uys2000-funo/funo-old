let url = `http://api.positionstack.com/v1/forward?access_key=7551787d70c70a50199564522d81f94c&query={lat},{lon}`;
url ="http://api.positionstack.com/v1/forward?access_key=7551787d70c70a50199564522d81f94c&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC"
export const getLocation = function (lat, lon) {
  const api = url.replace("{lat}", lat).replace("{lon}", lon);
  console.log(api);
  return fetch(api, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin':'https://positionstack.com'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((res) => {
    console.log(res);
    return res.text();
  });
};
