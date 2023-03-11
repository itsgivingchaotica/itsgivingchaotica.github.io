import React, { useContext } from 'react';
import DueDate from './DueDate.jsx'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPenToSquare, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

//my problem is: how do i change the color of the outline for the date object for the task only for one. 
//basically i'll change the state of the object and i'm using useEffect to constantly update the time and date in app. can access this thru currentDate

const ToDoList = ({ 
  toDo, 
  setIsExpanded, 
  markDone, 
  setUpdateData, 
  deleteTask, 
  setIndex, 
  date, 
  isExpanded,
  urgency,
  currentDate
}) => {

  console.log(urgency);

    return(
    <>
        {toDo.sort((a,b) => a.id > b.id ? 1 : -1) &&
    toDo.map( (task, index) => {
      //the to do list items with options to 
      return(

        <React.Fragment key={task.id}>
        <>
        <Form>
        <div>
          <Row>
            <Col className = "backgroundTask" style={{backgroundColor: task.background }}>
            <div className = {task.status ? 'done' : ''}>
              <span className="taskNumber">{index+1}</span>
              <span className="taskText">{task.title}</span>
              {urgency && (urgency < 3) ? (<span className={isExpanded ? "hideTaskDate" : "urgentDate"}>
              {task.dateSelect.toString().substring(0,10)}</span> ) : (<span className={isExpanded ? "hideTaskDate" : "taskDate"}>
              {task.dateSelect.toString().substring(0,10)}</span>)}
              
              {/* <DueDate /> */}
              
            </div>
            <div className="wrap">
              <span className = "green" onClick={ (e) => markDone(task.id)}>
                <FontAwesomeIcon icon={faCircleCheck}/>
              </span>
              {task.status ? null : (
                <span className = "yellow" onClick={ () => {setIsExpanded(); setIndex(index); setUpdateData({ id: task.id, title: task.title, status: task.status ? true : false, dateSelect: date, subtask: task.subtask });}}>
                <FontAwesomeIcon icon={faPenToSquare}/>
              </span>
              )}
              {isExpanded ? null : (<span className = "red">
                <FontAwesomeIcon icon={faTrashCan} onClick={()=> {deleteTask(task.id)}}/>
              </span>)}
              
            </div>
            </Col>
          </Row>
          </div>
          </Form>
        </>
        </React.Fragment>
      )
    })
    }
    </>
    )
}

export default ToDoList;