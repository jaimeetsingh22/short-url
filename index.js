const express = require("express");
const connectToMongodb = require("./connection");
const path = require("path");

// route
const urlRoute = require("./Router/url");
const Url = require("./Model/url");
const staticRoute = require("./Router/staticRoute");
const userSignUpRoute = require("./Router/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();

const port = 3000;

// connection

connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb Connected")
);

// to use server side rendering will set up view engine  as ejs // hume SSR ke liye ejs view engine ka use karenge express me
app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views")); // yaha humne bata diya ki hum iss folder se sare html file ko render karenge

//middleware
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // parse cookies
app.use(checkForAuthentication)

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute); // ye inline middleware hai isme jab tak restrict wala middle ware cross nhi karta tab tak wo url wala koi kaam nahi kar sakta
app.use("/user", userSignUpRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    // ye mongoose ka method hai jiski madad se hum database me uss particular data ko kisi specific key se find kar ke update kar sakte hai and ye humko return me wo updated object de dega
    { shortId },
    {
      $push: {
        // ye ek trah ka method hai agar array hai to push method lagaye hai jisme ki hum niche diya gaya data push karte jaa rahe hai
        visitHistory: {
          timestamp: new Date().toLocaleString(),
        },
      },
    }
  );
  console.log(entry);
  if (!entry) return res.status(404).send("No Entry Found!");

  return res.redirect(entry.redirectUrl); // res.redirect uss url ko open kar dega jo humne provide kiya hai
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
