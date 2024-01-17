import React from 'react';
import Condition from './Condition';
import { useQueryBuilderContext } from './QueryBuilderContext';
import { Box } from '@mui/system';

export function QueryWrapper({ showConditionSummary }: { showConditionSummary: boolean }) {
  const { rootCondition, setRootCondition } = useQueryBuilderContext();

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
