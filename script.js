const UNSPLASH_ACCESS_KEY = "Aa7EyPnyv0R8bjP6gZ7Iqemh9W-BY1AgILLaCbPWOCM"; // Replace with your Unsplash Access Key
const searchForm = document.getElementById("search-engine");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");
const showMoreButton = document.getElementById("show-more");
 
let keywords = "";
let currentPage = 1;

async function searchImages() {
  keywords = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?query=${keywords}&page=${currentPage}&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}&per_page=15`;

const response = await fetch(url);
const data = await response.json();
if(currentPage === 1) {
  searchResults.innerHTML = "";
}
const results = data.results;
results.map((result) => {
  const image=document.createElement("img");
  image.src=result.urls.small;
  image.alt=result.alt_description;
  searchResults.appendChild(image);

  const imageLink = document.createElement("a");
  imageLink.href = result.links.html;
  imageLink.target = "_blank";

  imageLink.appendChild(image);
  searchResults.appendChild(imageLink);
  
  })
  showMoreButton.style.display = "block";
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = 1;
  searchImages();
});
showMoreButton.addEventListener("click", () => {
  currentPage++;
  searchImages();
});
