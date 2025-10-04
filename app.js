import { getData } from "./service.js";

let regions = [];
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
let currentFilteredRegion = null;
let say = 12;

let data
async function useData() {
    data = await getData()
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    randomCountryShow();
    filterRegion();
    let currentTheme = localStorage.getItem("theme")
    const urlParams = new URLSearchParams(window.location.search);
    const selectedRegion = urlParams.get("region");
    if (selectedRegion) {
        currentFilteredRegion = selectedRegion;
        moreBtn.innerHTML = ""
        let filterRegion = data.filter(element => element.region === selectedRegion);
        showCountries(filterRegion);
        let regionlar = document.querySelectorAll(".region_name");
        regionlar.forEach(r => {
            if (r.textContent === selectedRegion) {
                r.style.color = "#8B5CF6";
                r.style.borderBottom = "2px solid #8B5CF6";
            }
            else {
                r.style.color = currentTheme === "dark" ? "white" : "black";
                r.style.borderBottom = "2px solid #e7e6e6";
            }
        });
        header.style.display = "none";
        allCountries.style.border = "none";
    }
    else {
        currentFilteredRegion = null;
        showCountries();
    }
}
useData()

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
window.lightModeChange = function(){
    lightMode.style.display = "none"
    darkMode.style.display = "block"
    themeLink.setAttribute("href", "style.css")
    localStorage.setItem("theme", "light");
}
window.darkModeChange = function(){
    darkMode.style.display = "none"
    lightMode.style.display = "block"
    themeLink.setAttribute("href", "dark.css")
    localStorage.setItem("theme", "dark");
}
searchBox.style.display = "none"
window.toggleSearch = function(){
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
window.searchCountry = function(){
    faXmark.style.display = searchInput.value == "" ? "none" : "initial"
    data = data.filter(olke => olke.name !== "Armenia")
    let searchOlke = data.filter(element => 
        element.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    showCountries(searchOlke);
}
window.clearInput = function (){
    searchInput.value = ""
    faXmark.style.display = "none"
    showCountries();
}
smLinks.style.maxHeight = "0px";
window.toggleLinks = function (){
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
    if (currentFilteredRegion) {
        olkeler = data.filter(element => element.region === currentFilteredRegion);
    }
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
window.showMore = function (){
    say = say + 12;
    showCountries();
}
window.showDetail = function (calling){
    window.location.href = `https://https://countries-aga.vercel.app//detail.html?id=${calling}`
}
// window.showDetail = function (calling){
//     window.location.href = `http://127.0.0.1:5500/Countries/detail.html?id=${calling}`
// }
function filterRegion(){
    let currentTheme = localStorage.getItem("theme")
    let regionlar = document.querySelectorAll(".region_name");
    regionlar.forEach(regionSec => {
        regionSec.addEventListener("click", function(e){
            e.preventDefault();
            currentFilteredRegion = regionSec.textContent;
            say = 12; //  Sayı reset edin
            header.style.display = "none"
            regionlar.forEach(r => {
                r.style.color = !currentTheme || currentTheme == "light" ? "black" : "white"
                r.style.borderBottom = "2px solid transparent"
            })
            this.style.color = "#8B5CF6"
            this.style.borderBottom = "2px solid #8B5CF6"
            allCountries.style.border = "none"
            let filterRegion = data.filter(element => element.region == regionSec.textContent)
            showCountries(filterRegion);
            window.history.pushState({}, "", `?region=${regionSec.textContent}`);
            smLinks.style.maxHeight = "0px";
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });    
        })
    })
}
allCountries.onclick = function(){
    currentFilteredRegion = null; 
    say = 12; 
    window.location.href = `https://https://countries-aga.vercel.app/`
    // window.location.href = `http://127.0.0.1:5500/Countries/index.html`
    header.style.display = "block"
    let regionlar = document.querySelectorAll(".region_name");
    regionlar.forEach(r => {
        !currentTheme || currentTheme == "light" ? r.style.color = "black" : r.style.color = "white"
        r.style.borderBottom = "2px solid transparent"
    })
    allCountries.style.borderBottom = "2px solid #8B5CF6"
    showCountries();
}