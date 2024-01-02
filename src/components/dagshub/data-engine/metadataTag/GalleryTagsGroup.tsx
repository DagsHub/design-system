import { Box } from '@mui/system';
import React from 'react';
import { MetadataTag } from './MetadataTag';

export function GalleryTagsGroup({
  itemMetadataTagsToDisplayDict
}: {
  itemMetadataTagsToDisplayDict: Record<string, { value: any }>;
}) {
  const NUM_TAGS_LINES = 3;
  const MAX_TAGS = 6;
  const GAP_BETWEEN_TAGS = 4;
  const length = Object.keys(itemMetadataTagsToDisplayDict).length;
  const FONT_SIZE = 12;
  const TAG_PADDING = 8;
  const SPACE_LEFT_FOR_COUNTER = `${length - MAX_TAGS}`.length * FONT_SIZE + TAG_PADDING * 2; // Check the num of characters in the string that represent the counter, each character is 12px wide, plus padding in both sides

  function calcTagWidth(index: number) {
    if (length <= NUM_TAGS_LINES) {
      return 'undefined'; //no max width
    } else if (length <= MAX_TAGS || index < MAX_TAGS - 1) {
      return `calc(50% - ${GAP_BETWEEN_TAGS / 2}px)`;
    } else {
      //the last tag before counter
      return `calc(50% - ${GAP_BETWEEN_TAGS * 2}px - ${SPACE_LEFT_FOR_COUNTER}px)`;
    }
  }

  const generateColors = (hue: number) => {
    const saturation = 100;
    const lightness = 95;
    const hoverLightness = 90;
    const textColorLightness = 35;

    const bg = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const hoverBg = `hsl(${hue}, ${saturation}%, ${hoverLightness}%)`;
    const text = `hsl(${hue}, ${saturation - 25}%, ${textColorLightness}%)`;
    const hoverText = `hsl(${hue}, ${saturation - 40}%, ${textColorLightness - 3}%)`;

    return {
      bg,
      hoverBg,
      text,
      hoverText
    };
  };

  const getColorByIndex = (index: number) => {
    const { bg, hoverBg, text, hoverText } = generateColors((index + 1) * 297);

    return {
      regular: { backgroundColor: bg, color: text },
      hover: { backgroundColor: hoverBg, color: hoverText }
    };
  };

  const generateCssForIndex = (index: number) => {
    const colors = getColorByIndex(index);
    return {
      backgroundColor: `${colors.regular.backgroundColor}!important`,
      color: `${colors.regular.color}!important`,
      '&:hover': {
        backgroundColor: `${colors.hover.backgroundColor}!important`,
        color: `${colors.hover.color}!important`
      }
    };
  };

  return (
    //Display up to 6 tags, each should have make width of 50% , if there are more than 6 tags, there should be enough space left for the counter
    <Box display={'flex'} flexWrap={'wrap'} gap={'4px'}>
      {Object.keys(itemMetadataTagsToDisplayDict).map(
        (key, index) =>
          index < MAX_TAGS && (
            <MetadataTag
              sx={generateCssForIndex(index)}
              label={key}
              value={itemMetadataTagsToDisplayDict[key].value}
              maxWidth={calcTagWidth(index)}
            />
          )
      )}
      {length > MAX_TAGS && (
        <MetadataTag value={`+${length - MAX_TAGS}`} sx={generateCssForIndex(MAX_TAGS)} />
      )}
    </Box>
  );
}

export const BoxedGalleryTagsGroup = (args: {itemMetadataTagsToDisplayDict: Record<string, { value: any }>}) => (
  <Box
    flex={1}
    bgcolor={'transparent'}
    position={'absolute'}
    zIndex={20}
    maxHeight={'80px'}
    overflow={'hidden'}
    width={'100%'}
    padding={'4px'}
    bottom={0}
  >
    <GalleryTagsGroup {...args} />
  </Box>
);
