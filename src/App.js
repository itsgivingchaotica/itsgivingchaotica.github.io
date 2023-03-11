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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark, faPenToSquare, faTrashCan, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
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
  const [urgency,setUrgency] = useState(0);
  var [currentDate,setCurrentDate] = useState(new Date());

  const useToggle = (initialState=false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(state=>!state),[]);
      return [state,toggle];
  }
  //toggle sidebar
  const [isExpanded, setIsExpanded] = useToggle();

  useEffect(() => {
    var timer = setInterval(()=> {
      setCurrentDate(new Date())
    }, 1000 )

    return () => {
      clearInterval(timer);
    }

});

  // add a subtask to task
  const addSubtask = (taskIndex) => {
    let num = Object.keys(toDo[taskIndex].subtask).length+1;
    let sublist = {
          id: num,
          subtaskTitle: newSubtask,
          status: false
        };
        const taskListCopy = [...toDo];
        taskListCopy[taskIndex].subtask?.push(sublist);
        setToDo(taskListCopy);
        setNewSubtask('');
  } 

  // add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false, dateSelect: date, background: `${currentColor}`, subtask: []};
      findDifference(date);
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
    tasksCopy[index].subtask?.splice(subId,1);
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
  //confetti celebration effect
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

  const findDifference = (dateSelect) => {
    setUrgency(null);
    let dateToday = new Date();
    let difference = dateSelect.getTime() - Date.parse(currentDate.toLocaleDateString()); 
    // - currentDate.getTime();
    let total = Math.ceil(difference / (1000*3600*24));
    setUrgency(total);
    // console.log(Date.parse(currentDate.toLocaleDateString()));
    console.log(total);
  }

  return (
    
    <div className="container App">
    
    <br /><br />
    <h2 className="font">To Do!</h2>
    <br /><br />
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
      <ToDoList toDo={toDo} setIsExpanded={setIsExpanded} isExpanded={isExpanded} markDone={markDone} setUpdateData={setUpdateData} deleteTask={deleteTask} setIndex={setIndex} date={date} currentColor={currentColor} setCurrentColor={setCurrentColor} findDifference={findDifference} urgency={urgency} currentDate={currentDate}/>
    </Col>
    {!isExpanded ? null : (
      <Col>
      <Container className="background">
        <Row> 
          <Col className="sidebar">
          <p className="subtaskBanner">Update and Add Subtasks</p>
          <UpdateForm toDo={toDo} updateData={updateData} changeTask={changeTask} updateTask={updateTask} cancelUpdate={cancelUpdate} index={index} setCurrentColor2={setCurrentColor2} currentColor2={currentColor2}/>
          <Form>
            <AddSubtaskForm newSubtask={newSubtask} setNewSubtask={setNewSubtask} addSubtask={addSubtask} index={index} setIsExpanded={setIsExpanded}/>
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
    <br></br>
    <br></br>
    <Accordion>
      <Accordion.Item eventKey="0" className="pretty">
        <Accordion.Header><b>So... how do I work this thing?</b></Accordion.Header>
        <Accordion.Body>
          It's actually pretty easy. Write down your task, pick a theme color, and choose a Due Date! Add the task by pressing <FontAwesomeIcon icon={faSquarePlus}/>. The customization of the theme is completely up to you. <br></br>
          You can even make subtasks. Simply press the "write" <FontAwesomeIcon icon={faPenToSquare}/> icon to make an update to the task theme and/or title or add/delete subtasks. You may also delete <FontAwesomeIcon icon={faTrashCan}/> main tasks when the sidebar is toggled. Press the "write" icon again to exit the sidebar. If you want to cancel a main task update, simply press <FontAwesomeIcon icon={faXmark}/> in the sidebar <br></br>
          You may mark tasks done <FontAwesomeIcon icon={faCircleCheck}/>, or if you made a mistake and want to relist the item, simply click the checkmark button again to redo your task.<br></br>
          Now, go get productive! 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="pretty">
        <Accordion.Header>References</Accordion.Header>
        <Accordion.Body>
        <div className="noTextDec">
          References: 
Gordon, Zac. React Explained: Your Step-by-Step Guide to React. OS Training, 2020. <br></br>
Confetti effect Component: <br></br>
<a href="https://www.youtube.com/watch?v=8VGIsLF5LCw">https://www.youtube.com/watch?v=8VGIsLF5LCw</a> <br></br>
<a href="https://www.npmjs.com/package/react-confetti">https://www.npmjs.com/package/react-confetti</a> <br></br>
<br></br>
Datepicker Component: <br></br>
<a href="https://www.youtube.com/watch?v=tojwQEdI-QI"> https://www.youtube.com/watch?v=tojwQEdI-QI </a><br></br>
<a href="https://www.npmjs.com/package/react-datepicker">https://www.npmjs.com/package/react-datepicker </a><br></br>
<br></br>
Colorpicker Component: <br></br>
<a href="https://www.youtube.com/watch?v=eaLkOHms9x8">https://www.youtube.com/watch?v=eaLkOHms9x8 </a><br></br>
<a href="https://github.com/casesandberg/react-color/issues/522">https://github.com/casesandberg/react-color/issues/522 </a><br></br>
<br></br>
Basic Todo App setup and function ideas:<br></br>
I followed a similar folder structure to this tutorial. I used some basic backbones of several functional components to build a much different to do list both in design and functionality. There were 3 hooks structures I was inspired by to aid in adding, deleting, and updating tasks as well as marking tasks done. In addition, I liked how he used Font Awesome for some of the buttons and I incorporated other Font Awesome icons as well to suit the needs of my To do list<br></br>
<a href="https://www.youtube.com/watch?v=TmDNBEdHzVs">https://www.youtube.com/watch?v=TmDNBEdHzVs</a><br></br>
I utilized the following to make a  subtask component and how to tie that in together with the form-focused application I was working with. Most importantly how to allow subtasks to be edited and deleted<br></br>
<a href="https://codesandbox.io/s/zm7dl?file=/src/Item.js:318-426">https://codesandbox.io/s/zm7dl?file=/src/Item.js:318-426</a><br></br>
I was inspired by Microsoft’s To-do app, especially the sidebar. This is what influenced the structural component of my design. I did not analyze the code for their site.
<a href="https://to-do.office.com/">https://to-do.office.com/</a><br></br>
I looked to several stack overflow questions to understand how to map the to-do list to screen and filter based task actions<br></br>
<a href="https://stackoverflow.com/questions/67832170/how-can-i-delete-a-todo-task-while-making-a-todo-app-using-filter-method-in-react">https://stackoverflow.com/questions/67832170/how-can-i-delete-a-todo-task-while-making-a-todo-app-using-filter-method-in-react</a><br></br>
<a href="https://stackoverflow.com/questions/73993705/filtering-a-todo-list-based-on-button-clicked-on-react">https://stackoverflow.com/questions/73993705/filtering-a-todo-list-based-on-button-clicked-on-react</a><br></br>
<br></br>
- Array splicing needed for subtasks: <br></br><a href="https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript">https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript</a><br></br>

- Mapping and filtering 2d arrays:<br></br>
<a href="https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array">https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array</a><br></br>
<a href="https://stackoverflow.com/questions/55666572/filtering-2d-arrays-using-javascript">https://stackoverflow.com/questions/55666572/filtering-2d-arrays-using-javascript</a><br></br>
<br></br>
- React-Bootstrap Components:<br></br>
<a href="https://react-bootstrap.github.io/components/accordion/">https://react-bootstrap.github.io/components/accordion/</a><br></br>
<a href="https://react-bootstrap.github.io/forms/overview/">https://react-bootstrap.github.io/forms/overview/</a><br></br>
<a href="https://react-bootstrap.github.io/components/buttons/">https://react-bootstrap.github.io/components/buttons/</a><br></br>
<a href="https://react-bootstrap.github.io/forms/form-control/">https://react-bootstrap.github.io/forms/form-control/</a><br></br>
<br></br>
- Condition ClassNames:<br></br>
<a href="https://www.pluralsight.com/guides/applying-classes-conditionally-react">https://www.pluralsight.com/guides/applying-classes-conditionally-react</a><br></br>
<br></br>
- React Hooks:<br></br>
<a href="https://usehooks.com/useToggle/">https://usehooks.com/useToggle/</a><br></br>
<a href="https://stackoverflow.com/questions/57212032/how-to-avoid-react-hook-usestate-to-share-the-states">https://stackoverflow.com/questions/57212032/how-to-avoid-react-hook-usestate-to-share-the-states</a><br></br>
<a href="https://www.youtube.com/watch?v=nmLhEj2IZH4">https://www.youtube.com/watch?v=nmLhEj2IZH4</a><br></br>
<a href="https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js">https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js</a><br></br>
<br></br>
Font Awesome for icons<br></br>
<a href="https://fontawesome.com">https://fontawesome.com</a>
</div>


        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}

export default App;
