const val = document.getElementById("search")

let data = {
  key: "de97c98f4e17234aeca641bfa50c0429",
  apiKey: '1be9a6884abd4c3ea143b59ca317c6b2',
  getip: function(){
      $.getJSON('https://ipapi.co/json/', function(data) {
      let ipb = JSON.stringify(data.country_capital, null, 2);
      let ip = ""
      ip = ipb.split('"')[1]
      console.log(ip)
      val.value = ip
    });
  },
  getweather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=" + this.key)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found");
          throw new Error("No weather found");
        }
        return response.json();
      }).then((data) => this.display(data));
  },
  display: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.getElementById("city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.getElementById("desc").innerText = description;
    document.getElementById("temp").innerText = temp;
    document.getElementById("humidity").innerText = "Humidity: " + humidity + "%";
    document.getElementById("wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    val.value = "";
    },
  output: function () {
    this.getweather(val.value);
  },
};


val.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      data.output();
    }
});

data.getip()



