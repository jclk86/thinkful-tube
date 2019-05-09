const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
function getDataFromApi(searchWord, callback) {
  const query = {
    q: `${searchWord}`,
    part: `snippet`,
    key: `AIzaSyD_-2Cx4_vlaoplpf_ZAe-LER11LeaSrlc`
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResults(item) {
  return `<a href="https://www.youtube.com/watch?v=${
    item.id.videoId
  }&$ab_channel=${item.snippet.channelTitle}"${item.snippet}"><img src="${
    item.snippet.thumbnails.medium.url
  }" alt="${item.snippet.title}"></a>`;
}

function renderResultTotal(item) {
  return `<div class="result-count">Total Search Results: ${item.length}</div>`;
}

function displayTotalSearchResults(data) {
  const total = renderResultTotal(data.items);
  $(".js-total-results").html(total);
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $(".js-search-results").html(results);
}

function handleSubmit() {
  $("form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find("#search-video");
    const query = queryTarget.val();
    getDataFromApi(query, displayYouTubeSearchData);
    getDataFromApi(query, displayTotalSearchResults);
    prompt("You submitted");
    queryTarget.val("");
  });
}

$(handleSubmit);
