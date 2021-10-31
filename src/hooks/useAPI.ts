import { useState } from "react"
import axios, { AxiosResponse } from "axios"

export default ()=>{
    
    const url = "http://localhost:4000/"

    const [inProgress, setInProgress] = useState<boolean>(false)

    const send : ((data: any) => Promise<AxiosResponse<any, any>>)= (data: any)=>{
        return axios.post(url, data)
    }
    const get = ()=>{
        return axios.get(url)
    }
    return {inProgress, get, send}
}