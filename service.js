const BASE_URL = "https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json"

async function getData() {
    try {
        const res = await fetch(BASE_URL)
        if (!res.ok) {
            throw new Error('sorguda xeta var')
        }
        const data = await res.json()
        return data
    } 
    catch (err) {
        console.log(err);
    }
}

async function getDataById(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`)
        if (!res.ok) {
            throw new Error('sorguda xeta var')
        }
        const data = await res.json()
        return data
    } 
    catch (err) {
        console.log(err);
    }
}

export { 
    getData,
    getDataById
}