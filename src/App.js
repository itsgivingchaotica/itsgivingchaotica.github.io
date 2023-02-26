import React, {useState,useCallback,useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import AddSubtaskForm from './components/AddSubtaskForm.jsx';
import Subtask from "./components/Subtask.js";
import UpdateForm from './components/UpdateForm.jsx';
import ToDoList from './components/ToDoList.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Confetti from 'react-confetti';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [index,setIndex] = useState('');
  const [date,setDate] = useState(new Date());
  const [currentColor, setCurrentColor] = useState("#fff");
  const [currentColor2, setCurrentColor2] = useState("fff");
  const [showConfetti, setShowConfetti] = useState(false);

  const useToggle = (initialState=false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(state=>!state),[]);
      return [state,toggle];
  }

  const [isExpanded, setIsExpanded] = useToggle();

  // add a subtask to task
  const addSubtask = (taskIndex) => {
    let num = Object.keys(toDo[taskIndex].subtask).length+1;
    let sublist = {
          id: num,
          subtaskTitle: newSubtask,
          status: false
        };
        const taskListCopy = [...toDo];
        taskListCopy[taskIndex].subtask.push(sublist);
        setToDo(taskListCopy);
        setNewSubtask('');
  } 

  // add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false, dateSelect: date, background: `${currentColor}`, subtask: []};
      setToDo([...toDo, newEntry]);
      //clear temp state
      setNewTask('');
      setCurrentColor("#fff");
      setDate(new Date());
    }
  }

  // delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( toDo => toDo.id !==id )
    setToDo(newTasks);
  }

  const deleteSubtasks = (subId,index) => {
  const tasksCopy = [...toDo];
    tasksCopy[index].subtask.splice(subId,1);
    setToDo(tasksCopy);
  }
  // mark task completed
  const markDone = (id) => {
    let newTask = toDo.map ( task => {
      if(task.id===id){
        //toggle status, cross out if toggled to true(task completed)
        return ({...task, status: !task.status })
      }
      return task;
    })
    setShowConfetti(true);
    setToDo(newTask);
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 8 seconds set the show value to false
      setShowConfetti(false)
    }, 8000)

    return () => {
      clearTimeout(timeId)
    }
  }, [showConfetti]);

  // Cancel update

  const cancelUpdate = () => {
    setUpdateData('');
  }

  // change task for update
 const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
      dateSelect: date, 
      background: `${currentColor2}`,
      subtask: []
    }
    setUpdateData(newEntry);
    setCurrentColor("#fff");
  }

  // update task
  const updateTask = () => {
    //filter the to do list for - leaving in those that od not match the updatedata id
    let filteredList = [...toDo].filter( task => task.id !== updateData.id);
    //add in the updated data to the to do list
    let updatedObject = [...filteredList, updateData];
    setToDo(updatedObject);
    //clear update state
    setUpdateData('');
    setIsExpanded(); 
  }

  return (
    
    <div className="container App">
    <br /><br />
    <h2 className="font">To Do!</h2>
    <br /><br />
    <Accordion>
      <Accordion.Item eventKey="0" className="pretty">
        <Accordion.Header><b>How do I work this thing?</b></Accordion.Header>
        <Accordion.Body>
          It's actually pretty easy. Write down your task, pick a theme color, and choose a Due Date! The customization of the theme is completely up to you. <br></br>
          You can even make subtasks. Simply press the "write" button to make an update to the task theme and title (must be edited together) or add and delete subtasks. Press the "write" key again to exit the sidebar. <br></br>
          You may mark tasks done, or if you made a mistake and want to relist the item, simply click button again to unslash your task.<br></br>
          You may also delete the tasks by utilizing the trashcan button.
          Now get productive! 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="pretty">
        <Accordion.Header>References</Accordion.Header>
        <Accordion.Body>
          References go here
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br /><br />
    <Form>
      <AddTaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} date={date} setDate={setDate} currentColor={currentColor} setCurrentColor={setCurrentColor} isExpanded={isExpanded}/>
    </Form>
    <Container>
    {showConfetti ? <Confetti/> : null}
    <br></br>
    <div className="emptytask">
    {toDo && toDo.length ? '' : 'Let\'s get started!'} 
    </div>
    <Row>
    <Col>
      <ToDoList toDo={toDo} setIsExpanded={setIsExpanded} isExpanded={isExpanded} markDone={markDone} setUpdateData={setUpdateData} deleteTask={deleteTask} setIndex={setIndex} date={date} currentColor={currentColor} setCurrentColor={setCurrentColor}/>
    </Col>
    {!isExpanded ? null : (
      <Col>
      <Container className="background">
        <Row> 
          <Col className="sidebar">
          <UpdateForm toDo={toDo} updateData={updateData} changeTask={changeTask} updateTask={updateTask} cancelUpdate={cancelUpdate} setIsExpanded={setIsExpanded} index={index} setCurrentColor2={setCurrentColor2} currentColor2={currentColor2}/>
          <Form>
          
            <AddSubtaskForm newSubtask={newSubtask} setNewSubtask={setNewSubtask} addSubtask={addSubtask} index={index}/>
            {/* instead of adding task, we had subtask */}
          </Form>
          {toDo[index].subtask.map((e, i) => { 
            return ( 
            <div background-color="red">
              <Subtask
                key={e.id}
                subIndex={i}
                subtask={e}
                setNewSubtask={setNewSubtask}
                addSubtask={addSubtask}
                newSubtask={newSubtask}
                toDoIndex={index}
                deleteSubtasks={deleteSubtasks}
              />
           </div>
            )})
          }
          </Col>  
        </Row>
      </Container>
    </Col>
    )}
    </Row>
    </Container>
    </div>
  );
}

export default App;
