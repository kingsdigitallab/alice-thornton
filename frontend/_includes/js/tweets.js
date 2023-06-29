require("dotenv").config();
const Twitter = require("twitter");
const fs = require("fs");
const outputPath = "_site/assets/js/tweets.json";

function getTweets() {
  /*
  let client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  */
  var client = new Twitter({
    consumer_key: "IpAKyflWTAhLAPINlXnBHsW75",
    consumer_secret: "fkYsWyQcyYYOGLUmwKWdFEFiZWFu76sDuZMZgIDR9mLw6hNIOd",
    bearer_token:
      "AAAAAAAAAAAAAAAAAAAAAO1XoQEAAAAAG9x0aQyGD9xb9C5KHeRXaMme2JE%3D08nXkl1EfunJlw6AlfK9yIyM5rcWAcwItSHZv2BnsceU2LghO3",
  });

  client.get(
    "statuses/user_timeline",
    {
      // screen_name: process.env.TWITTER_SCREEN_NAME,
      screen_name: "",
      // tweet_mode: "extended",
      include_ext_alt_text: true,
    },
    function (error, tweets) {
      fs.writeFile(outputPath, JSON.stringify(tweets), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`tweets written in ${outputPath}`);
        }
      });
    }
  );
}

getTweets();
