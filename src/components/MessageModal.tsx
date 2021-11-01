import { Modal, Spinner } from "react-bootstrap"
import Button from "./Button"

export default ({show, handleClose, event, loading} : any) => {
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            {!loading ? <>
                <Modal.Body>Adatok sikeresen feldolgozva!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    handleClose()
                    event()
                }}>Eredmény megtekintése</Button>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
            </Modal.Footer></> : <div style={{display: 'flex', width: '100%'}}><div style={{margin: 'auto'}}><Spinner animation='border'/></div></div>}
        </Modal>
    </>)
}