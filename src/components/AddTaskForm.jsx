import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import { TwitterPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

// newTask, setNewTask, addTask are props
const AddTaskForm = ({ 
  newTask, 
  setNewTask, 
  addTask, 
  date, 
  setDate, 
  currentColor, 
  setCurrentColor, 
  isExpanded 
}) => {

    return(
        <>
    <Form.Group className="mb-3 rounded" controlId="formBasicPassword">
      <Row >
      <Col className="inputToDo">
      
      <Form.Control placeholder="Add task, queen :)" value={newTask} onChange={(e) => setNewTask( e.target.value)}/>
      <Button variant="success">
          <span>
                <FontAwesomeIcon icon={faSquarePlus} onClick={addTask}/>
          </span>
        </Button>
        <DatePicker 
      selected={date} 
      dateFormat="MMMM d, yyyy"
      onChange={date => setDate(date)}   
      />
      </Col>
      </Row>
      {isExpanded ? null : (   
        <TwitterPicker
        color={currentColor}
        onChangeComplete={(color) => {
            setCurrentColor(color.hex)
        }}
      />
      )}
    </Form.Group>
    </>
    )
}

export default AddTaskForm;