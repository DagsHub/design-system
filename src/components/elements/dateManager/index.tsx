import { Divider, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, ButtonStretch, ButtonVariant } from '../button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from '../../../theme';
import PresetsContent from './Presets';
import { SearchForm } from './SearchForm';
import {FilterType} from "../controlledDisplayFiltersGroup";

export interface DateManagerProps {
  presets: FilterType[];
  compare: ({ alias, value }: FilterType) => void;
  close: () => void;
  loading: boolean;
}

export const DateManager = ({ presets, compare, close, loading }: DateManagerProps) => {
  const defaultDisplayName = `as of ${dayjs().format('YYYY-MM-DD')} ${dayjs().format('HH:mm:ss')}`;

  const [date, setDate] = useState<null | Dayjs>(dayjs());
  const [hour, setHour] = useState<null | Dayjs>(dayjs());
  const [value, setValue] = useState<string>(defaultDisplayName);
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [displayNameTouched, setDisplayNameTouched] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  const updateValue = (value: string) => setValue(value);

  // update the display name unless the display name area is touched.
  useEffect(() => {
    const value = `${dayjs(date).format('YYYY-MM-DD')} ${dayjs(hour).format('HH:mm:ss')}`;
    if (!displayNameTouched) {
      setDisplayName(`as of ${value}`);
    }

    updateValue(value);
  }, [hour, date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
      <ThemeProvider theme={theme}>
        <Box width={'530px'} height={'100%'} color={'#172D32'} px={1}>
          <Typography component={'div'} p={1} variant={'mediumBold'}>
            Compare to previous version
          </Typography>
          <Divider sx={{ backgroundColor: '#F8FAFC' }} />

          <Box display={'flex'}>
            <SearchForm
              setErrorDate={setErrorDate}
              setDisplayName={setDisplayName}
              setDisplayNameTouched={setDisplayNameTouched}
              setHour={setHour}
              hour={hour}
              setDate={setDate}
              date={date}
              displayName={displayName}
            />

            <Divider flexItem orientation={'vertical'} sx={{ backgroundColor: '#F8FAFC' }} />

            <Box px={1} py={2} width={'50%'}>
              <PresetsContent presets={presets} onPresetClick={(value) => setDate(dayjs(value))} />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: '#F8FAFC' }} />
          <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Typography color={'#64748B'} component="div" variant={'small'}>
                Browser time: (GMT {dayjs(new Date()).format('Z')})
              </Typography>
            </Box>

            <Box gap={1} display={'flex'} justifyContent={'flex-end'}>
              <Button
                stretch={ButtonStretch.Slim}
                variant={ButtonVariant.OutlineSecondary}
                onClick={close}
                label={'Cancel'}
              />
              <Button
                stretch={ButtonStretch.Slim}
                variant={ButtonVariant.Primary}
                onClick={() => compare({ value, alias: displayName })}
                disabled={!date || errorDate || loading}
                label={loading ? 'loading...' : 'Search'}
              />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
};