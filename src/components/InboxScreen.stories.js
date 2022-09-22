import React from "react";

import InboxScreen from "./InboxScreen";

import store from "../library/store";

import { Provider } from "react-redux";

// define the exported story Meta object
export default {
    componet: InboxScreen,
    title: 'InboxScreen',
    decorators: [ (story) => <Provider store={store} >{story()}</Provider> ]
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({})
export const Error = Template.bind({})

/**
 * npx chromatic --project-token=d64754aae52e
 */