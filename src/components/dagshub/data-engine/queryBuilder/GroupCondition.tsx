import React, { useState } from 'react';
import { Box } from '@mui/system';
import { ConditionDropdown } from './ConditionDropdown';
import { Button as DagshubButton, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
  Typography
} from '@mui/material';
import theme from '../../../../theme';
import Condition from './Condition';
import AddIcon from '@mui/icons-material/Add';
import { AndOrMetadataInput, Operators, useQueryBuilderContext } from './QueryBuilderContext';
import { LabeledSwitch } from '../../../forms';

export function GroupCondition({
  condition,
  onChange,
  level,
  onRemove
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  level: number;
  onRemove?: () => void;
}) {
  const { isSimpleMode, generateUniqueId, isDisplayableInSimpleMode, onToggleQueryMode } =
    useQueryBuilderContext();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const isAndRelation = !!condition.and;
  const areThereSimpleFilters = (isAndRelation ? condition.and : condition.or)?.some((cond) => {
    return !!cond.filter;
  });

  const onChangeHandler = (conditions: AndOrMetadataInput[]) => {
    if (isAndRelation) {
      onChange({ ...condition, and: conditions });
    } else {
      onChange({ ...condition, or: conditions });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          '::-webkit-scrollbar': {
            width: '8px' /* Set a width for the scrollbar */
          },

          '::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(23, 45, 50, 0.15)' /* Color of the thumb */,
            borderRadius: '6px' /* Set the border radius for the thumb */
          },

          '::-webkit-scrollbar-track': {
            bgcolor: 'transparent' /* Color of the track */,
            borderRadius: '8px' /* Set the border radius for the track */
          }
        }}
        style={{
          border:
            level == 0 ? '1px solid rgba(226, 232, 240, 1)' : '2px dashed rgba(203, 213, 225, 1)',
          borderRadius: level == 0 ? '8px 8px 0px 0px' : '16px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(248, 250, 252, 1)',
          position: 'relative',
          width: '100%'
        }}
      >
        {level == 0 && (
          <Tooltip
            title={
              !isDisplayableInSimpleMode ? 'Simplified query cannot contain groups, OR, NOT' : ''
            }
            placement={'top-start'}
            arrow={true}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-1px',
                right: '-1px',
                borderRadius: '0px 0px 0px 14px',
                border: '1px solid rgba(226, 232, 240, 1)',
                display: 'flex',
                justifyContent: 'center',
                borderRight: 'none',
                borderTop: 'none',
                alignItems: 'center',
                '& .MuiSwitch-switchBase': {
                  '&.Mui-checked': {
                    '& + .MuiSwitch-track': {
                      backgroundColor: 'rgba(84, 103, 222, 1)!important'
                    }
                  }
                }
              }}
            >
              <LabeledSwitch
                label={'Advanced query builder'}
                labelPlacement={'end'}
                padding={'8px'}
                checked={!isSimpleMode}
                disabled={!isDisplayableInSimpleMode}
                onChange={onToggleQueryMode}
              />
            </Box>
          </Tooltip>
        )}
        <Box
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            height: '100%'
          }}
        >
          {isSimpleMode && !areThereSimpleFilters && (
            <Tooltip title={'Add condition'} placement={'top'} arrow={true} disableInteractive>
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
                  onChangeHandler(newConditions);
                }}
              >
                <AddIcon fontSize={'medium'} sx={{ fill: 'rgba(100, 116, 139, 1)' }} />
              </IconButton>
            </Tooltip>
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
                isReadOnly={true}
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
                <Tooltip title={'Remove group'} placement={'top'} arrow={true} disableInteractive>
                  <div>
                    {' '}
                    {/*This div is needed for the tooltip to work*/}
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
                  </div>
                </Tooltip>
              )}
              <Tooltip title={'Add'} placement={'top'} arrow={true} disableInteractive>
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
              </Tooltip>
              <Menu
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '12px'
                  },
                  '.MuiList-root': {
                    padding: '8px!important'
                  }
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
                    onChangeHandler(newConditions);
                    setIsAddMenuOpen(false);
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    padding: '8px!important'
                  }}
                >
                  <Icon
                    icon={'outline-group'}
                    width={11.83}
                    height={13.95}
                    fill={'rgba(71, 85, 105, 1)'}
                  />
                  <Typography variant={'medium'}>Add condition group</Typography>
                </MenuItem>
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
                      onChangeHandler(newConditions);
                      setIsAddMenuOpen(false);
                    }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      alignItems: 'center',
                      padding: '8px!important'
                    }}
                  >
                    <Icon
                      icon={'solid-plus'}
                      width={11.2}
                      height={11.2}
                      fill={'rgba(71, 85, 105, 1)'}
                    />
                    <Typography variant={'medium'}>Add condition</Typography>
                  </MenuItem>
                )}
                {!condition.not && (
                  <>
                    <Divider
                      sx={{
                        height: '2px',
                        backgroundColor: 'rgba(226, 232, 240, 1)',
                        border: '0px',
                        margin: '0px!important'
                      }}
                    />
                    <MenuItem
                      onClick={() => {
                        onChange({ ...condition, not: !condition.not });
                        setIsAddMenuOpen(false);
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px!important'
                      }}
                    >
                      <Icon
                        icon={'outline-not'}
                        width={14}
                        height={14}
                        fill={'rgba(71, 85, 105, 1)'}
                      />
                      <Typography variant={'medium'}>Add NOT to group</Typography>
                    </MenuItem>
                  </>
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
                onChangeHandler(newConditions);
              }}
              level={level + 1}
              onRemove={() => {
                const newConditions = condition.and || condition.or || [];
                newConditions.splice(index, 1);
                onChangeHandler(newConditions);
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
                onChangeHandler(newConditions);
              }}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default GroupCondition;
