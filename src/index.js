import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_nRAbKPGtPy5olGmKf9By3ctpIFYQykaC9MBEH2OF27WPgKQQ6HPlYeHfglM34rrO";

import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const elements = {
    selectCat: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    cats: document.querySelector(".cat-info")
}

// const selectS = new SlimSelect({
//     select: "#cat",
//     settings: {
//         placeholderText: '--Select breed--',
//     },
// })
// elements.selectCat.addEventListener("click", handlerClick)
elements.selectCat.addEventListener("change", handlerChange)

    fetchBreeds()
        .then(data => {
            elements.selectCat.insertAdjacentHTML("afterbegin", createMarkup(data));
            elements.selectCat.classList.remove("hidden")
            elements.loader.classList.add("hidden")
        
    new SlimSelect({
    select: elements.selectCat,
    settings: {
        placeholderText: '--Select breed--',
    },
})
        }
        )
        .catch(err => { console.log(err); }) 
  
function createMarkup(arr) {
    return arr.map(({ name, id }) => `
    <option value="${id}">${name}</option>`).join("")
}

function handlerChange(evt) {
    let breedId = evt.target.value;
    elements.cats.innerHTML = "";
    elements.loader.classList.remove("hidden");
    fetchCatByBreed(breedId)
        .then(cat => {
            elements.error.classList.add("hidden");
            elements.cats.innerHTML = createMarkupCat(cat);
            // console.log(cat)
        })
        .catch(err => {
            console.log(err);
            elements.error.classList.remove("hidden");
        })
        .finally(() => { elements.loader.classList.add("hidden") });
}

function createMarkupCat(arr) {
    console.log(arr);
    const { url, breeds: [{ name, description, temperament }] } = arr;
    return `
    <div class="cat-card">
  <img class="cat-img" "width="400" src="${url}" alt="${name}" />
  <div class="cat-info">
    <h1 class="cat-name">${name}</h1>
  <p class="cat-text">Description: ${description}</p>
  <p class="cat-text">Temperament: ${temperament}</p>
</div>
</div>`
}