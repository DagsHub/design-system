import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import SettingsTable, {SettingsProps} from "../../../components/dagshub/organization/settings-table";
import {Button, ButtonVariant} from "../../../components/elements/button/index"
import {Icon} from "../../../components/icons/index"
import {Input} from "../../../components/forms/input/index"

const meta: Meta<typeof SettingsTable> = {
    title: 'DagsHub/Org/SettingsTable',
    component: SettingsTable
};

export default meta;

const Template: StoryFn<SettingsProps> = args => <SettingsTable {...args} />;
export const Webhooks = Template.bind({});
Webhooks.args = {
    title:"Webhooks",
    elements:[
        <div className="webhook-page">
            <p className="webhook-text">Add webhooks that will be triggered for all repositories under this organization.</p>
            <Button label={"Add webhook"} width={118}/>
        </div>
    ]
};
export const DeleteOrganization = Template.bind({});
DeleteOrganization.args = {
    title:"DeleteOrganization",
    elements:[
        <div className="delete-organization-page">
            <p className="delete-organization-text">The organization will be permanently removed, and this CANNOT be undone!</p>
            <Input width={260} label={"Password"} helperText={"Required"} placeholder={"Input"}/>
            <Button className="delete-organization-button" variant={ButtonVariant.Error} label={"Confirm deletion"} width={166}
                    iconLeft={<Icon icon={"outline-trash"} width={13.33} height={15} fill={"#DC2626"} />}/>
        </div>
    ]
};

const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"


export const General = Template.bind({});
General.args = {
    title:"General",
    elements:[
        <div className={"content"}>
            <div className={"user-image-upload"}>
                <div className={"image"}>
                    <img src={imageLink}></img>
                </div>
                <div className={"buttons"}>
                    <Button variant={ButtonVariant.Secondary} className="upload-image-button" label={"Upload image"} width={149}
                    iconLeft={<Icon icon={"outline-upload"} width={18} height={18} fill={"#111827"}/>}/>
                    <Button variant={ButtonVariant.Error} className="remove-button" label={"Remove"} width={131}/>
                </div>
            </div>
            <div className="general-page">
                <Input width={622} label={"Organization name"} helperText={"Required"} placeholder={"Input"}/>
                <Input width={622} label={"Organization full name"} placeholder={"Input"}/>
                <Input width={622} label={"Description"} placeholder={"Input"}/>
                <Input width={622} label={"Website"} placeholder={"Input"}/>
                <Input width={622} label={"Location"} placeholder={"Input"}/>
                <Button className="delete-organization-button" label={"Update settings"} width={166}/>
            </div>
        </div>
    ]
};
