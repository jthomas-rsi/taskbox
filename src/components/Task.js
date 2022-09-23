import React from 'react';
// import prop types 
import PropTypes from 'prop-types';

// define function components with mocked props it would accept
const Task = ( { task: { id, title, state }}, onArchiveTask, onPinTask ) => {
    return (
        <div className={`list-item ${state}`} >
            <label 
                htmlFor='checked' 
                aria-label={`archiveTask-${id}`} 
                className='checkbox'
            >
                <input 
                    type='checkbox'
                    disabled
                    name='checked'
                    id={`archiveTask-${id}`}
                    checked={state === 'TASK_ARCHIVED'}
                />
                <span 
                    className='checked-custom'
                    onClick={()=>{ onArchiveTask(id)}}                
                />
            </label>

            <label htmlFor='title' aria-label={title} className='title' >
                <input
                    type="text"
                    value={title}
                    readOnly={true}
                    name="title"
                    placeholder="Input title"
                    style={{ textOverflow: 'ellipsis' }}
                />
            </label>

            { state !== 'TASK_ARCHIVED' && (
                <button
                    className='pin-button'
                    onClick={()=> onPinTask(id)}
                    id={`pinTask-${id}`}
                    aria-label={`pinTask-${id}`}
                    key={`pinTask-${id}`}                
                >
                    <span className={`icon-star`}/>
                </button>
            )}

        </div>
    )
}

export default Task;

//define prop-types 
Task.propTypes = {
    //define the shape of task object
    task: PropTypes.shape({
        // define the data type of the id key value
        id: PropTypes.string.isRequired,
        // define the data type of the title key value
        title: PropTypes.string.isRequired,
        // define the data type of the state key value
        state: PropTypes.string.isRequired
    }),
    // define data type of state updating functions 
    onArchiveTask: PropTypes.func,
    onPinTask: PropTypes.func 
}