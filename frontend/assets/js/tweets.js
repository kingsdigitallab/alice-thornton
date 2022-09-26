const { createApp } = window.Vue;

function fetchCachedTweets() {
  const url = "/assets/js/tweets.json";
  fetch(url)
    .then((res) => res.json())
    .then(function (out) {
      createApp({
        data() {
          return { tweets: out };
        },
        methods: {
          is_retweet: function (tweet) {
            // TODO
            return Object.prototype.hasOwnProperty.call(
              tweet,
              "retweeted_status"
            );
          },
          get_tweets: function (limit) {
            let self = this;
            let ret = this.tweets.slice(0, limit).map(function (tweet) {
              let ret = tweet;
              ret.retweet = null;
              if (self.is_retweet(tweet)) {
                ret = tweet.retweeted_status;
                ret.retweet = tweet;
              }
              return ret;
            });
            return ret;
          },
          get_html: function (tweet) {
            let ret = tweet.full_text;

            ret = ret
              .replace(/(https?:\/\/\S+)\b/g, '<a href="$1">$1</a>')
              .replace(/@(\w+)/g, '<a href="https://twitter.com/$1">@$1</a>')
              .replace(
                /#(\w+)/g,
                '<a href="https://twitter.com/hashtag/$1">#$1</a>'
              );

            return ret;
          },
          get_time_ago: function (tweet) {
            return window.timeago.format(tweet.created_at, "en_short");
          },
          get_url: function (tweet) {
            let ret = `//twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
            return ret;
          },
          get_reply_url: function (tweet) {
            return this.get_intent_url(tweet, "tweet", "in_reply_to");
          },
          get_retweet_url: function (tweet) {
            return this.get_intent_url(tweet, "retweet", "tweet_id");
          },
          get_like_url: function (tweet) {
            return this.get_intent_url(tweet, "like", "tweet_id");
          },
          get_intent_url(tweet, intent, id_arg_name) {
            return `//twitter.com/intent/${intent}?${id_arg_name}=${
              tweet.id_str
            }&related=${encodeURIComponent(tweet.user.name)}`;
          },
          get_thumb_url(tweet) {
            // returns the url of the first photo attached to this tweet.
            // null if none.
            let ret = null;
            let medias = tweet?.entities?.media || [];
            for (let media of medias) {
              if (media.type == "photo") {
                ret = media.media_url_https + ":small";
                break;
              }
            }
            return ret;
          },
        },
      }).mount("#app");
    })
    .catch((err) => {
      throw err;
    });
}

fetchCachedTweets();
