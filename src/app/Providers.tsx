'use client';

import StyledComponentsRegistry from './lib/registry';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { useState } from 'react';


const Providers = (props: React.PropsWithChildren) => {
    const [themeMode, setThemeMode] = useState("light");

    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={themeMode == "light" ? theme.light : theme.dark}>
                {props.children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default Providers
