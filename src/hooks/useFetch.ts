import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

/*
    Ez a hook lekéri a vektorhalmazokat.
*/

export default (url:string)=>{
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetch = ()=>{
        setLoading(true)
        axios.get(url).then((response : AxiosResponse)=>{
            setData(response.data)
            setLoading(false)
        }).catch(err=>{
            setError(err)
        })
    }

    return {data, loading, error, fetch}
}