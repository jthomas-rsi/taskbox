// This is the redux store that will wire in the data needed to populate of components in the story
//-- The file contains the store / actions / reducer which would be in different files in larger app

import { configureStore, createSlice } from "@reduxjs/toolkit";

// define the default tasks that will be displayed when the app/component loads
const defaultTasks = [
    { id:'1', title: 'Something', state: 'TASK_INBOX' },
    { id:'2', title: 'Something more', state: 'TASK_INBOX' },
    { id:'3', title: 'Something else', state: 'TASK_INBOX' },
    { id:'4', title: 'Something again', state: 'TASK_INBOX' },
];

const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null
};

// define the store for the components to retrieve data from
const TasksSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: ( state, action ) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.findIndex(( task ) => task.id === id );
            if( task >= 0 ){
                state.tasks[task].state = newTaskState;
            }
        },
    },
}); 


//define and export the actions from the above slice to use in components 
export const { updateTaskState } = TasksSlice.actions;

//define the store configuration
const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer,
    },
});

export default store;