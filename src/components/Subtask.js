import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Subtask = ({
  subtask,
  subIndex,
  toDoIndex,
  deleteSubtasks,
}) => {
  return (
    <>
      <React.Fragment key={subtask.id}> 
        <>
        <div>
          <Row>
            <Col className = "taskBg">
            <div className = {subtask.status ? 'done' : ''}>
              <span className="taskNumber">{subIndex+1}</span>
              <span className="taskText">{subtask.subtaskTitle}</span>
            </div>
            <div className="wrap">
              <span className = "red">
                <FontAwesomeIcon icon={faTrashCan} onClick={()=> deleteSubtasks(subIndex,toDoIndex)}/>
              </span>
            </div>
            </Col>
          </Row>
          </div>
        </>
        </React.Fragment>
    </>
  );
};

export default Subtask;
