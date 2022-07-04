<ul class="social_media_block" id="app">
  <!-- For the last 3 tweets output this -->
  {% raw %}
  <li v-for="tweet in get_tweets(3)" class="tweet">
    <!-- If retweet -->
    <p class="retweet" v-if="tweet.retweet">
      <a href="//twitter.com/">@{{ tweet.retweet.user.screen_name }}</a> retweeted
    </p>
    <article>
      <div class="twitter_user">
        <figure>
          <p class="image is-32x32">
            <img
              :src="tweet.user.profile_image_url_https"
              :alt="tweet.user.name"
            />
          </p>
        </figure>
        <p>
          <strong>{{ tweet.user.name }}</strong> <small>@{{ tweet.user.screen_name }}</small> - <small><a :href="get_url(tweet)">{{ get_time_ago(tweet) }}</a></small>
        </p>
      </div>
      <p v-html="get_html(tweet)">
      </p>
      <a v-if="get_thumb_url(tweet)" :href="get_url(tweet)"><img :src="get_thumb_url(tweet)"></a>
      <!-- END TODO -->
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" :href="get_reply_url(tweet)">
            <span class="icon is-small">
              {% endraw %}{% include "../assets/img/icons/font-awesome/reply.svg" %}{% raw %}
            </span>
          </a>
          <a class="level-item" :href="get_retweet_url(tweet)">
            <span class="icon is-small">
              {% endraw %}{% include "../assets/img/icons/font-awesome/retweet-alt.svg" %}{% raw %}
            </span>
          </a>
          <a class="level-item" :href="get_like_url(tweet)">
            <span class="icon is-small">
              {% endraw %}{% include "../assets/img/icons/font-awesome/heart.svg" %}{% raw %}
            </span>
          </a>
        </div>
      </nav>
    </article>
  </li>
  {% endraw %}
</ul>

<script src="https://unpkg.com/vue@3"></script>
<script src="/assets/node_modules/timeago.js/dist/timeago.min.js"></script>
<!-- script src="/assets/node_modules/timeago.js/lib/lang/en_short.js" type="module"></!-script -->
<script>
const { createApp } = Vue;

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
            return tweet.hasOwnProperty("retweeted_status");
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
            return timeago.format(tweet.created_at, "en_short");
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
            for (media of medias) {
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
</script>
