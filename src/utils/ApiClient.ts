import axios from "axios";

const ApiClient = axios.create({
    baseURL : "http://localhost:3000/api",
        headers : {
            "Accept" : "application/json",
            //"Authorization" : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkzMDI5OTMwZWVmNTUzNTE1MzU2ODZkIiwidXNlcm5hbWUiOiJPd2VuIiwiaWF0IjoxNzY0NzY0MDU2LCJleHAiOjE3NjQ3NzEyNTZ9.7XCoH0n9rbpKOGX9Ev8WrfqgA35khVeXe4PTDM4DmPY"
        }
})

ApiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("AuthToken")

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))


export default ApiClient