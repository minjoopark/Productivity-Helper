import React, { useState, useEffect } from "react";  
import Popup from "./Popup.js";
import CustomInput from "./input.js"
import "./App.css";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]); 
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [taskDates, setTaskDates] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [signupPop, setSignupPop]=useState(false)
  const [signupPassword, setSignupPassword] = useState('');
  const [signupId,setSignupId]=useState('');
  const [filter, setFilter] = useState('all');
  const [doneFilter, setDoneFilter] = useState(false); // only show uncompleted tasks
  
  // function getInitialTasks(){ // change
  //   axios.get('http://localhost:5000/tasks/' + loginId)
  //   .then(res => {
  //     console.log(res.data)
  //     return res.data;
  //   })
  // }

  function addToTask(){
    const obj = {
      title: taskTitle,
      notes: taskNotes,
      dates: taskDates,
      completed: false,
      tag: 'none'
    }

    const submit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/tasks/add/' + loginId, obj);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();

    setTodoList([...todoList, obj]);
    setTaskTitle('');
    setTaskNotes('');
    setTaskDates('');
  }

  function clearTodoList() {
    setTodoList([]);
  }

  function sortTodoList() {
    
    // let sorted_meetings = todoList.sort((a,b) => {
    //   return new Date(a.dates) - new Date(b.dates);
    // });
    let sorted_meetings = [...todoList].sort((a, b) => new Date(a.dates) - new Date(b.dates));
    console.log(sorted_meetings);
    setTodoList(sorted_meetings);
    
  }

  function deleteTodo(index) {
    const toRemove = todoList[index];
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);

    axios.delete('http://localhost:5000/tasks/' + loginId, {data: toRemove})
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
  }

  function logout(){
    setIsLoggedIn(false);
  }


  function login() {
    // Check if login credentials are valid
      const userInfo = {
        username: loginId,
        password: password
      }
    
    const submit = async () => {
      try {
        axios.post('http://localhost:5000/users/', userInfo)
        .then(res => {
        if (res.data.status === 'Ok') {
          // console.log(res.data);
          setIsLoggedIn(true);
        } 
        else {
          console.log(res);
          alert(res.data.error);
        }
        })
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }

  function handleSignup(){
    const userInfo = {
      username: signupId,
      password: signupPassword
    }

    console.log(userInfo);
    const submit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/users/add', userInfo);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();

    setSignupId('');
    setSignupPassword('');
  }


  if (!isLoggedIn) {
    return (
      <div className="App" id="login">
        <h1>Log In</h1>
        {/* Add input fields for login */}
        <p><input type="text" placeholder="Username" value={loginId} onChange={(e) => setLoginId(e.target.value)}/></p>
        <p><input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/></p>
        {/* Add button to log in */}
        <button onClick={login}>Log In</button>
        {/* Sign up popup */}
        <button onClick={(e)=> setSignupPop(true)}>Sign Up</button>
        <Popup visible={signupPop} handleSignup={handleSignup} signupId={signupId} 
        signupPassword={signupPassword} setSignupId={setSignupId} setSignupPassword={setSignupPassword}></Popup>
      </div>
    );
  }

  function handleTitleChange(value, i){
    const oldValue = todoList[i];
    const updatedTodoList = [...todoList];
    updatedTodoList[i] = {...updatedTodoList[i], title: value};
    setTodoList(updatedTodoList);

    const submit = async () => {
      try {
        const response = axios.post('http://localhost:5000/tasks/update/' + loginId, {old: oldValue, new: updatedTodoList[i]});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }
  
  function handleNotesChange(value, i){
    const oldValue = todoList[i];
    const updatedTodoList = [...todoList];
    updatedTodoList[i] = {...updatedTodoList[i], notes: value};
    setTodoList(updatedTodoList);

    const submit = async () => {
      try {
        const response = axios.post('http://localhost:5000/tasks/update/' + loginId, {old: oldValue, new: updatedTodoList[i]});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }
  
  function handleDatesChange(value, i){
    const oldValue = todoList[i];
    const updatedTodoList = [...todoList];
    updatedTodoList[i] = {...updatedTodoList[i], dates: value};
    setTodoList(updatedTodoList);

    const submit = async () => {
      try {
        const response = axios.post('http://localhost:5000/tasks/update/' + loginId, {old: oldValue, new: updatedTodoList[i]});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }

  function handleTagChange(value, i){
    const oldValue = todoList[i];
    const updatedTodoList = [...todoList];
    updatedTodoList[i] = {...updatedTodoList[i], tag: value};
    setTodoList(updatedTodoList);

    const submit = async () => {
      try {
        const response = axios.post('http://localhost:5000/tasks/update/' + loginId, {old: oldValue, new: updatedTodoList[i]});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }

  function completed(i) {
    const oldValue = todoList[i];
    const updatedTodoList = [...todoList];
    updatedTodoList[i] = {...updatedTodoList[i], completed: !oldValue.completed};
    setTodoList(updatedTodoList);

    const submit = async () => {
      try {
        const response = axios.post('http://localhost:5000/tasks/update/' + loginId, {old: oldValue, new: updatedTodoList[i]});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    submit();
  }

  return (    
    <div className="App" id="main">
      {/* <Task task = {task} />  */}
      {/* parameter assign */}
      <h2 id="title">Your To Do List</h2>
      
      <input type="text" placeholder="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <input type="text" placeholder="Notes" value={taskNotes} onChange={(e) => setTaskNotes(e.target.value)} />
      <input type="date" placeholder="Date" value={taskDates} onChange={(e) => setTaskDates(e.target.value)} />
      <button onClick={addToTask}>Add Todo</button>
      <button onClick={clearTodoList}>Clear Todo</button>
      <button onClick={sortTodoList}>Sort</button>
      <select name="tag_filter" onChange={(e) =>setFilter(e.target.value)}>
        <option value ="all">all</option>
        <option value ="work">work</option>
        <option value ="play">play</option>
        <option value ="urgent">urgent</option>
      </select>
      <input type="checkbox" id="donefilter" onClick={(e) => {
        setDoneFilter(!doneFilter);
        console.log(doneFilter);}}></input>
      <label htmlFor="donefilter">Show Unfinished Tasks</label>
      <button id="logout" onClick={logout}>logout</button>
      <div id="left_todo">{todoList.length} left to do </div>
      
      <ul>
      {todoList
        .filter((todo) => {
          if (filter === 'all') return true;
          // Assuming there's a 'tag' property in the todo object
          return todo.tag === filter;
        })
        .filter((todo) => {
          if (doneFilter) {
            return !todo.completed;
          }
          else {
            return true;
          }
        })
        .map((todo, i) => {
          return (
            <div className="todolist">
              <ul key={todo.dates + '-' + i}>
                <CustomInput index={i} value={todo.title} first='Title' handleChange={handleTitleChange} type='text' />
                <CustomInput index={i} value={todo.notes} first='Notes' handleChange={handleNotesChange} type='text' />
                <CustomInput index={i} value={todo.dates} first='Dates' handleChange={handleDatesChange} type='date' />
                <button onClick={() => deleteTodo(i)}>Delete</button>
                <input type="checkbox" id="done" checked={todo.completed} onClick={() => completed(i)}></input>
                <label htmlFor="done">Done? </label>
                <select name="tag" value={todo.tag} onChange={(e) => handleTagChange(e.target.value, i)}>
                  {/* <option value ="all">all</option> */}
                  <option value ="none">none</option>
                  <option value ="work">work</option>
                  <option value ="play">play</option>
                  <option value ="urgent">urgent</option>
                </select>
                
              </ul>
            </div>
          );
        })}
    </ul>
  </div>
);
}

export default App;

