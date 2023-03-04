let url =
  "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=cdbd6f55-bb30-4404-a6bb-215a26c76d72&geocode={lat},{lon}&lang=en-US";
export const getLocationApi = function (lon, lat) {
  const eUrl = url.replace("{lat}", lat).replace("{lon}", lon);
  return fetch(eUrl, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://funo.com",
    },
    referrerPolicy: "no-referrer",
  }).then((res) => {
    return res.json().then((re) => {
      const text =
        re.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.formatted;
      const locations = re.response.GeoObjectCollection.featureMember;
      return { locations, text };
    });
  });
};
