import { Box } from '@mui/system';
import { createSvgIcon, TextField, Typography } from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import React, { Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';

interface SearchFormProps {
  setDisplayName: Dispatch<SetStateAction<string>>;
  setDisplayNameTouched: (value: boolean) => void;
  setDate: Dispatch<SetStateAction<Dayjs | null>>;
  setErrorDate: (value: boolean) => void;
  date: Dayjs | null;
  hour: Dayjs | null;
  displayName: string;
  setHour: Dispatch<SetStateAction<Dayjs | null>>;
}
export const SearchForm = ({
  setDisplayName,
  setDisplayNameTouched,
  setDate,
  setErrorDate,
  date,
  hour,
  setHour,
  displayName,
}: SearchFormProps) => {
  return (
    <Box width={'50%'} py={2} px={1} display={'inline-grid'} gap={2}>
      <Box display={'inline-grid'} gap={1}>
        <Typography variant={'mediumBold'} component={'div'}>
          Date
        </Typography>
        <DatePicker
          slotProps={{
            day: {
              sx: {
                '&.MuiPickersDay-root.Mui-selected': {
                  backgroundColor: '#5467de',
                },
              },
            },
          }}
          format="YYYY-MM-DD"
          value={date}
          onChange={setDate}
          onError={(reason, value) => {
            if (reason) {
              setErrorDate(true);
            } else {
              setErrorDate(false);
            }
          }}
          slots={{
            openPickerIcon: createSvgIcon(
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="#64748B"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.66666 1.66663C7.1269 1.66663 7.5 2.03972 7.5 2.49996V3.33329H12.5V2.49996C12.5 2.03972 12.8731 1.66663 13.3333 1.66663C13.7936 1.66663 14.1667 2.03972 14.1667 2.49996V3.33329H15.8333C17.214 3.33329 18.3333 4.45258 18.3333 5.83329V15.8333C18.3333 17.214 17.214 18.3333 15.8333 18.3333H4.16666C2.78595 18.3333 1.66666 17.214 1.66666 15.8333V5.83329C1.66666 4.45258 2.78595 3.33329 4.16666 3.33329H5.83333V2.49996C5.83333 2.03972 6.20643 1.66663 6.66666 1.66663ZM5.83333 4.99996H4.16666C3.70643 4.99996 3.33333 5.37306 3.33333 5.83329V15.8333C3.33333 16.2935 3.70643 16.6666 4.16666 16.6666H15.8333C16.2936 16.6666 16.6667 16.2935 16.6667 15.8333V5.83329C16.6667 5.37306 16.2936 4.99996 15.8333 4.99996H14.1667V5.83329C14.1667 6.29353 13.7936 6.66663 13.3333 6.66663C12.8731 6.66663 12.5 6.29353 12.5 5.83329V4.99996H7.5V5.83329C7.5 6.29353 7.1269 6.66663 6.66666 6.66663C6.20643 6.66663 5.83333 6.29353 5.83333 5.83329V4.99996ZM5 9.16663C5 8.70639 5.37309 8.33329 5.83333 8.33329H14.1667C14.6269 8.33329 15 8.70639 15 9.16663C15 9.62686 14.6269 9.99996 14.1667 9.99996H5.83333C5.37309 9.99996 5 9.62686 5 9.16663Z"
                  fill="#64748B"
                />
              </svg>,
              'calendar'
            ),
          }}
        />
      </Box>

      <Box display={'inline-grid'} gap={1}>
        <Typography variant={'mediumBold'} component={'div'}>
          Time
        </Typography>
        <TimeField format="HH:mm:ss" value={hour} onChange={setHour} />
      </Box>

      <Box display={'inline-grid'} gap={1}>
        <Typography variant={'mediumBold'} component={'div'}>
          Alias
        </Typography>
        <TextField
          placeholder={'as of YYYY-MM-DD hh:mm:ss'}
          value={displayName}
          onChange={(e) => {
            setDisplayName(e?.target?.value);
            setDisplayNameTouched(true);
          }}
        />
        <Typography variant={'small'} color={'#64748B'}>
          Optional
        </Typography>
      </Box>
    </Box>
  );
};
