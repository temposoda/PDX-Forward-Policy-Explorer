'use client';

import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from './ColorModeProvider';

export function ColorModeToggle() {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    );
}