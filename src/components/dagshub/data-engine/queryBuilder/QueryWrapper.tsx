import React, { useContext } from 'react';
import Condition from './Condition';
import { QueryBuilderContext, useQueryBuilderContext } from './QueryBuilderContext';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export function QueryWrapper({ showConditionSummary }: { showConditionSummary: boolean }) {
  const { rootCondition, setRootCondition, isSimpleMode } = useQueryBuilderContext();

  return (
    <Box>
      <Condition condition={rootCondition} onChange={setRootCondition} />
      {showConditionSummary && (
        <>
          <br />
          <pre>UI FORMAT {JSON.stringify(rootCondition, null, 2)}</pre>
        </>
      )}
    </Box>
  );
}

export default QueryWrapper;
