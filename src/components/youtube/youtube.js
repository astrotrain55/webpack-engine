class YouTube {
  constructor() {
    this.list = [];
    this.src = 'https://www.youtube.com/iframe_api';
    this.iframe = '<i class="youtube__media js-youtube-api"></i>';
    this.params = {
      autoplay: 1,
      showinfo: 0,
      rel: 0,
    };
  }

  init() {
    const videos = document.querySelectorAll('.js-youtube');

    if (!videos.length) return;

    this.addJs();
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this, videos);
  }

  setPlayer(el) {
    el.innerHTML = this.iframe;
    const player = el.querySelector('.js-youtube-api');
    const videoId = el.getAttribute('data-id');

    new window.YT.Player(player, { // eslint-disable-line no-new
      videoId,
      playerVars: this.params,
      events: {
        onReady: this.onReady.bind(this),
        onStateChange: this.onStateChange.bind(this),
      },
    });
  }

  onReady(event) {
    this.list.push(event.target);
  }

  onStateChange(event) {
    if (event.data !== window.YT.PlayerState.PLAYING) return;

    _.each(this.list, (video) => {
      if (event.target !== video) video.stopVideo();
    });
  }

  onYouTubeIframeAPIReady(videos) {
    _.each(videos, (video) => {
      this.setupVideo(video);
    });
  }

  setupVideo(video) {
    const link = video.querySelector('.js-youtube--link');
    link.removeAttribute('href');
    link.removeAttribute('target');
    video.classList.add('youtube--enabled');

    ev.once('click', video, () => {
      this.setPlayer(video);
    });
  }

  addJs() {
    const firstScript = document.querySelector('script');
    const script = document.createElement('script');
    script.src = this.src;
    firstScript.parentNode.insertBefore(script, firstScript);
  }
}

const youtube = new YouTube();

export default youtube;
