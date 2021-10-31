import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { Col, Container, Modal, Row } from "react-bootstrap"
import { v4 } from "uuid"
import useAPI from "../hooks/useAPI"
import Button from "./Button"
import VectorGroup from "./VectorGroup"

export default ({ style }: any) => {

    const { get } = useAPI()
    const [groups, setGroups] = useState<any>([])

    return (<>
        <div style={{ ...styles.container, ...style }}>

            <Button onClick={() => {
                get().then(res => {
                    console.log(res.data)
                    setGroups(Object.entries(res.data).map((e: any) => {

                        let content = e[1].map((e: any) => {
                            return { id: v4(), content: e }
                        })
                        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', margin: 10 }}>
                            <VectorGroup id={v4()} data={{ name: e[0], items: content }} /></div>
                    }))

                })
            }}>Eredmények lekérdezése</Button>
            <div style={{display: 'flex', flexDirection: 'row',flexWrap:'wrap', marginTop: 'auto', marginBottom: 'auto'}}>
                <DragDropContext onDragEnd={() => { }}>
                    {groups}
                </DragDropContext>
            </div>



        </div>
    </>)
}
const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row'
    },
}