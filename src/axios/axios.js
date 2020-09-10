import axios from 'axios'

export default axios.create({
    baseURL: "https://confme-5e80c.firebaseio.com/"
})