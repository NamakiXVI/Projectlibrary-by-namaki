const MemeImage = document.querySelector(".image img");
const Button = document.querySelector(".button");

const generateMeme = () => {
fetch(
    "https://programming-memes-images.p.rapidapi.com/v1/memes",{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0b2bd932d3mshc9d3922e8e75d40p1f9239jsn1c1d21dfd9e1',
            'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
        }
    }
)
.then(response => response.json())
.then(response => {
    const randomMeme = Math.floor(Math.random() * response.length);
    const firstImage = response[randomMeme].image;
    console.log(firstImage);
    MemeImage.setAttribute("src", firstImage);
    console.log(response);
})
.catch(err => {
    console-log(err);
})
};

generateMeme();
Button.addEventListener("click", generateMeme);