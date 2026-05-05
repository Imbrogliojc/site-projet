// CENTRALISATION DES URLs DE L'API : BASE_URL
const BASE_URL = 'http://localhost:8000/api'

const URL = {
    LOGIN: `${BASE_URL}/user/sign`,
    REGISTER: `${BASE_URL}/user/signup`,
    SERVICES: `${BASE_URL}/service`,
    DEVIS: `${BASE_URL}/devis`,
    RESERVATIONS: `${BASE_URL}/reservation`,
    USER : `${BASE_URL}/user`,
    CONTACT: `${BASE_URL}/contact`,
    ADDRESS: `${BASE_URL}/address`,
}

export default URL