// catch elements
let input = document.querySelector("#input");
let btn = document.querySelector(".btn");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".desc");
let Humidity = document.querySelectorAll(".item span")[0];
let wind = document.querySelectorAll(".item span")[1];
let pressure = document.querySelectorAll(".item span")[2];
let icon = document.querySelector(".weather-icon");

// addeventlistner

btn.addEventListener("click", function () {
  let CityValue = input.value.trim();
  if (!CityValue) {
    alert("enter city");
  }

  getweather(CityValue);
});
//  get localstorage
let savedcity = localStorage.getItem("lastcity");
if (savedcity) {
  input.value = savedcity;
  getweather(savedcity);
}

//search with enter keyboard
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let CityValue = input.value.trim();
    if (!CityValue) {
      alert("enter city");
    }

    getweather(CityValue);
  }
});

//  getweather function

async function getweather(CityValue) {
  let apikey = "4e871d48b2b0b02e28247fc14160f4cf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${CityValue}&appid=${apikey}&units=metric`;

  temp.textContent = "...";
  desc.textContent = "Loading...";
  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.cod !== 200) {
      alert("city not found");
      return;
    }
    city.textContent = `📍 ${data.name}`;
    let t = data.main.temp;
    temp.textContent = Math.round(t) + "°c";
    desc.textContent = data.weather[0].description;
    wind.textContent = data.wind.speed + " km/h";
    Humidity.textContent = data.main.humidity + " %";
    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    pressure.textContent = data.main.pressure + " mb";
    localStorage.setItem("lastcity", CityValue);

    if (t < 10) {
      document.body.style.background = "#1e3a8a";
    } else if (t < 20) {
      document.body.style.background = "#60a5fa";
    } else if (t < 30) {
      document.body.style.background = "#fde047";
    } else if (t < 40) {
      document.body.style.background = "#fb923c";
    } else {
      document.body.style.background = "#ef4444";
    }
  } catch {
    alert("error fetching data");
  }
}
