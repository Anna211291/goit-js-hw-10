import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_nRAbKPGtPy5olGmKf9By3ctpIFYQykaC9MBEH2OF27WPgKQQ6HPlYeHfglM34rrO";
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(
    (response) => {
      return response.data;
        }
    )
    // .then(data => { console.log(data); })
        .catch(err => {console.log(err); }) 
}

// console.log(fetchBreads());


function fetchCatByBreed(breedId) {
//       const params = new URLSearchParams({
//           breed_ids: breedId,
//     api_key: "live_nRAbKPGtPy5olGmKf9By3ctpIFYQykaC9MBEH2OF27WPgKQQ6HPlYeHfglM34rrO",
//   });

    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(
        (response) => {
      return response.data[0];
        }
    )
        .catch(err => {console.log(err); }) 
}

// console.log(fetchCatByBreed(breedId));
export { fetchBreeds, fetchCatByBreed };