import { Modal } from "react-bootstrap"
import Button from "./Button"

export default ({show, handleClose, event} : any) => {
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Adatok sikeresen feldolgozva!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    handleClose()
                    event()
                }}>Eredmény megtekintése</Button>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}