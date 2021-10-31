import { styles } from "../App"

export default ({ data }: any) => {


    return (<>
        <div style={{ border: '1px solid black', backgroundColor: '#fff', width: 'fit-content', margin: 10 }}>
            <p style={{ ...styles.p, margin: 'auto', color: '#000' }}>{data.map((e: number, i: number) => {
                return i !== data.length ? e.toString() + ';' : e.toString()
            })}</p>
        </div>
    </>)
}