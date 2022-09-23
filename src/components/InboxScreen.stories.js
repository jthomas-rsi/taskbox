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