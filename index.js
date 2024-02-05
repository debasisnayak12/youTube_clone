const API_KEY = "AIzaSyBOjoZBhWKHB6ClZlSOJ37i7a8iqck1jEM";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar');
const videoContainer = document.querySelector('.video-container');

window.addEventListener("DOMContentLoaded", () => {
  // fetchDefaultVideos("icc", 20);
  fetchDefaultVideos("", 20);
});

async function fetchDefaultVideos(searchQuery, maxResults) {
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
  displayVideos(data.items);
}


function displayVideos(videos){
  videoContainer.innerHTML = '';
  videos.forEach(video => {
          let videoElement = document.createElement("div");
          videoElement.classList.add('video');
          videoElement.innerHTML = `
          <a href="videoDetails.html?videoId=${video.id.videoId}">
          <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" alt="" />
              <div class="content">
                <img src="${video.snippet.thumbnails.default.url}" class="channel-icon" alt="" />
                <div class="info">
                  <h4 class="title">
                    ${video.snippet.title}
                  </h4>
                  <p class="channel-name">${video.snippet.channelTitle}</p>
                  <p class="channel-views">15K Views . 1 week ago</p>
                </div>
              </div>
              </a>
              `;
          videoContainer.appendChild(videoElement);
  });
}