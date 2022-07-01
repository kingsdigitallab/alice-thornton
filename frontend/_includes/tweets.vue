<ul class="social_media_block" id="app">
  <!-- For the last 3 tweets output this -->
  {% raw %}
  <li v-for="tweet in get_tweets(9)" class="tweet">
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
          <strong>{{ tweet.user.name }}</strong> <small>@{{ tweet.user.screen_name }}</small>
          <small>31m</small>
        </p>
      </div>
      <p>
        {{ tweet.text }}
      </p>
      <!-- END TODO -->
      {% endraw %}
<nav class="level is-mobile">
  <div class="level-left">
    <a class="level-item">
      <span class="icon is-small">
        {% include "../assets/img/icons/font-awesome/reply.svg" %}
      </span>
    </a>
    <a class="level-item">
      <span class="icon is-small">
        {% include "../assets/img/icons/font-awesome/retweet-alt.svg" %}
      </span>
    </a>
    <a class="level-item">
      <span class="icon is-small">
        {% include "../assets/img/icons/font-awesome/heart.svg" %}
      </span>
    </a>
  </div>
</nav>
    </article>
  </li>
</ul>

<script src="https://unpkg.com/vue@3"></script>
<script>
  const { createApp } = Vue

  function fetchCachedTweets() {
    const url = '/assets/js/tweets.json'
    fetch(url)
    .then(res => res.json())
    .then(function(out) {
      createApp({
        data() {
          return {'tweets': out}
        },
        methods: {
          is_retweet: function(tweet) {
            // TODO
            return tweet.hasOwnProperty('retweeted_status')
          },
          get_tweets: function(limit) {
            let self = this
            let ret2 = this.tweets.slice(0, limit).map(function(tweet) {
              let ret = tweet
              ret.retweet = null
              if (self.is_retweet(tweet)) {
                ret = tweet.retweeted_status
                ret.retweet = tweet
              }
              return ret
            })
            console.log(ret2)
            return ret2
          }
        }
      }).mount('#app')
    })
    .catch(err => {throw err});
  }

  fetchCachedTweets()
</script>
