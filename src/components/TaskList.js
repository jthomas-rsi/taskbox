/* eslint-disable no-lone-blocks */
import React from 'react';

//import Task component
import Task from './Task';

// define composite component with mocked props it would accept
const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
    // define event object
    const events = {
        onPinTask,
        onArchiveTask,
    };

    //define conditional rendering for loading screen
    { if( loading ) return <div className='list-items'>{'loading'}</div>}

    //define conditional render for empty task list 
    { if (tasks.length === 0) return <div className='list-items'>{'empty'}</div>} 
    
    //define default task list 
    return (
        <div className="list-items">
          {tasks.map(task => (
            <Task key={task.id} task={task} {...events} />
          ))}
        </div>
      );    
}


export default TaskList;