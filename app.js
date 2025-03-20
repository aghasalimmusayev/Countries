let data;
let regions = []
let countries = document.querySelector(".countries");
let randomCountry = document.querySelector(".rand_country");
let smLinks = document.querySelector(".sm_links");
let leftLinks = document.querySelector(".left_links");
let rightLinks = document.querySelector(".right_links");
let faXmark = document.querySelector(".fa-xmark");
let searchInput = document.querySelector(".search_box input");
let searchBox = document.querySelector(".search_box");
let randCountry = document.querySelector(".rand_country");
let header = document.querySelector("header");
let allCountries = document.querySelector(".fa-earth-americas");

getData();
async function getData() {
    const response = await fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json");
    data = await response.json();
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    randomCountryShow();
    showCountries();
    filterRegion();
}

searchBox.style.display = "none"
function toggleSearch(){
    if(searchBox.style.display == "none") {
        searchBox.style.display = "initial";
        searchInput.focus();
        randCountry.style.display = "none"
    }
    else{
        searchBox.style.display = "none"
        randCountry.style.display = "flex"
    }

}
faXmark.style.display = "none"
function searchCountry(){ // bu hisse test olunmadi
    faXmark.style.display = searchInput.value == "" ? "none" : "initial"
    let searchOlke = data.filter(element => 
        element.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    showCountries(searchOlke);
}
function clearInput(){
    searchInput.value = ""
    faXmark.style.display = "none"
    showCountries();
}
smLinks.style.maxHeight = "0px";
function toggleLinks(){
    if (smLinks.style.maxHeight === "0px" || smLinks.style.maxHeight == "") {
        smLinks.style.maxHeight = smLinks.scrollHeight + "px";
    } 
    else smLinks.style.maxHeight = "0px";
}
function showRegions(){
    regions = [...new Set(data.map(element => element.region))];
}
function desctopLinksShow(){
    regions
    .slice(0, 4)
    .forEach(element => {
        leftLinks.innerHTML +=
            `<li><a class="region_name py-4 px-2" href="">${element}</a></li>`
    })
    regions
    .slice(4, 8)
    .forEach(element => {
        rightLinks.innerHTML +=
            `<li><a class="region_name py-4 px-2" href="">${element}</a></li>`
    })
}
function mobileLinksShow(){
    regions.forEach(element => {
        smLinks.innerHTML +=
        `<li class="py-3 border-bottom"><a class="region_name" href="">${element}</a></li>`
    })
}
function randomCountryShow(){
    let randNum = Math.floor(Math.random() * data.length)
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
function showCountries(olkeler = data){
    countries.innerHTML = ""
    olkeler.forEach(country => {
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
function filterRegion(){
    let regionlar = document.querySelectorAll(".region_name");
    regionlar.forEach(regionSec => {
        regionSec.addEventListener("click", function(e){
            e.preventDefault();
            header.style.display = "none"
            regionlar.forEach(r => {
                r.style.color = "black"
                r.style.borderBottom = "2px solid #e7e6e6"
            })
            this.style.color = "#8B5CF6"
            this.style.borderBottom = "2px solid #8B5CF6"
            allCountries.style.border = "none"
            let filterRegion = data.filter(element => element.region == regionSec.textContent)
            showCountries(filterRegion);
        })
    })
}
allCountries.onclick = function(){
    header.style.display = "block"
    let regionlar = document.querySelectorAll(".region_name");
    regionlar.forEach(r => {
        r.style.color = "black"
        r.style.borderBottom = "2px solid #e7e6e6"
    })
    allCountries.style.borderBottom = "2px solid #8B5CF6"
    showCountries();
}