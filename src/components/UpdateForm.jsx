import React from 'react';
import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ColorPicker from './ColorPicker.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateForm = ({ 
  updateData, 
  changeTask, 
  updateTask, 
  cancelUpdate, 
  index, 
  currentColor2, 
  setCurrentColor2,
  setIsExpanded
}) => {

    return(
        
  <Form.Group className="mb-3" controlId="formBasicEmail">
      <br></br>
      <Row> 
      
      
      <Col className="inputToDo">
        <Form.Control placeholder="Update task" 
          value={ updateData && updateData.title}
          onChange={ (e) => changeTask(e) } />
          
        <span> 
      <Button variant="primary" type="submit" onClick={() => updateTask(index)}>
        <span>
            <FontAwesomeIcon icon={faCircleCheck}/>
          </span>
      </Button></span>
      <Button variant="danger" onClick={cancelUpdate}>
          <span>
            <FontAwesomeIcon icon={faXmark}/>
          </span>
        </Button>
      </Col>
        </Row>
        <ColorPicker currentColor2={currentColor2} setCurrentColor2={setCurrentColor2}/>
      <br></br>
      </Form.Group>
    )
}

export default UpdateForm;