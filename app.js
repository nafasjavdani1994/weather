const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "b81a2f2fa82af1305f1029fc071991c9";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temprature in " +
          query +
          " is " +
          temp +
          " degrees Celcuis.</h1>"
      );
      res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src=" + imageUrl + ">");
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000.");
});
