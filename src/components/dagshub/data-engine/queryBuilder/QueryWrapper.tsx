import React, { useContext } from 'react';
import Condition from './Condition';
import { QueryBuilderContext, useQueryBuilderContext } from './QueryBuilderContext';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export function QueryWrapper({ showConditionSummary }: { showConditionSummary: boolean }) {
  const { rootCondition, setRootCondition, isSimpleMode } = useQueryBuilderContext();

  return (
    <Box>
      {showConditionSummary && (
        <>
          <pre>UI FORMAT {JSON.stringify(rootCondition, null, 2)}</pre>
        </>
      )}
      <Condition condition={rootCondition} onChange={setRootCondition} />
    </Box>
  );
}

export default QueryWrapper;
