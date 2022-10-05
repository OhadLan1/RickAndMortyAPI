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
}

secondSearch.addEventListener("change", () => {
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
    <h5 class="card-title">name: ${list[index].name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">status: ${list[index].status}</li>
    <li class="list-group-item">species: ${list[index].species}</li>
    <li class="list-group-item">gender: ${list[index].gender}</li>
  </ul>
  `;
  searchResult.innerHTML = html;
}
async function locationDate() {
  let index = secondSearch.value - 1;

  let html = `<div id="search-result" class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">name: ${list[index].name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">type: ${list[index].type}</li>
    <li class="list-group-item">dimension: ${list[index].dimension}</li>
  </ul>
  <h6>residents: </h6>
  <div>
    ${await fillResidents(list[index].residents)}
  </div>
</div>`;
  searchResult.innerHTML = html;
}
function episodeDate() {
  console.log(secondSearch);
}

async function fillResidents(arr) {
  let char;
  let html = "";
  if (arr === [] || arr === null) {
    return "none";
  } else {
    await arr.map(async (ele) => {
      char = await fetch(ele);
      console.log(ele);
      char = await char.json();
      console.log(char);
      html += `<img src="${char.image}" class="card-img-top" alt="..."/>`;
      console.log(html); // good
    });
    console.log(html); // output => ""
    return html;
  }
}
