import React from 'react';

//import the taskList component
import TaskList from './TaskList';
//import all stories from Task.stories file as one object 
import * as TaskStories from './Task.stories';

//define the exported stroy meta object
export default {
    component: TaskList,
    title: 'TaskList',
    //adding decorator to story export object 
    //--acts as wrapper for rendered story adding padding to final component 
    decorators:[story => <div style={{ padding:'3rem' }} >{story()}</div>  ]
}

//define base Template to bind to all component variations in the story TaskList
const Template = ( args ) => { return <TaskList { ...args } /> }

//define variations of the component
export const Default = Template.bind({})
Default.args = {
    //create tasks array to pass as props to Task component
    tasks:[
        //utilize data imported from Task component stories 
        { ...TaskStories.Default.args.task, id:'1', title:'Task 1' },
        { ...TaskStories.Default.args.task, id:'2', title:'Task 2' },
        { ...TaskStories.Default.args.task, id:'3', title:'Task 3' },
        { ...TaskStories.Default.args.task, id:'4', title:'Task 4' },
        { ...TaskStories.Default.args.task, id:'5', title:'Task 5' },
        { ...TaskStories.Default.args.task, id:'6', title:'Task 6' },
    ],
}

export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.args = {
    //create tasks array to pass as props to Task component
tasks:[
    //utilize the args data from the Default version of this component above  
    ...Default.args.tasks.slice(0,5),
    //input new data for pinned version of task on list 
    { id:'6', title:'Task 6 (pinned)', state: "TASK_PINNED" },
],
}

export const Loading = Template.bind({})
Loading.args = {
    //pass proper props for conditional render of loading screen 
    tasks: [],
    loading: true,
}
export const Empty = Template.bind({})
Empty.args = {
    //pass proper props for conditional render of Empty screen 
    ...Loading.args,
    loading: false,
}

