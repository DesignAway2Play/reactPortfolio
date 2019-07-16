const NASA_BASE_URL = 'https://api.nasa.gov/';
const nasa_key = process.env.REACT_APP_NASA_API_KEY


export function fetchAPOD() {
    return fetch(`${NASA_BASE_URL}planetary/apod?api_key=${nasa_key}`, { mode: 'cors' }).then(res => res.json());
}

export function fetchNEOToday() {
    return fetch(`${NASA_BASE_URL}neo/rest/v1/feed/today?detailed=false&api_key=${nasa_key}`, { mode: 'cors' }).then(res => res.json());
}
