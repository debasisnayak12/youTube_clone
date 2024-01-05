const apiKey = "AIzaSyBOjoZBhWKHB6ClZlSOJ37i7a8iqck1jEM";
const baseUrl = "https://www.googleapis.com/youtube/v3";

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar');
const videoContainer = document.querySelector('.video-container');

async function fetchDefaultVideos(searchQuery, maxItems){
  let response = await fetch(`${baseUrl}/search?key=${apiKey}&q=${searchQuery}&maxResults=${maxItems}&part=snippet`);
  let data = await response.json();
  // console.log(data);
  if (data.items) {
    data.items.forEach(item => {
      const videoElement = document.createElement('div');
      videoElement.classList.add('video');

      videoElement.innerHTML = `<img src="${item.snippet.thumbnails.high.url}" class="thumbnail" alt="" />
          <div class="content">
            <img src="${item.channelObject[0].snippet.thumbnails.high.url}" class="channel-icon" alt="" />
            <div class="info">
              <h4 class="title">
                ${item.snippet.title}
              </h4>
              <p class="channel-name">${item.snippet.channelTitle}</p>
              <p class="channel-views">15K Views . 1 week ago</p>
            </div>
          </div>`;

      videoContainer.appendChild(videoElement);
    });
  }

}

window.addEventListener('load', () => {
  fetchDefaultVideos("icc", 20);
});
