import { getData } from "./service.js";

let regions = []
let smLinks = document.querySelector(".sm_links");
let leftLinks = document.querySelector(".left_links");
let rightLinks = document.querySelector(".right_links");
let allCountries = document.querySelector(".fa-earth-americas");
let countryDetail = document.querySelector(".country_detail");
let lightMode = document.querySelector(".light_mode");
let darkMode = document.querySelector(".dark_mode");
let currentTheme = localStorage.getItem("theme")
if (!currentTheme || currentTheme == "light") {
    document.querySelector("body").classList.remove("dark")
    lightMode.style.display = "none"
    darkMode.style.display = "block"
}
else if (currentTheme == "dark") {
    document.querySelector("body").classList.add("dark")
    darkMode.style.display = "none"
    lightMode.style.display = "block"
}
window.lightModeChange = function () {
    lightMode.style.display = "none"
    darkMode.style.display = "block"
    document.querySelector("body").classList.remove("dark")
    localStorage.setItem("theme", "light");
}
window.darkModeChange = function () {
    darkMode.style.display = "none"
    lightMode.style.display = "block"
    document.querySelector("body").classList.add("dark")
    localStorage.setItem("theme", "dark");
}
const BASE_URL = window.location.origin

let data
async function useData() {
    data = await getData()
    showRegions();
    desctopLinksShow();
    mobileLinksShow();
    showCountryDetail();
}
useData();

allCountries.onclick = function () {
    window.location.href = `${BASE_URL}/index.html`
}
smLinks.style.maxHeight = "0px";
window.toggleLinks = function () {
    if (smLinks.style.maxHeight === "0px" || smLinks.style.maxHeight == "") {
        smLinks.style.maxHeight = smLinks.scrollHeight + "px";
    }
    else smLinks.style.maxHeight = "0px";
}
function showRegions() {
    regions = [...new Set(data.map(element => element.region))];
}
function desctopLinksShow() {
    leftLinks.innerHTML = ''
    regions
        .slice(0, 4)
        .forEach(element => {
            leftLinks.innerHTML +=
                `<li><a class="region_name py-4 px-2" href="${BASE_URL}/index.html?region=${element}">${element}</a></li>`;
        });
    rightLinks.innerHTML = ''
    regions
        .slice(4, 8)
        .forEach(element => {
            rightLinks.innerHTML +=
                `<li><a class="region_name py-4 px-2" href="${BASE_URL}/index.html?region=${element}">${element}</a></li>`;
        });
}
function mobileLinksShow() {
    smLinks.innerHTML = ''
    regions.forEach(element => {
        smLinks.innerHTML +=
            `<li class="py-3 border-bottom"><a class="region_name" href="${BASE_URL}/index.html?region=${element}">${element}</a></li>`;
    });
}
function showCountryDetail() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let country = data.find(item => String(item.callingCodes[0]) === String(id));
    let serhedler = "";
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach(border => {
            let borderCountry = data.find(item => item.alpha3Code == border)
            if (borderCountry.name !== "Armenia") {
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
window.showBorderCountry = function (calling) {
    window.location.href = `${BASE_URL}/detail.html?id=${calling}`
    let country = data.find(item => item.callingCodes[0] == calling);
    let serhedler = "";
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach(border => {
            let borderCountry = data.find(item => item.alpha3Code == border)
            if (borderCountry.name !== "Armenia") {
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
