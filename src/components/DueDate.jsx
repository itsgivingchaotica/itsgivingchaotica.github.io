import React, { useContext, createContext } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

export const UrgencyContext = createContext();

const DueDate = ({urgency, isExpanded,task}) => {
   //

    return (
        <UrgencyContext.Provider>
        <section>
            {urgency && (urgency < 3) ? (<span className={isExpanded ? "hideTaskDate" : "urgentDate"}>
            {task.dateSelect.toString().substring(0,10)}</span> ) : (<span className={isExpanded ? "hideTaskDate" : "taskDate"}>
            {task.dateSelect.toString().substring(0,10)}</span>)}
        </section>
        </UrgencyContext.Provider>
)
}

export default DueDate;