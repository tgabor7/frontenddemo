import { Draggable, Droppable } from "react-beautiful-dnd"
import { Col, Row } from "react-bootstrap"
import { styles } from "../App"
import Vector from "./Vector"

export default ({id,data}: any) => {
    
    return (<>
        <Droppable droppableId={id} key={id} direction="vertical">
            {(provided, snapshot) => {
                return <div style={!snapshot.isDraggingOver ? { border: '1px solid black', borderRadius: 25,boxShadow: "1px 3px 1px #9E9E9E",backgroundColor: '#fff'} :
                    { border: '1px solid black', borderRadius: 25, backgroundColor: '#aaf' }}>
                    <h2 style={{ textAlign: 'center', padding: 10}}>{data.name}</h2>
                    <Row {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', minHeight: 200}}>
                        {data.items.map((item : any, index : any) => {
                            return (<Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                    return <Col ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{
                                        userSelect: 'none',
                                        ...provided.draggableProps.style
                                    }}>
                                        <Vector data={item.content} />
                                    </Col>
                                }}
                            </Draggable>)
                        })}
                        {provided.placeholder}
                    </Row></div>
            }}
        </Droppable>
    </>)
}