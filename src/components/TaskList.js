/* eslint-disable no-lone-blocks */
import React from 'react';

//import redux utilities to use data store actions and reducers 
import { useDispatch, useSelector } from 'react-redux';

//import redux store
import { updateTaskState } from '../library/store';

//import Task component
import Task from './Task';

// define composite component with mocked props it would accept
const TaskList = () => {
// retrieve state of component from redux store
const tasks = useSelector(( state )=>{
    const tasksInOrder = [
        ...state.taskbox.tasks.filter((task)=> task.state === 'TASK_PINNED' ),
        ...state.taskbox.tasks.filter((task)=> task.state !== 'TASK_PINNED' ),
    ];
    const filteredTasks = tasksInOrder.filter(
        ( task )=> task.state === 'TASK_INBOX' || 'TASK_PINNED'
    );
    return filteredTasks;
});

const { status } = useSelector(( state )=> state.taskbox )

const dispatch = useDispatch();

//function to dispatch component state to store, pinned task 
const pinTask = ( value ) => {
    dispatch(updateTaskState({ id:value, newTaskState: 'TASK_PINNED' }))
 };

//function to dispatch component state change to store, archived task 
const archiveTask = ( value ) => {
    dispatch(updateTaskState({ id:value, newTaskState: 'TASK_ARCHIVED' }))
 };


    const LoadingRow = (
        <div  className='loading-item' >
            <span className='glow-checkbox'/>
            <span className='glow-text' >
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    )

    //define conditional rendering for loading screen
    { if( status === 'loading' )
        return (
            <div className='list-items' data-testid='loading' key={'loading'} >
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        )}

    //define conditional render for empty task list 
    { if (tasks.length === 0) 
        return (
            <div className='list-items' key={'empty'} data-testid='empty' >
                <div className='wrapper-message'>
                    <span className='icon-check'/>
                    <p className='title-message'>{'You have no tasks'}</p>
                    <p className='subtitle-message'>{'Time to relax my friend!'}</p>
                </div>
            </div>
        )} 

    
    //define default task list 
    return (
        <div className="list-items">
          {tasks.map(task => (
            <Task 
                key={task.id}
                task={task}
                onPinTask={( task )=>{ pinTask(task) }}
                onArchiveTask={( task )=>{ archiveTask(task) }}
            />
          ))}
        </div>
      );    
};


export default TaskList;