let url =
  "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=cdbd6f55-bb30-4404-a6bb-215a26c76d72&geocode={lat},{lon}&lang=en-US";
export const getLocation = function (lon, lat) {
  const eUrl = url.replace("{lat}", lat).replace("{lon}", lon);
  return fetch(eUrl, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://positionstack.com",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((res) => {
    return res.json().then((re) => {
      console.log(re.response.GeoObjectCollection.featureMember);
      return re.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.Address.formatted;
    });
  });
};
