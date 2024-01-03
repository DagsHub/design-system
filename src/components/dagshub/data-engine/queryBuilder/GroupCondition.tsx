import React, { useState } from 'react';
import { Box } from '@mui/system';
import { ConditionDropdown } from './ConditionDropdown';
import { Button as DagshubButton, ButtonStretch, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import { IconButton, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import theme from '../../../../theme';
import Condition from './Condition';
import AddIcon from '@mui/icons-material/Add';
import {
  AndOrMetadataInput,
  Operators,
  SourceType,
  useQueryBuilderContext
} from './QueryBuilderContext';

const GroupCondition = ({
  condition,
  onChange,
  level,
  onRemove
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  level: number;
  onRemove?: () => void;
}) => {
  const { isSimpleMode, generateUniqueId, onApplyQueryButtonClicked, sourceType } =
    useQueryBuilderContext();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isSaveMenuOpen, setIsSaveMenuOpen] = useState<boolean>(false);
  const [saveMenuAnchorEl, setSaveMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  //check if there are simple conditions in the group
  const isAndRelation = !!condition.and;
  const areThereSimpleFilters = (isAndRelation ? condition.and : condition.or)?.some((cond) => {
    return !!cond.filter;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          border:
            level == 0 ? '1px solid rgba(226, 232, 240, 1)' : '2px dashed rgba(203, 213, 225, 1)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(248, 250, 252, 1)'
        }}
      >
        <Box
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {isSimpleMode && !areThereSimpleFilters && (
            <IconButton
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                padding: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
              onClick={() => {
                const newConditions = condition.and || condition.or || [];
                newConditions.splice(0, 0, { filter: { comparator: Operators[0].id } });
                if (isAndRelation) {
                  onChange({ ...condition, and: newConditions });
                } else {
                  // or relation
                  onChange({ ...condition, or: newConditions });
                }
              }}
            >
              <AddIcon fontSize={'medium'} sx={{ fill: 'rgba(100, 116, 139, 1)' }} />
            </IconButton>
          )}
          {!isSimpleMode && (
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
              {condition.not && (
                <Box
                  style={{
                    display: 'flex',
                    width: 'fit-content',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '8px',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(241, 245, 249, 1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(226, 232, 240, 1)',
                    boxSizing: 'border-box',
                    height: '28px'
                  }}
                >
                  <Typography variant={'medium'} style={{ color: 'rgba(84, 103, 222, 1)' }}>
                    NOT
                  </Typography>
                  <span style={{ display: 'flex', cursor: 'pointer' }}>
                    <Icon
                      onClick={() => onChange({ ...condition, not: !condition.not })}
                      icon={'solid-x-circle'}
                      width={16}
                      height={16}
                      fill={'rgba(148, 163, 184, 1)'}
                    />
                  </span>
                </Box>
              )}
              <ConditionDropdown
                inputColor={'rgba(84, 103, 222, 1)'}
                initialChecked={
                  isAndRelation ? { id: 'AND', label: 'AND' } : { id: 'OR', label: 'OR' }
                }
                label={''}
                onChange={(e, value) => {
                  if (isAndRelation && value?.id === 'OR') {
                    onChange({ ...condition, or: condition.and, and: undefined });
                  } else if (!isAndRelation && value?.id === 'AND') {
                    onChange({ ...condition, and: condition.or, or: undefined });
                  }
                  //if the same relation, do nothing
                }}
                options={[
                  { id: 'AND', label: 'AND' },
                  { id: 'OR', label: 'OR' }
                ]}
              />

              {!isSimpleMode && onRemove !== undefined && (
                <DagshubButton
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    padding: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                  }}
                  label={''}
                  variant={ButtonVariant.Ghost}
                  onClick={onRemove}
                  iconRight={
                    <Icon
                      icon={'solid-trash'}
                      width={14}
                      height={16}
                      fill={'rgba(100, 116, 139, 1)'}
                    />
                  }
                />
              )}

              <IconButton
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  padding: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex'
                }}
                onClick={(event) => {
                  setAddMenuAnchorEl(event.currentTarget);
                  setIsAddMenuOpen(true);
                }}
              >
                <AddIcon fontSize={'medium'} sx={{ fill: 'rgba(100, 116, 139, 1)' }} />
              </IconButton>
              <Menu
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '12px'
                  },
                  padding: '8px'
                }}
                id="basic-menu"
                anchorEl={addMenuAnchorEl}
                open={isAddMenuOpen}
                onClose={() => setIsAddMenuOpen(false)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem
                  onClick={() => {
                    const newConditions = condition.and || condition.or || [];
                    newConditions.push({ and: [] }); // is it ok or should it be [{}]
                    if (isAndRelation) {
                      onChange({ ...condition, and: newConditions });
                    } else {
                      // or relation
                      onChange({ ...condition, or: newConditions });
                    }
                    setIsAddMenuOpen(false);
                  }}
                >
                  <Typography variant={'medium'}>Add condition group</Typography>
                </MenuItem>
                {!condition.not && (
                  <MenuItem
                    onClick={() => {
                      onChange({ ...condition, not: !condition.not });
                      setIsAddMenuOpen(false);
                    }}
                  >
                    <Typography variant={'medium'}>Add NOT to group</Typography>
                  </MenuItem>
                )}
                {!areThereSimpleFilters && (
                  <MenuItem
                    onClick={() => {
                      const newConditions = condition.and || condition.or || [];
                      newConditions.splice(0, 0, {
                        filter: {
                          id: generateUniqueId(),
                          key: '',
                          comparator: Operators[0].id,
                          value: ''
                        }
                      });
                      if (isAndRelation) {
                        onChange({ ...condition, and: newConditions });
                      } else {
                        // or relation
                        onChange({ ...condition, or: newConditions });
                      }
                      setIsAddMenuOpen(false);
                    }}
                  >
                    <Typography variant={'medium'}>Add condition</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}

          {(isAndRelation ? condition.and : condition.or)?.map((cond, index) => (
            <Condition
              condition={cond}
              onChange={(newCond: AndOrMetadataInput) => {
                const newConditions = condition.and || condition.or || [];
                newConditions[index] = newCond;
                if (isAndRelation) {
                  onChange({ ...condition, and: newConditions });
                } else {
                  // or relation
                  onChange({ ...condition, or: newConditions });
                }
              }}
              level={level + 1}
              onRemove={() => {
                const newConditions = condition.and || condition.or || [];
                newConditions.splice(index, 1);
                if (isAndRelation) {
                  onChange({ ...condition, and: newConditions });
                } else {
                  // or relation
                  onChange({ ...condition, or: newConditions });
                }
              }}
              onAdd={() => {
                const newConditions = condition.and || condition.or || [];
                newConditions.splice(index + 1, 0, {
                  filter: {
                    id: generateUniqueId(),
                    key: '',
                    comparator: Operators[0].id,
                    value: ''
                  }
                });
                if (isAndRelation) {
                  onChange({ ...condition, and: newConditions });
                } else {
                  // or relation
                  onChange({ ...condition, or: newConditions });
                }
              }}
            />
          ))}
        </Box>
        {level === 0 && (
          <Box
            sx={{
              height: '40px',
              borderRadius: '0px 0px 16px 16px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
              borderTop: '1px solid rgba(226, 232, 240, 1)',
              gap: '8px'
            }}
          >
            <DagshubButton
              style={{ borderRadius: '8px' }}
              label={'Apply query'}
              stretch={ButtonStretch.Slim}
              disabled={false} //Todo: if loading disable
              onClick={() => {
                onApplyQueryButtonClicked();
              }}
            />
            <DagshubButton
              style={{ borderRadius: '8px' }}
              label={sourceType == SourceType.DATASOURCE ? 'Save as new dataset' : 'Save query'}
              stretch={ButtonStretch.Slim}
              disabled={false} //Should i disable under some conditions?
              onClick={(event) => {
                if (sourceType == SourceType.DATASET) {
                  setSaveMenuAnchorEl(event.currentTarget);
                  setIsSaveMenuOpen(true);
                } else {
                  //datasource
                  //Todo: save as new dataset
                }
              }}
            />
            <Menu
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: '12px'
                },
                padding: '8px'
              }}
              id="basic-menu"
              anchorEl={saveMenuAnchorEl}
              open={isSaveMenuOpen}
              onClose={() => setIsSaveMenuOpen(false)}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem
                onClick={() => {
                  //Todo : save as new dataset
                  setIsSaveMenuOpen(false);
                }}
              >
                <Typography variant={'medium'}>Save as new dataset</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  //Todo : update current dataset + have the name of the source
                  setIsSaveMenuOpen(false);
                }}
              >
                <Typography variant={'medium'}>Update current dataset</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default GroupCondition;
