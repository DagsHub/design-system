import React, {useRef} from 'react';
import {Box} from '@mui/system';
import {ThemeProvider, Typography} from '@mui/material';
import {Button, ButtonVariant} from '../../../elements';
import {Icon} from '../../../icons';
import theme from '../../../../theme';

export default function TopButtonsSection({
                                              height,
                                              isSmallScreen,
                                              fileName,
                                              linkToFile,
                                              onMetadataIconClick,
                                              metadataButtonIcon
                                          }: {
    height: string;
    isSmallScreen: boolean;
    fileName: string;
    linkToFile: string;
    onMetadataIconClick: () => void;
    metadataButtonIcon: string;
}) {
    const showSidebarButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    width: 'calc(100% - 44px)',
                    height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
                    padding: '8px 0px',
                    boxSizing: 'border-box',
                }}
            >
                <Box sx={{display: "flex", gap:"8px", justifyContent: "flex-start", alignItems:"center"}}>
                    <Typography
                        variant={'large'}
                        sx={{
                            width: '100%'
                        }}
                    >
                        {fileName}
                    </Typography>

                        <a href={linkToFile} target={'_blank'}>
                            <Button
                                label={''}
                                iconRight={
                                    <Icon icon={'outline-external-link'} width={15} height={15} fill={'rgba(148, 163, 184, 1)'}/>
                                }
                                variant={ButtonVariant.Ghost}
                            />
                        </a>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: '8px',
                        width: isSmallScreen ? '100%' : 'auto'
                    }}
                >
                    {isSmallScreen && (
                        <><Button
                            ref={showSidebarButtonRef}
                            onClick={() => {
                                onMetadataIconClick();
                                setTimeout(() => {
                                    showSidebarButtonRef?.current?.blur();
                                }, 400);
                            }}
                            label={''}
                            iconRight={<Icon icon={metadataButtonIcon} width={20} height={20} fill={'#172D32'}/>}
                            variant={ButtonVariant.Secondary}
                        />

                        </>
                    )}

                    <Button
                        label={'Annotate this datapoint'}
                        iconLeft={
                            <Icon icon={'annotations'} width={20} height={20} fill={'#172D32'}/>
                        }
                        variant={ButtonVariant.Secondary}
                    />
                    <Button
                        label={''}
                        iconRight={
                            <Icon icon={'outline-download'} width={15} height={15} fill={'#172D32'}/>
                        }
                        variant={ButtonVariant.Secondary}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
