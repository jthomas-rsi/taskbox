/* eslint-disable no-lone-blocks */
import React from 'react';
import PropTypes from 'prop-types';

//import Task component
import Task from './Task';

// define composite component with mocked props it would accept
const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
    // define event object
    const events = {
        onPinTask,
        onArchiveTask,
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
    { if( loading )
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

    const tasksInOrder = [
        ...tasks.filter(( task )=>( task.state === 'TASK_PINNED' )),
        ...tasks.filter(( task )=>( task.state !== 'TASK_PINNED' )),
    ]
    
    //define default task list 
    return (
        <div className="list-items">
          {tasksInOrder.map(task => (
            <Task key={task.id} task={task} {...events} />
          ))}
        </div>
      );    
}


//define props data type for TaskList component 
TaskList.propTypes = {
    //check to see if component is in loading state
    loading: PropTypes.bool,
    //define array to hold list of tasks
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    //mock func to update state for pinned task
    onPinTask: PropTypes.func,
    //mock func to update state for achieved task
    onArchiveTask: PropTypes.func
}

//define initial or default props fro component 
TaskList.defaultProps={
    loading: false
}


export default TaskList;