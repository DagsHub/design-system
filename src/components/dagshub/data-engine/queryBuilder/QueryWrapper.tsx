import React, { useContext } from 'react';
import Condition from './Condition';
import { QueryBuilderContext, useQueryBuilderContext } from './QueryBuilderContext';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const QueryWrapper = () => {
  const { rootCondition, setRootCondition, isSimpleMode } = useQueryBuilderContext();

  return (
    <Box>
      <Typography>{isSimpleMode ? 'Simple' : 'Compound'} query builder</Typography>
      <br />
      <Condition condition={rootCondition} onChange={setRootCondition} />
      <pre>UI {JSON.stringify(rootCondition, null, 2)}</pre>
    </Box>
  );
};

export default QueryWrapper;
