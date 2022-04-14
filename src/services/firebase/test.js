export default function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", ` https://swapi.co/api/people/1`);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status == 200 && this.status < 300) {
        console.log(this.responseText);
      }
    }
  };
}
