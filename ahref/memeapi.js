document.addEventListener('DOMContentLoaded', function() {
const generatememebtn = document.querySelector(".meme-generator .button-font");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .memeText");
const memeAuthor = document.querySelector(".meme-generator .meme-div-container");
const memeLink = document.querySelector(".meme-generator .link");

const updateDetails = (url, title, author, postLink) => {
    memeImage.setAttribute("src", url);
    memeLink.setAttribute("href", postLink);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme by: ${author}`;
    memeLink.innerHTML = `Link: ${postLink}`;
  };

  const generateMeme = () => {
    fetch("https://meme-api.com/gimme")
      .then((response) => response.json())
      .then((data) => {
        updateDetails(data.url, data.title, data.author, data.postLink);
      });
  };

generatememebtn.addEventListener("click", generateMeme);
generateMeme();
});