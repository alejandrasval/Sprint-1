// Variables

let templateCard = document.getElementById("template-card").content;
let fragment = document.createDocumentFragment();
let items = document.getElementById("items");
const img_path = "https://image.tmdb.org/t/p/w1280";
let url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1%27';
let url_least =
  'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=3fa24de710feb7c63980b6f2b06381f9&page=1&vote_count=1000';
let url_most =
  'https://api.themoviedb.org/3/movie/top_rated?api_key=3fa24de710feb7c63980b6f2b06381f9&language=en-US';
let most = document.querySelector(".most");
let least = document.querySelector(".least");
let boton = document.querySelector(".btn-search");
let modal = document.querySelector(".modal")
let modalContent = document.querySelector(".modal-content");
let modalCard = document.getElementById("items");
let btnCloseModal = document.getElementById("close");

// Main page

const getData = async () => {
  let response = await fetch(url);
  let data = await response.json();
  let { results } = data;
  return results;
};

const showData = async () => {
  let dataBase = await getData();
  dataBase.forEach((movie) => {
    let { id, poster_path, vote_average } = movie;
    templateCard.querySelector(".image").setAttribute("src", img_path + poster_path);
    templateCard.querySelector(".image").setAttribute("name", id);
    templateCard.querySelector(".rate").textContent = vote_average;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

document.addEventListener("DOMContentLoaded", showData);

// Search bar

boton.addEventListener("click", async () => {
  let texto = document.querySelector(".input-search").value;
  console.log(texto);
  let data = await getData();
  let busqueda = data.filter(
    (movie) => movie.original_title.toLowerCase() === texto.toLowerCase()
  );
  busqueda.forEach((movie) => {
    let { poster_path } = movie;
    templateCard
      .querySelector("img")
      .setAttribute("src", img_path + poster_path);
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.innerHTML = "";
  items.appendChild(fragment);
});

// Slider

const slider = document.getElementById("slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function moveRight() {
  let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement("beforeend", sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnRight.addEventListener("click", function () {
  moveRight();
});

function moveLeft() {
  let sliderSection = document.querySelectorAll(".slider-section");
  let sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = "0";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement("afterbegin", sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnLeft.addEventListener("click", function () {
  moveLeft();
});

// Most valued - Least valued

const getDataMost = async () => {
  items.innerHTML = "";
  let response = await fetch(url_most);
  let data = await response.json();
  let { results } = data;
  return results;
};

const showDataMost = async () => {
  let dataBaseMost = await getDataMost();
  dataBaseMost.forEach((movie) => {
    let { id, poster_path, vote_average } = movie;
    templateCard
      .querySelector(".image")
      .setAttribute("src", img_path + poster_path);
    templateCard.querySelector(".image").setAttribute("name", id);
    templateCard.querySelector(".rate").textContent = vote_average;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

most.addEventListener("click", showDataMost);

//

const getDataLeast = async () => {
  items.innerHTML = "";
  let response = await fetch(url_least);
  let data = await response.json();
  let { results } = data;
  return results;
};

const showDataLeast = async () => {
  let dataBaseLeast = await getDataLeast();
  dataBaseLeast.forEach((movie) => {
    let { id, poster_path, vote_average } = movie;
    templateCard
      .querySelector(".image")
      .setAttribute("src", img_path + poster_path);
    templateCard.querySelector(".image").setAttribute("name", id);
    templateCard.querySelector(".rate").textContent = vote_average;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

least.addEventListener("click", showDataLeast);

// Modal - Trailers

modalCard.addEventListener("click", async (e) => {
  let idFind = e.target.name;
  urlModal = `https://api.themoviedb.org/3/movie/${idFind}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&append_to_response=videos`;
  let results = await fetch(urlModal);
  let data = await results.json();

  
  modalContent.innerHTML = `
<div class="modal-info"
<img class="modal-image" src="${img_path + data.poster_path}" alt=""/>
<h3 class="modal-title">${data.original_title}</h3>
<p class="modal-overview">${data.overview}</p>
<p class="modal-genre">${data.genres[0].name}/${data.genres[1].name}</p>
<iframe width="250" height="250" src="https://www.youtube.com/embed/${data.videos.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

`;
});

items.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("image")) {
    modal.style.display = "block";
  }
});

btnCloseModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});
