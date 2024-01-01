import React, {useEffect, useRef, useState} from 'react';
import {Meta, StoryFn} from '@storybook/react';
import * as fos from '@fiftyone/state';
import { AbstractLooker, ImaVidLooker } from "@fiftyone/looker";
import { BaseState } from "@fiftyone/looker/src/state";
import { v4 as uuid } from "uuid";


function Annotation({}) {
    const lookerOptions = fos.useLookerOptions(true);
    const [reset, setReset] = useState(false);
    // const selectedMediaField = useRecoilValue(fos.selectedMediaField(true));
    // const shouldRenderImaVidLooker = useRecoilValue(fos.shouldRenderImaVidLooker);
    const [id] = useState(() => uuid());

    const createLooker = fos.useCreateLooker(true, false, {
        ...lookerOptions,
    });
    const sample: fos.ModalSample = {
        sample: {
            someClass: {
                _cls: "Sample",
            },
            metadata: {
                        width: 123,
                        height: 123,
                        mime_type: 'image/png',
                    },
            _id: "fhdsjklfhsdjkfhjskldfks",
            id: '123',
            filepath: 'https://dagshub.com/Simon/baby-yoda-segmentation-dataset/src/master/images/007.png',
            tags: [],
            _label_tags: [],
            _media_type: 'image',
        },
    };
    const looker = createLooker.current(sample) as AbstractLooker<BaseState>;

    useEffect(() => {
        looker.attach(id);
    }, [looker, id]);

    // const ref = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     ref.current?.dispatchEvent(
    //             new CustomEvent(`looker-attached`, { bubbles: true })
    //     );
    // }, [ref]);

    return (
            <div
                    // ref={ref}
                    id={id}
                    data-cy="modal-looker-container"
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "grey",
                        position: "relative",
                    }}
            />);
}

const meta: Meta<typeof Annotation> = {
    title: 'DagsHub/Data-Engine/Annotation/Looker',
    component: Annotation
};

export default meta;

const Template: StoryFn<typeof Annotation> = (args) => <Annotation {...args} />;

export const annotationBbox: StoryFn<typeof Annotation> = Template.bind({});
annotationBbox.args = {
    label: 'Metadata',
};
