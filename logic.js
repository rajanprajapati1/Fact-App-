const limit = 12;
const maincontent = document.getElementById("box");
let searchbox = document.getElementById("input");

searchbox.addEventListener("input", (e) => {
  const searchTerm = searchbox.value.trim();
  if (searchTerm !== "") {
    searchImages(searchTerm);
  }
});

async function get() {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/facts?limit=${limit}`, {
      headers: {
        'X-Api-Key': 'NiFMWWVjjiYrYwI47uLcawYvwwTb8S0WgQZfo1on',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    displayData(data);
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
const refreshbtn = document.getElementById("refresh");

refreshbtn.addEventListener("click",()=>{
    refreshbtn.classList.add("active");
    get();
})



async function searchImages(searchTerm) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/facts?limit=${limit}&query=${searchTerm}`, {
      headers: {
        'X-Api-Key': 'NiFMWWVjjiYrYwI47uLcawYvwwTb8S0WgQZfo1on',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    cleardatafrommain();
    displayData(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

function cleardatafrommain() {
  maincontent.innerHTML = ""; // Clear previous content
}

function displayData(data) {
  maincontent.innerHTML = ""; // Clear previous content

  data.forEach((item, index) => {
    const factElement = document.createElement("div");
    factElement.classList.add("main");

    const numElement = document.createElement("div");
    numElement.classList.add("num");
    numElement.innerHTML = `# <span id="id">${index}</span>`;
    factElement.appendChild(numElement);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.id = "txt";
    textElement.textContent = item.fact;
    factElement.appendChild(textElement);

    maincontent.appendChild(factElement);
  });
}

get();
