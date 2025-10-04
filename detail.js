import { getData } from "./service.js";

let regions = []
let smLinks = document.querySelector(".sm_links");
let leftLinks = document.querySelector(".left_links");
let rightLinks = document.querySelector(".right_links");
let allCountries = document.querySelector(".fa-earth-americas");
let countryDetail = document.querySelector(".country_detail");
let lightMode = document.querySelector(".light_mode");
let darkMode = document.querySelector(".dark_mode");
let themeLink = document.querySelector("#themeLink");

let data
async function useData() {
    data = await getData()
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    showCountryDetail();
}
useData();

allCountries.onclick = function(){
    window.location.href = `https://countries-aga.vercel.app`
}
// allCountries.onclick = function(){
//     window.location.href = `http://127.0.0.1:5500/Countries/index.html`
// }
smLinks.style.maxHeight = "0px";
window.toggleLinks = function (){
    if (smLinks.style.maxHeight === "0px" || smLinks.style.maxHeight == "") {
        smLinks.style.maxHeight = smLinks.scrollHeight + "px";
    } 
    else smLinks.style.maxHeight = "0px";
}
function showRegions(){
    regions = [...new Set(data.map(element => element.region))];
}
function desctopLinksShow() {
    regions
        .slice(0, 4)
        .forEach(element => {
            leftLinks.innerHTML +=
            `<li><a class="region_name py-4 px-2" href="https://countries-aga.vercel.app?region=${element}">${element}</a></li>`;
            // `<li><a class="region_name py-4 px-2" href="http://127.0.0.1:5500/Countries/index.html?region=${element}">${element}</a></li>`;
        });
    regions
        .slice(4, 8)
        .forEach(element => {
            rightLinks.innerHTML +=
            `<li><a class="region_name py-4 px-2" href="https://countries-aga.vercel.app?region=${element}">${element}</a></li>`;
            // `<li><a class="region_name py-4 px-2" href="http://127.0.0.1:5500/Countries/index.html?region=${element}">${element}</a></li>`;
        });
}
function mobileLinksShow() {
    regions.forEach(element => {
        smLinks.innerHTML +=
        `<li class="py-3 border-bottom"><a class="region_name" href="https://countries-aga.vercel.app?region=${element}">${element}</a></li>`;
        // `<li class="py-3 border-bottom"><a class="region_name" href="http://127.0.0.1:5500/Countries/index.html?region=${element}">${element}</a></li>`;
    });
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
window.lightModeChange = function (){
    lightMode.style.display = "none"
    darkMode.style.display = "block"
    themeLink.setAttribute("href", "style.css")
    localStorage.setItem("theme", "light");
}
window.darkModeChange = function (){
    darkMode.style.display = "none"
    lightMode.style.display = "block"
    themeLink.setAttribute("href", "dark.css")
    localStorage.setItem("theme", "dark");
}
function showCountryDetail() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let country = data.find(item => String(item.callingCodes[0]) === String(id));
    let serhedler = "";
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach(border => {
            let borderCountry = data.find(item => item.alpha3Code == border)
            if(borderCountry.name !== "Armenia"){
            serhedler += `<span class="border_name text-white mx-1" 
                onclick="showBorderCountry('${borderCountry.callingCodes[0]}')">${border}</span>`;
            }
        });
    }
    else serhedler = `<span class="border_name text-white mx-1">No borders</span>`;
    countryDetail.innerHTML = ""
    countryDetail.innerHTML =
        `<div class="details">
            <div class="country_detail_info p-4">
                <h3 class="country_detail_name">
                    <p class="country_name">${country.name}</p>
                    <span class="alpha_code">${country.alpha3Code}</span>
                </h3>
                <p class="capital">Capital: ${country.capital}</p>
                <p class="country_region">Region: ${country.region}</p>
                <p class="alternative_name">Alternative names: 
                    <span class="ms-5">${country.altSpellings ? country.altSpellings[2] : "Yoxdur"}</span>
                </p>
                <p class="borders d-flex my-2">${serhedler}</p>
                <div class="people_area_info">
                    <span class="population">Population: ${country.population}</span>
                    <span class="area">Area: ${country.area} km²</span>
                </div>
            </div>
            <div class="country_detail_img">
                <img src="${country.flag}" alt="country_flag">
            </div>
        </div>`;
}
window.showBorderCountry = function (calling){
    window.location.href = `https://countries-aga.vercel.app/detail.html?id=${calling}`
    // window.location.href = `http://127.0.0.1:5500/Countries/detail.html?id=${calling}`
    let country = data.find(item => item.callingCodes[0] == calling);
    let serhedler = "";
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach(border => {
            let borderCountry = data.find(item => item.alpha3Code == border)
            if(borderCountry.name !== "Armenia"){
                serhedler += `<span class="border_name text-white mx-1" 
                onclick="showBorderCountry('${borderCountry.callingCodes[0]}')">${border}</span>`;
            }
        });
    }
    else serhedler = `<span class="border_name text-white mx-1">No borders</span>`;
    countryDetail.innerHTML = ""
    countryDetail.innerHTML =
        `<div class="details">
            <div class="country_detail_info p-4">
                <h3 class="country_name">${country.name}
                    <span class="alpha_code">${country.alpha3Code}</span>
                </h3>
                <p class="capital">Capital: ${country.capital}</p>
                <p class="country_region">Region: ${country.region}</p>
                <p class="alternative_name">Alternative names: 
                    <span class="ms-5">${country.altSpellings ? country.altSpellings[2] : "None"}</span>
                </p>
                <p class="borders d-flex my-2">${serhedler}</p>
                <div class="people_area_info">
                    <span class="population">Population: ${country.population}</span>
                    <span class="area">Area: ${country.area} km²</span>
                </div>
            </div>
            <div class="country_detail_img">
                <img src="${country.flag}" alt="country_flag">
            </div>
        </div>`;
}

// country.altSpellings bu hisse duzelmelidi