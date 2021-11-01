import { useState } from "react"
import axios, { AxiosResponse } from "axios"

/*
    Ez a hook elküldi a csoportak feldolgozásra a backendnek.
*/

export default (url: string)=>{
    
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    const [error, setError] = useState('')

    const send = (data: any)=>{
        setInProgress(true)
        axios.post(url, data).then((res:AxiosResponse)=>{
            setData(res.data)
            setInProgress(false)
        }).catch(err=>{
            setError(err)
        })
    }
    return {inProgress, data, send}
}