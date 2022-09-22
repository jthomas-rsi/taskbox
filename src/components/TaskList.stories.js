import React from 'react';

//import the taskList component
import TaskList from './TaskList';
//import all stories from Task.stories file as one object 
import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';

// define object that mocks state of store
export const MockedState = {
    //utilize data imported from Task component stories 
    tasks:[
        { ...TaskStories.Default.args.task, id:'1', title: 'Learn Storybook' },
        { ...TaskStories.Default.args.task, id:'2', title: 'Complete Storybook tutorials' },
        { ...TaskStories.Default.args.task, id:'3', title: 'Build personal project to practice learned concepts' },
        { ...TaskStories.Default.args.task, id:'4', title: 'Become storybook SME on team' },
        { ...TaskStories.Default.args.task, id:'5', title:'Impress my manager with all my storybook skills' },
        { ...TaskStories.Default.args.task, id:'6', title:'Change name to "The Storybook Master"' },
    ],
    status: 'idle',
    error: null
};

// define function that mocks redux store for component state tracking
const Mockstore = ({ taskboxState, children }) => (
    <Provider
        store={configureStore({
            reducer: {
                taskbox: createSlice({
                    name: 'taskbox',
                    initialState: taskboxState,
                    reducers: {
                        updateTaskState: ( state, action ) =>{
                            const { id, newTaskState} = action.payload;
                            const task = state.tasks.findIndex((task)=> task.id === id );
                            if( task >= 0 ){
                                state.tasks[task].state = newTaskState;
                            }
                        },
                    } ,
                }).reducer,
            },
        })}
    
    >
        {children}
    </Provider>
);



//define the exported stroy meta object
export default {
    component: TaskList,
    title: 'TaskList',
    //adding decorator to story export object 
    //--acts as wrapper for rendered story adding padding to final component 
    decorators:[( story ) => <div style={{ padding:'3rem' }} >{story()}</div>  ],
    //excludeStories allow you to to export a mocked data
    excludeStories: /.*MockedState$/,
}

//define base Template to bind to all component variations in the story TaskList
//-- args removed from template definition because all data coming from redux store
const Template = () => <TaskList />;

//define variations of the component
export const Default = Template.bind({})
Default.decorators = [ // <=== decorators use array not object like args
    ( story ) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
];


export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.decorators = [
    ( story )=>{
        const pinnedtasks = [
            ...MockedState.tasks.slice(0,5),
            { id: '6' , title: 'Change name to "The Storybook Master" (pinned)', state:'TASK_PINNED' },
        ];
        return (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    tasks: pinnedtasks,
                }}
            >
                {story()}
            </Mockstore>
        )
    }
];

export const Loading = Template.bind({})
Loading.decorators = [
    ( story )=> (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    status: 'loading',
                }}
            >
                {story()}
            </Mockstore>
        ),
];

export const Empty = Template.bind({})
Empty.decorators = [
    ( story )=> (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    tasks: [],
                }}
            >
                {story()}
            </Mockstore>
        ),
];

