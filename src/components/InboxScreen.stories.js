import React from "react";

/// import InboxScreen component 
import InboxScreen from "./InboxScreen";

// import redux store
import store from "../library/store";

//import mock service work tools
import { rest } from 'msw'

//import mockedState values set up in TaskList stories
import { MockedState } from './TaskList.stories';

//import Provider from redux
import { Provider } from "react-redux";

//import tools for component interaction testing 
import {
    fireEvent,
    within,
    waitFor,
    waitForElementToBeRemoved,

} from '@storybook/testing-library'

// define the exported story Meta object
export default {
    component: InboxScreen,
    title: 'InboxScreen',
    decorators: [ (story) => <Provider store={store} >{story()}</Provider> ]
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({})
Default.parameters = {
    msw: {
        handlers: [
            rest.get(
                'https://jsonplaceholder.typicode.com/todos?userId=1',
                (req, res, ctx) => {
                    return res(ctx.json(MockedState.tasks))
                }
            )
        ]
    }
}

//add interaction to Default story 
Default.play = async ({ canvasElement }) => {
    //By default, each interaction you write inside your play function will be executed starting from the top-level element of the Canvas.
    const canvas = within(canvasElement);

    //await the component transition out of loading state
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'))
    
    //await the component being updated via store 
    await waitFor(async() => {
        //simulate user pinning 1st task
        await fireEvent.click(canvas.getByLabelText('pinTask-1'))
        //simulate user pinning 3rd task
        await fireEvent.click(canvas.getByLabelText('pinTask-3'))
    })
}

export const Error = Template.bind({})
Error.parameters = {
    msw: {
        handlers: [
            rest.get(
                'https://jsonplaceholder.typicode.com/todos?userId=1',
                (req, res, ctx) => {
                    return res(ctx.status(403))
                }
            )
        ]
    }
}

/**
 * npx chromatic --project-token=d64754aae52e
 */