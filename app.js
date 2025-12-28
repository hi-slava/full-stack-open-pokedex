const express = require("express");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5001;

app.use(express.static("dist"));

app.get("/version", (req, res) => {
  res.send("4"); // change this string to ensure a new version deployed
});

app.get("/health", (req, res) => {
  // if service started with env variable SIMULATE_HEALTH_FAIL=true, simulate failure
  if (process.env.SIMULATE_HEALTH_FAIL === "true") {
    res.status(500).send("simulated failure");
    process.exit(1);
  }
  res.send("ok");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`);
});
