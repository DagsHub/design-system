import React, { useContext } from 'react';
import Condition from './Condition';
import { QueryBuilderContext, useQueryBuilderContext } from './QueryBuilderContext';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const QueryWrapper = ({ showConditionSummary }: { showConditionSummary: boolean }) => {
  const { rootCondition, queryInputInBackendFormat, setRootCondition, isSimpleMode } =
    useQueryBuilderContext();

  return (
    <Box>
      <Typography>{isSimpleMode ? 'Simple' : 'Compound'} query builder</Typography>
      <br />
      <Condition condition={rootCondition} onChange={setRootCondition} />
      {showConditionSummary && (
        <>
          <pre>UI FORMAT {JSON.stringify(rootCondition, null, 2)}</pre>
          <pre>BACKEND FORMAT {JSON.stringify(queryInputInBackendFormat, null, 2)}</pre>
        </>
      )}
    </Box>
  );
};

export default QueryWrapper;
