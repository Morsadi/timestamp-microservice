// server.js

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint...
app.get("/api/timestamp/:param", function(req, res) {
  let query = req.params.param;
  // {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

  if (+query) {
    // turn num string into number
    let unix = +query;
    let utc = new Date(unix).toUTCString();
    res.json({ unix, utc });
  } else if (query.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
    let unix = new Date(query).valueOf();
    let utc = new Date(query).toUTCString();
    if (!unix || !utc) {
      res.json({"error" : "Invalid Date"});
    } else {
      res.json({ unix, utc });
    }
  }else {
    res.json({"error" : "Invalid Date"});
  }
});

app.get("/api/timestamp", function(req, res) {
  res.json({
      unix: new Date().valueOf(),
      utc: new Date().toUTCString()
    })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
