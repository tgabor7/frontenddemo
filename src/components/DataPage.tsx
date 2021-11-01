import { Col, Container, Modal, Row } from "react-bootstrap"
import Button from "./Button"
import Input from "./Input"
import Vector from "./Vector"
import VectorGroup from "./VectorGroup"
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Draggable, DraggableChildrenFn, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import useEmbeddingData from "../hooks/useEmbeddingData"
import { useState } from "react"
import { v4 } from "uuid"
import useAPI from "../hooks/useAPI"
import ResultPage from "./ResultPage"
import ErrorModal from "./ErrorModal"
import { useTransition } from "@react-spring/core"
import useDrag from "../hooks/useDrag"
import MessageModal from "./MessageModal"


export default ({ style, page, setPage }: any) => {

    const columnsFromBackend =
    {
        [v4()]: {
            name: 'vectors',
            items: []
        }

    }
    
    const {extractVectors, onDragEnd} = useDrag()

    const { loading, embeddings, generate } = useEmbeddingData()

    const [seed, setSeed] = useState('11')
    const [numberOfEmbeddings, setNumberOfEmbeddings] = useState('8')
    const [lengthOfEmbeddings, setLengthOfEmbeddings] = useState('4')
    const [numberOfVectorgroups, setNumberOfVectorgroups] = useState('3')
    const [threshold, setThreshold] = useState('1.0')
    const [columns, setColumns] = useState(columnsFromBackend)
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const [canRun, setCanRun] = useState(false)

    const { inProgress, send } = useAPI("https://dockerdemotarkogbr.azurewebsites.net/api/")

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (<>
        <div style={{ ...styles.container, ...style }}>
            <MessageModal show={showModal} loading={inProgress} handleClose={handleClose} event={()=>{setPage(1)}} />
            <ErrorModal title="Hiba" message="Nem lehetnek üres csoportok!" show={showError} handleClose={() => { setShowError(false) }} />
            {page === 0 ? <Container>
                <Row>
                    <Col sm={3}>
                        <Input label="Random seed" value={seed} setValue={setSeed} />
                        <Input label="Embeding-ek száma" value={numberOfEmbeddings} setValue={setNumberOfEmbeddings} />
                        <Input label="Embeding-ek hossza" value={lengthOfEmbeddings} setValue={setLengthOfEmbeddings} />
                        <Input label="Vektorhalamzok száma" value={numberOfVectorgroups} setValue={setNumberOfVectorgroups} />
                        <Input label="Threshold érték" value={threshold} setValue={setThreshold} />
                        <Row>
                            <Button onClick={() => {
                                let tmp = generate(parseInt(seed), parseInt(numberOfEmbeddings), parseInt(lengthOfEmbeddings))
                                let tmp_columns: any = {}
                                tmp_columns[v4()] = {
                                    name: 'vectors',
                                    items: tmp.map((e: any) => {
                                        return { id: v4(), content: e }
                                    })
                                }
                                for (let i = 0; i < parseInt(numberOfVectorgroups); i++) {
                                    tmp_columns[v4()] = {
                                        name: 'group_' + (i + 1),
                                        items: []
                                    }
                                }
                                setColumns(tmp_columns)
                                setCanRun(true)
                            }}>Embedding-ek generálása</Button>
                        </Row>
                        <Row>
                            <Button disabled={!canRun} onClick={() => {
                                let extractedData = extractVectors(columns, parseFloat(threshold))
                                if (!extractedData) {
                                    setShowError(true)
                                    return
                                }
                                handleShow()

                                send(extractVectors(columns, parseFloat(threshold)))
                            }}>Újra klaszterezés futtatása</Button>
                        </Row>
                    </Col>
                    <Col sm>
                        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                            <Row>
                                {Object.entries(columns).map(([id, column], index) => {
                                    return <>{index === 0 ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 200, width: '50vw' }}>
                                        <Row><Droppable droppableId={id} key={id} direction="horizontal">
                                            {(provided, snapshot) => {
                                                return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} {...provided.droppableProps} ref={provided.innerRef}>
                                                    {column.items.map((item: any, index) => {
                                                        return (<Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{
                                                                    userSelect: 'none',
                                                                    ...provided.draggableProps.style
                                                                }}>
                                                                    <Vector data={item.content} />
                                                                </div>
                                                            }}
                                                        </Draggable>)
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            }}
                                        </Droppable>
                                        </Row>
                                    </div> :
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:'fit-content', margin: 10 }}>
                                            <Row><VectorGroup id={id} data={column} />
                                            </Row>
                                        </div>} </>
                                })}
                            </Row>
                        </DragDropContext>
                    </Col>
                </Row>
            </Container> :

                <ResultPage />
            }

        </div>

    </>)
}

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#ddd',
        display: 'flex',
    },
    container1: {
        display: 'flex'
    }
}