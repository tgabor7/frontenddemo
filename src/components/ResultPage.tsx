import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import { v4 } from "uuid"
import useAPI from "../hooks/useAPI"
import useFetch from "../hooks/useFetch"
import Button from "./Button"
import VectorGroup from "./VectorGroup"

export default ({ style }: any) => {

    const { data, loading, fetch } = useFetch("https://dockerdemotarkogbr.azurewebsites.net/api/")
    const [groups, setGroups] = useState<any>([])

    return (<>
        <div style={{ ...styles.container, ...style }}>

            <Button onClick={() => {
                fetch()
            }}>Eredmények lekérdezése</Button>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 'auto', marginBottom: 'auto' }}>
                <DragDropContext onDragEnd={() => { }}>
                    {!loading ? data ? Object.entries(data).map((e: any) => {

                        let content = e[1].map((e: any) => {
                            return { id: v4(), content: e }
                        })
                        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', margin: 10 }}>
                            <VectorGroup id={v4()} data={{ name: e[0], items: content }} /></div>
                    }) : '' :
                    <div>
                        <Spinner animation="border" />
                    </div>
                    }
                </DragDropContext>
            </div>



        </div>
    </>)
}
const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ddd',
        display: 'flex',
        flexDirection: 'row'
    },
}