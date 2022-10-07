const BASE_API = "https://rickandmortyapi.com/api";

const searchInput = document.getElementById("search-bar");
const secondSearch = document.getElementById("second-search");
const searchResult = document.getElementById("search-result");
const submitSearch = document.getElementById("submit");

let list = [];
searchInput.value = null;
secondSearch.style.visibility = "hidden";
searchResult.style.visibility = "hidden";

searchInput.addEventListener("change", async () => {
  let result = await getListByInput();
  getAll(result);
});
async function getListByInput() {
  const url = `${BASE_API}/${searchInput.value}`;
  const result = await (await fetch(url)).json();
  return result;
}
async function changeSearchTwo() {
  secondSearch.style.visibility = "visible";
}
async function getAll(result) {
  let a;
  list = [];
  for (let i = 1; i <= result.info.count; i++) {
    a = await fetch(`${BASE_API}/${searchInput.value}/${i}`);
    list.push(await a.json());
  }
  changeSearchTwo();
  addNamesToSearchBar();
}
function addNamesToSearchBar() {
  secondSearch.innerHTML = "";
  list.map((ele) => {
    secondSearch.innerHTML += `<option value="${ele.id}">${ele.name}</option>`;
  });
  secondSearch.value = null;
}
secondSearch.addEventListener("change", () => {
  searchResult.style.visibility = "visible";
  if (searchInput.value === "character") {
    charDate();
  } else if (searchInput.value === "location") {
    locationDate();
  } else if (searchInput.value === "episode") {
    episodeDate();
  }
});
function charDate() {
  let index = secondSearch.value - 1;
  let html = `<img src="${list[index].image}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">name: <strong>${list[index].name}</strong></h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">status: <strong>${list[index].status}</strong></li>
    <li class="list-group-item">species: <strong>${list[index].species}</strong></li>
    <li class="list-group-item">gender: <strong>${list[index].gender}</strong></li>
  </ul>
  `;
  searchResult.innerHTML = html;
}
async function locationDate() {
  let index = secondSearch.value - 1;

  let html = `<div id="search-result" class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">name: <strong>${list[index].name}</strong></h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">type: <strong>${list[index].type}</strong></li>
    <li class="list-group-item">dimension: <strong>${list[index].dimension}</strong></li>
  </ul>
  <h6>residents: </h6>
  <div class="d-flex justify-content-around align-items-center flex-wrap" >
    ${await fillCharacter(list[index].residents)}
  </div>
</div>`;
  searchResult.innerHTML = html;
}
async function episodeDate() {
  let index = secondSearch.value - 1;
  console.log(list[index]);
  let html = `<div id="search-result" class="card" style="width: 18rem">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">name: <strong>${list[index].name}</strong></li>
    <li class="list-group-item">air date: <strong>${
      list[index].air_date
    }</strong></li>
    <li class="list-group-item">episode: <strong>${
      list[index].episode
    }</strong></li>
  </ul>
  characters: <br />
  <div class="d-flex justify-content-around align-items-center flex-wrap" >
    ${await fillCharacter(list[index].characters)}
  </div>
</div>`;

  searchResult.innerHTML = html;
}
async function fillCharacter(arr) {
  let html = "";
  for (let obj of arr) {
    html += await getSingleImage(obj);
  }
  return html;
}
async function getSingleImage(ele) {
  let char;
  char = await fetch(ele);
  char = await char.json();
  return `<img src="${char.image}" class="card-img-top singleImg" alt="..."/>`;
}