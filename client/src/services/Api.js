import axios from "axios"

//ALLOWS FOR HITTING DIFFERENT BACKEND 'END POINTS'

export default () => {
    return axios.create({
        baseURL: `http://localhost:8081`
    })
}