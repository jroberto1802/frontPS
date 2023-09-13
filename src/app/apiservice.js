import axios from 'axios'

const httpClient = axios.create({
    //baseURL: 'https://b6d1-177-43-232-3.ngrok-free.app'
    baseURL: 'http://35.225.242.205:8080'
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto)
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }

}

export default ApiService;