import { useContext } from 'react';

import { ThemeProvider } from 'styled-components';

import { AppContext } from './app';

const theme = {
    // Colors

    colors: {
        brightBlue: 'hsl(220, 98%, 61%)',
        checkBackground: 'linear-gradient(120deg, hsl(192, 100%, 67%) 30%, hsl(280, 87%, 65%))',

        // Neutral

        // Light Theme
        light: {
            veryLightGray: 'hsl(0, 0%, 98%)',
            veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
            lightGrayishBlue: 'hsl(233, 11%, 84%)',
            darkGrayishBlue: 'hsl(236, 9%, 61%)',
            veryDarkGrayishBlue: 'hsl(235, 19%, 35%)'
        },

        // Dark Theme
        dark: {
            veryDarkBlue: 'hsl(235, 21%, 11%)',
            veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
            lightGrayishBlue: 'hsl(234, 39%, 85%)',
            lightGrayishBlueHover: 'hsl(236, 33%, 92%)',
            darkGrayishBlue: 'hsl(234, 11%, 52%)',
            veryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
            veryDarkGrayishBlueAlt: 'hsl(237, 14%, 26%)'
        }
    },

    // Typography
    font: {
        size: '18px',
        family: 'Josefin Sans, sans-serif',
        weights: { normal: 400, bold: 700 }
    }

}

export const ThemeContextWrapper = ({ children }) => {
    const { state: { isDarkMode } } = useContext(AppContext);

    return (
        <ThemeProvider theme={{ ...theme, isDarkMode }}>
            {children}
        </ThemeProvider>
    )
}