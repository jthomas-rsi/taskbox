// This is the redux store that will wire in the data needed to populate of components in the story
//-- The file contains the store / actions / reducer which would be in different files in larger app

import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Explanation of Redux Toolkit functions ^^^
 -> configureStore:
 sets up a well-configured Redux store with a single function call, including combining reducers, 
 adding the thunk middleware, and setting up the Redux DevTools integration. It also is easier to
 configure than createStore, because it takes named options parameters
 
 -> createSlice:
 lets you write reducers that use the Immer library to enable writing immutable updates using
 "mutating" JS syntax like state.value = 123, with no spreads needed. It also automatically
 generates action creator functions for each reducer, and generates action type strings 
 internally based on your reducer's names.
 
 ->createAsyncThunk:
 The redux-thunk middleware, which allows simple asynchronous use of dispatch.

 
 */
// define the default tasks that will be displayed when the app/component loads
const defaultTasks = [
    { id:'1', title: 'Learn Storybook', state: 'TASK_INBOX' },
    { id:'2', title: 'Complete Storybook tutorials', state: 'TASK_INBOX' },
    { id:'3', title: 'Build personal project to practice learned concepts', state: 'TASK_INBOX' },
    { id:'4', title: 'Become storybook SME on team', state: 'TASK_INBOX' },
];

const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null
};

// define async function to fetch tasks from remote endpoint
export const fetchTasks = createAsyncThunk('todos/fetchTodos', async()=>{
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?userId=1'
    );

    const data = await response.json();
    const result = data.map((task)=>({
        id:`${task}`,
        title: task.title,
        state: task.completed ? 'TASK_ARCHIVED': 'TASK_INBOX',
    }));

    return result;
})

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
    
    // Extend the reducer used in the async function
    extraReducers( builder ) {
        builder
        .addCase(fetchTasks.pending, ( state ) => {
            state.status = 'loading';
            state.error = null;
            state.tasks = [];
        })
        .addCase(fetchTasks.fulfilled, ( state, action )=>{
            state.status = 'succeeded';
            state.error = null;
            state.tasks = action.payload; //adds any fetched tasks to the tasks []
        })
        .addCase( fetchTasks.rejected, ( state )=> {
            state.status = 'failed';
            state.error = "Something went wrong";
            state.tasks = [];
        } );
        
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