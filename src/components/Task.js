import React from 'react';

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
                    type='text'
                    value={title}
                    readOnly
                    name='title'
                    placeholder='Input title'
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