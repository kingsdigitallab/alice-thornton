require("dotenv").config();
const Twitter = require("twitter");
const fs = require("fs");
const outputPath = "_site/assets/js/tweets.json";

function getTweets() {
  let client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  client.get(
    "statuses/user_timeline",
    { screen_name: process.env.TWITTER_SCREEN_NAME },
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
