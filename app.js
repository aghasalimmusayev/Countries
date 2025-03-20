let data;
async function getData() {
    const response = await fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json");
    data = await response.json();
    randomCountryShow()
    showData()
}
getData();

let countries = document.querySelector(".countries");
let randomCountry = document.querySelector(".rand_country");
let smLinks = document.querySelector(".sm_links");
function toggleLinks(){
    if(smLinks.style.display === "none") smLinks.style.display = "flex"
    else smLinks.style.display = "none"
    console.log("musayev");    
}
function showData(){
    data.forEach(country => {
        countries.innerHTML +=
            `<div class="country d-flex flex-column">
                <div class="country_img">
                    <img src="${country.flag}" alt="country_flag">
                </div>
                <div class="country_info p-3 bg-white">
                    <h2 class="country_region">${country.region}</h2>
                    <h3 class="country_name my-3">
                        <span>${country.name}</span>
                        <span>${country.capital}</span>
                    </h3>
                    <div class="d-flex align-items-center justify-content-between">
                        <p class="population d-flex align-items-center ">
                            <span>Population:</span>
                            <span>${country.population}</span>
                        </p>
                        <p class="area d-flex align-items-center">
                            <span>Area:</span>
                            <span>${country.area} km2</span>
                        </p>
                    </div>
                </div>
            </div>`
    });
}
function randomCountryShow(){
    let randNum = (Math.floor(Math.random() * data.length) + 1)
        randomCountry.innerHTML =
            `<div class="rand_country_img">
                <img src="${data[randNum].flag}" alt="">
            </div>
            <div class="rand_country_info">
                <h3>${data[randNum].name}</h3>
                <a href="">${data[randNum].region}</a>
                <p class="capital">
                    <span>Capital:</span>
                    <span>${data[randNum].capital}</span>
                </p>
                <p class="area">
                    <span>Area:</span>
                    <span>${data[randNum].area} km2</span>
                </p>
                <p class="population">
                    <span>Population:</span>
                    <span>${data[randNum].population}</span>
                </p>
            </div>`
}
