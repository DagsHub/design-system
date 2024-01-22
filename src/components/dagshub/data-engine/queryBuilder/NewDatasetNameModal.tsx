import React, {useEffect} from 'react';
import '../../../styles/root.scss';
import {GenericModal} from "../../organization";
import {Button, ButtonVariant} from '../../../elements';
import {Box, ThemeProvider, Typography} from "@mui/material";
import {Input} from "../../../forms";
import theme from "../../../../theme";

export function NewDatasetNameModal({onClose, onSave, onDatasetNameChange}: {
  onClose: () => void;
  onSave: () => void;
  onDatasetNameChange: (value: string) => void;
}) {
  const [datasetNameInputText, setDatasetNameInputText] = React.useState<string>('');
  const [disableSaveButton, setDisableSaveButton] = React.useState<boolean>(true);

  useEffect(()=>{
    const regex = new RegExp('^\\s*$');
    setDisableSaveButton(regex.test(datasetNameInputText));
  },[datasetNameInputText])

  let elements = [
    <Typography variant={"largeBold"} sx={{width: "100%"}}>Create new dataset</Typography>,
    <Input
      label="Name new dataset"
      value={datasetNameInputText}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setDatasetNameInputText(e.target.value);
        onDatasetNameChange(e.target.value);
      }}
    />,
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      justifyContent: "flex-end",
      width: "100%",
    }}>
      <Button variant={ButtonVariant.Secondary} label={'Cancel'} onClick={onClose}/>
      <Button
        variant={ButtonVariant.Primary}
        label={'save'}
        onClick={onSave}
        disabled={disableSaveButton}
      />
    </Box>
  ];

  return (
    <ThemeProvider theme={theme}>
      <GenericModal
        title={''}
        elements={elements}
        onClose={onClose}
      />
    </ThemeProvider>
  );
}
