const BASE_API = "https://rickandmortyapi.com/api";

const searchInput = document.getElementById("search-bar");
const secondSearch = document.getElementById("second-search");
const searchResult = document.getElementById("search-result");
const submitSearch = document.getElementById("submit");

let list = [];
searchInput.value = null;
secondSearch.style.visibility = "hidden";

searchInput.addEventListener("change", async () => {
  let result = await getListByInput();
  const list2 = await b(result);
  console.log(list2);
});

async function getListByInput() {
  const url = `${BASE_API}/${searchInput.value}`;
  const result = await (await fetch(url)).json();
  return result;
}

async function changeSearchTwo(list) {
  secondSearch.style.visibility = "visible";
}

// async function b(res) {
//   list = [...list, ...res.results];
//   console.log(list);
//   if (res.info.next === null) {
//     return [...list, ...res.results];
//   } else if (res.info.next !== null) {
//     fetch(`${res.info.next}`)
//       .then(async (response) => {
//         response = await response.json();
//         list = b(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

async function b(res) {
  list = [...list, ...res.results];
  if (res.info.next === null) {
    return list;
  } else if (res.info.next !== null) {
    fetch(`${res.info.next}`)
      .then(async (result) => {
        result = await result.json();

        b(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return list;
}
