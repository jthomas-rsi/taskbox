import React from 'react';

import Task from './Task';

export default {
    component: Task,
    title:'Task',
};

const Template = (args) => { return < Task { ...args } /> }

export const Default = Template.bind({});
Default.args = {
    task:{
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX'
    }
};

export const Pinned = Template.bind({});
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED'
    }
};

export const Archived = Template.bind({});
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED'
    }
}

const longTitleString = 
`This task has a title that is extremely long for the reason of showing you the
ellipsis that will appear when the text would usually spill out of the container.
 Without the styling that we added to the container the star icon would have text
overlapping it and that would look bad so we added textOverFlow style.`

export const LongTitle = Template.bind({})
LongTitle.args = {
    task: {
        ...Default.args.task,
        title: longTitleString, 
    }
}
