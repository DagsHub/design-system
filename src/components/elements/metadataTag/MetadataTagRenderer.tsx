import {Box} from "@mui/system";
import React from "react";
import {MetadataTag} from "./MetadataTag";

export function MetadataTagsRenderer({
                                       itemMetadataTagsToDisplayDict,
                                   }: {
    itemMetadataTagsToDisplayDict: Record<string, { value: any}>;
}) {
    const NUM_TAGS_LINES = 3;
    const MAX_TAGS = 6;
    const SPACE_LEFT_FOR_COUNTER = 40;
    const GAP_BETWEEN_TAGS = 4;
    const length = Object.keys(itemMetadataTagsToDisplayDict).length;

    function calcTagWidth(index: number) {
        if (length <= NUM_TAGS_LINES) {
            return 'undefined'; //no max width
        } else if (index != MAX_TAGS - 1) {
            return `calc(50% - ${GAP_BETWEEN_TAGS / 2}px)`
        } else {//the last tag before counter
            return `calc(50% - ${GAP_BETWEEN_TAGS / 2}px - ${SPACE_LEFT_FOR_COUNTER}px)`
        }
    }

    return (
        //Display up to 6 tags, each should have make width of 50% , if there are more than 6 tags, there should be enough space left for the counter
        <Box display={'flex'} flexWrap={'wrap'} gap={'4px'}>
            {Object.keys(itemMetadataTagsToDisplayDict).map(
                (key, index) =>
                    index < MAX_TAGS && (
                        <MetadataTag
                            index={index}
                            label={key}
                            value={itemMetadataTagsToDisplayDict[key].value}
                            maxWidth={calcTagWidth(index)}
                        />
                    )
            )}
            {length > MAX_TAGS && <MetadataTag index={MAX_TAGS} value={`+${length - MAX_TAGS}`}/>}
        </Box>
    );
}
