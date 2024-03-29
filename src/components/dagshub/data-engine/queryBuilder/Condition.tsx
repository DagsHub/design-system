import React from 'react';
import SimpleCondition from './SimpleCondition';
import { Box } from '@mui/system';
import GroupCondition from './GroupCondition';
import { AndOrMetadataInput } from './QueryBuilderContext';

export function Condition({
  condition,
  onChange,
  level = 0,
  onRemove,
  onAdd,
  isCollapsed = true,
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  level?: number;
  onRemove?: () => void;
  onAdd?: () => void;
  isCollapsed?: boolean;
}) {
  return (
    <Box key={condition.id ?? condition.filter?.id}>
      {!condition?.or && !condition?.and && !!condition?.filter ? (
        <SimpleCondition
          condition={condition}
          onChange={onChange}
          onAdd={onAdd ?? (() => {})}
          onRemove={onRemove ?? (() => {})}
        />
      ) : (
        <GroupCondition
          condition={condition}
          onChange={onChange}
          onRemove={onRemove}
          level={level}
        />
      )}
    </Box>
  );
}

export default Condition;
