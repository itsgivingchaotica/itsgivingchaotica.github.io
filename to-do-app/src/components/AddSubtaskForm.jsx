import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// newTask, setNewTask, addTask are props
const AddSubtaskForm = ({ 
  newSubtask, 
  setNewSubtask, 
  addSubtask, 
  index 
}) => {
    return(
        <>
    <Form.Group className="mb-3 shadow rounded" controlId="formBasicPassword">
    
      <Row>
      <Col className="inputToDo">
      <Form.Control placeholder="Add subtask !!" value={newSubtask} onChange={(e) => setNewSubtask( e.target.value)}/>
      <Button variant="success">
          <span>
                <FontAwesomeIcon icon={faSquarePlus} onClick={() => addSubtask(index)}/>
          </span>
        </Button>
      </Col>
      </Row>
    </Form.Group>
    </>
    )
}

export default AddSubtaskForm;