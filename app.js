let regions = []
let countries = document.querySelector(".countries");
let randomCountry = document.querySelector(".rand_country");
let smLinks = document.querySelector(".sm_links");
let leftLinks = document.querySelector(".left_links");
let rightLinks = document.querySelector(".right_links");
let faXmark = document.querySelector(".fa-xmark");
let searchInput = document.querySelector(".search_box input");
let searchBox = document.querySelector(".search_box");
let randCountryBox = document.querySelector(".rand_country_box");
let header = document.querySelector("header");
let allCountries = document.querySelector(".fa-earth-americas");
let lightMode = document.querySelector(".light_mode");
let darkMode = document.querySelector(".dark_mode");
let themeLink = document.querySelector("#themeLink");
let faBars = document.querySelector(".fa-bars");
let moreBtn = document.querySelector(".more_btn");
let say = 12;

// let data;
// getFetchData();
getInlineData();

async function getFetchData() {
    const response = await fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json");
    data = await response.json();
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    randomCountryShow();
    showCountries();
    filterRegion();
}
function getInlineData() {
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    randomCountryShow();
    filterRegion();
    const urlParams = new URLSearchParams(window.location.search);
    const selectedRegion = urlParams.get("region");
    if (selectedRegion) {
        let filterRegion = data.filter(element => element.region === selectedRegion);
        showCountries(filterRegion);
        let regionlar = document.querySelectorAll(".region_name");
        regionlar.forEach(r => {
            if (r.textContent === selectedRegion) {
                r.style.color = "#8B5CF6";
                r.style.borderBottom = "2px solid #8B5CF6";
            }
            else {
                r.style.color = "black";
                r.style.borderBottom = "2px solid #e7e6e6";
            }
        });
        header.style.display = "none";
        allCountries.style.border = "none";
    }
    else {
        showCountries();
    }
}
let currentTheme = localStorage.getItem("theme")
if(!currentTheme || currentTheme == "light"){
    themeLink.setAttribute("href", "style.css")
    lightMode.style.display = "none"
    darkMode.style.display = "block"
}
else if(currentTheme == "dark"){
    themeLink.setAttribute("href", "dark.css")
    darkMode.style.display = "none"
    lightMode.style.display = "block"
}
function lightModeChange(){
    lightMode.style.display = "none"
    darkMode.style.display = "block"
    themeLink.setAttribute("href", "style.css")
    localStorage.setItem("theme", "light");
}
function darkModeChange(){
    darkMode.style.display = "none"
    lightMode.style.display = "block"
    themeLink.setAttribute("href", "dark.css")
    localStorage.setItem("theme", "dark");
}
searchBox.style.display = "none"
function toggleSearch(){
    if(searchBox.style.display == "none") {
        searchBox.style.display = "initial";
        searchInput.focus();
        randCountryBox.style.display = "none"
    }
    else{
        searchBox.style.display = "none"
        randCountryBox.style.display = "flex"
    }
}
faXmark.style.display = "none"
function searchCountry(){
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
document.addEventListener("click", function(event) {
    if (!smLinks.contains(event.target) && (!faBars.contains(event.target))) {
        smLinks.style.maxHeight = "0px";
    }
});
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
    data = data.filter(olke => olke.name !== "Armenia")
    let randNum = Math.floor(Math.random() * data.length)
    randCountryBox.innerHTML =
        `<div class="rand_country" onclick="showDetail(${data[randNum].callingCodes[0]})">
            <div class="rand_country_img">
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
                    <span>${data[randNum].area} km²</span>
                </p>
                <p class="population">
                    <span>Population:</span>
                    <span>${data[randNum].population}</span>
                </p>
            </div>
        </div>`
}
function showCountries(olkeler = data){
    countries.innerHTML = ""
    olkeler = olkeler.filter(olke => olke.name !== "Armenia")
    olkeler
    .slice(0, say)
    .forEach(country => {
        countries.innerHTML +=
            `<div class="country d-flex flex-column" onclick="showDetail(${country.callingCodes[0]})">
                <div class="country_img">
                    <img src="${country.flag}" alt="country_flag">
                </div>
                <div class="country_info p-3">
                    <h2 class="country_region">${country.region}</h2>
                    <h3 class="country_name my-3">
                        <span>${country.name}</span>,
                        <span>${country.capital}</span>
                    </h3>
                    <p class="code">Calling code: ${country.callingCodes[0]}</p>
                    <div class="people_area_info d-flex align-items-center justify-content-between">
                        <span class="population">Population: ${country.population}</span>
                        <span class="area">Area: ${country.area} km²</span>
                    </div>
               </div>
            </div>`
    });
    moreBtn.innerHTML = ""
    if(say < +olkeler.length) moreBtn.innerHTML = `<button class="show_more_btn" onclick="showMore()">Show More</button>`
}
function showMore(){
    say = say + 12;
    showCountries();
}
function showDetail(calling){
    window.location.href = `https://countries-one-alpha.vercel.app/detail.html?id=${calling}`
}
// function showDetail(calling){
//     window.location.href = `http://127.0.0.1:5500/Websites/Countries/detail.html?id=${calling}`
// }
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
            window.history.pushState({}, "", `?region=${regionSec.textContent}`);
            smLinks.style.maxHeight = "0px";
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