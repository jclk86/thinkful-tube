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
  return `<img src="${item.snippet.thumbnails.medium.url}">`;
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
  });
}

$(handleSubmit);
