import { createGlobalStyle } from "styled-components";
// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
export const theme = {
  light: {
    palette: {
      primary: {
        main: "#2C3E50", // Dark blue for professionalism and stability
        dark: "#1F2D3A", // Slightly darker shade for contrast
      },
      secondary: {
        main: "#3498DB", // Bright blue for highlights and calls to action
        dark: "#2980B9", // Slightly darker shade for depth
      },
      disabled: {
        button: "#DDDDDD",
      },
      text: {
        primary: "#333333", // Dark gray for readability
        secondary: "#666666", // Lighter gray for secondary text
        disabled: "#CCCCCC", // Lightest gray for disabled or inactive elements
        white: "#FFFFFF",
        black: "#000000",
      },
      background: {
        default: "#FFFFFF", // White background for cleanliness
        dark: "#F2F4F6", // Light gray for contrast
        paper: "#E5E8EB", // Slightly darker gray for paper-like backgrounds
      },
      border: {
        primary: "#DDDDDD", // Light gray for borders
        secondary: "#EEEEEE", // Slightly lighter gray for borders
        focused: "#2C3E50",
      },
      error: {
        main: "#E74C3C", // Red for error messages or alerts
      },
      success: {
        main: "#27AE60", // Green for success messages or positive feedback
      },
      warning: {
        main: "#F39C12", // Orange for warnings or cautionary messages
      },
      info: {
        main: "#3498DB", // Bright blue for informational messages
      },
      action: {
        active: "#2980B9", // Active state for buttons or interactive elements
        hover: "#ECF0F1", // Light gray for hover effects
        selected: "#ECF0F1", // Light gray for selected items
      },
      common: {
        black: "#000000", // Black for high contrast elements
        white: "#FFFFFF", // White for clean backgrounds or accents
        grey: "#CCCCCC", // Neutral gray for various purposes
        red: "#FF0000", // Red for critical elements
        yellow: "#FFFF00",
        blue: "#0000FF",
        purple: "#800080",
        green: "#008000",
      },
      icon: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
      },
      fontSize: {
        f10: "10px", // Very small font size for specific use cases
        f12: "12px", // Small font size for labels or small text
        f14: "14px", // Standard font size for most text
        f16: "16px", // Standard font size for most text
        f18: "18px", // Slightly larger font size for emphasis or subtitles
        f20: "20px", // Larger font size for headings or important text
        f24: "24px", // Extra-large font size for titles or headings
        f30: "30px", // Even larger font size for prominent titles
        f36: "36px", // Very large font size for main headings
        f44: "44px", // Huge font size for special emphasis
        f52: "52px", // Even larger font size for main headings
        f62: "62px", // Huge font size for special emphasis
        f74: "74px", // Huge font size for special emphasis
        f86: "86px", // Huge font size for special emphasis
        f98: "98px", // Huge font size for special emphasis
        f128: "128px", // Huge font size for special emphasis
        f160: "160px", // Huge font size for special emphasis
        f192: "192px", // Huge font size for special emphasis
      },
    },
    borderRadius: {
      container: "8px", // Slightly rounded corners for containers
      input: "4px", // Slightly rounded corners for input fields
      badge: "4px", // Small rounding for badges or labels
      chip: "20px", // Slightly rounded corners for chips
    },
    spacing: {
      s0: "0px",
      s2: "2px", // Small spacing for fine adjustments
      s4: "4px", // Standard spacing for most elements
      s8: "8px", // Larger spacing for sections or containers
      s12: "12px", // Even larger spacing for significant areas
      s16: "16px", // More substantial spacing for larger sections
      s20: "20px", // Even more substantial spacing for separation
      s24: "24px", // Even more substantial spacing for separation
      s28: "28px", // Even more substantial spacing for separation
      s32: "32px", // Large spacing for significant separation
      s48: "48px", // Huge spacing for major separation
      s52: "52px", // Huge spacing for major separation
      s64: "64px", // Very large spacing for extreme separation
      s80: "80px", // Enormous spacing for massive separation
      s96: "96px", // Monumental spacing for vast separation
      s128: "128px", // Gigantic spacing for immense separation
    },
    sizing: {
      s10: "10px", // Very small size for specific use cases
      s12: "12px", // Small size for fine adjustments or small elements
      s14: "14px", // Standard size for most elements
      s16: "16px", // Standard size for most elements
      s18: "18px", // Slightly larger size for emphasis or subtitles
      s20: "20px", // Larger size for headings or important text
      s24: "24px", // Extra-large size for titles or headings
      s30: "30px", // Even larger size for prominent titles
      s36: "36px", // Very large size for main headings
      s44: "44px", // Huge size for special emphasis
      s52: "52px", // Even larger size for main headings
      s62: "62px", // Huge size for special emphasis
      s74: "74px", // Huge size for special emphasis
      s86: "86px", // Huge size for special emphasis
      s98: "98px", // Huge size for special emphasis
      s128: "128px", // Huge size for special emphasis
      s160: "160px", // Huge size for special emphasis
      s192: "192px", // Huge size for special emphasis
      s224: "224px", // Specific size
      s256: "256px", // Specific size
      s288: "288px", // Specific size
      s320: "320px", // Specific size
      s352: "352px", // Specific size
      s384: "384px", // Specific size
      s416: "416px", // Specific size
      s448: "448px", // Specific size
      s480: "480px", // Specific size
      s500: "500px", // Specific size
    },
    breakpoints: {
      xs: "0px",
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
  },
  dark: {
    palette: {
      primary: {
        main: "#1976D2",
        dark: "#115293",
      },
      secondary: {
        main: "#4CAF50",
        dark: "#388E3C",
      },
      disabled: {
        button: "#757575",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#CCCCCC",
        disabled: "#757575",
        white: "#000000",
      },
      background: {
        default: "#121212",
        dark: "#1E1E1E",
        paper: "#424242",
      },
      border: {
        primary: "#757575",
        secondary: "#616161",
      },
      error: {
        main: "#FF5252",
      },
      success: {
        main: "#69F0AE",
      },
      warning: {
        main: "#FFD600",
      },
      info: {
        main: "#64B5F6",
      },
      action: {
        active: "#4CAF50",
        hover: "#1E88E5",
        selected: "#1E88E5",
      },
      common: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#9E9E9E",
        red: "#FF0000",
        yellow: "#FFFF00",
      },
      icon: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
      fontSize: {
        f10: "10px",
        f12: "12px",
        f14: "14px",
        f16: "16px",
        f18: "18px",
        f20: "20px",
        f24: "24px",
        f30: "30px",
        f36: "36px",
        f44: "44px",
        f52: "52px",
        f62: "62px",
        f74: "74px",
        f86: "86px",
        f98: "98px",
        f128: "128px",
        f160: "160px",
        f192: "192px",
      },
    },
    borderRadius: {
      container: "8px",
      input: "4px",
      badge: "4px",
      chip: "20px",
    },
    spacing: {
      s2: "2px",
      s4: "4px",
      s8: "8px",
      s12: "12px",
      s16: "16px",
      s24: "24px",
      s32: "32px",
      s48: "48px",
      s64: "64px",
      s80: "80px",
      s96: "96px",
      s128: "128px",
    },
    sizing: {
      s10: "10px",
      s12: "12px",
      s14: "14px",
      s16: "16px",
      s18: "18px",
      s20: "20px",
      s24: "24px",
      s30: "30px",
      s36: "36px",
      s44: "44px",
      s52: "52px",
      s62: "62px",
      s74: "74px",
      s86: "86px",
      s98: "98px",
      s128: "128px",
      s160: "160px",
      s192: "192px",
      s224: "224px",
      s256: "256px",
      s288: "288px",
      s320: "320px",
      s352: "352px",
      s384: "384px",
      s416: "416px",
      s448: "448px",
      s480: "480px",
      s500: "500px",
    },
    breakpoints: {
      xs: "0px",
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
  },
};

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: ${({ theme }) => theme.spacing.s0};
  padding: ${({ theme }) => theme.spacing.s0};
}

body {
  margin: ${({ theme }) => theme.spacing.s0};
  padding: ${({ theme }) => theme.spacing.s0};
  background-color: #dfe5e8;
  font-family: sans-serif;
}

.show {
    opacity: 1;
    max-height: 100%; 
    transition: opacity 0.5s ease, max-height 0.5s ease;
    overflow: hidden; 
  }

  .hide {
    opacity: 0;
    max-height: 0;
    transition: opacity 0.5s ease, max-height 0.3s ease;
    overflow: hidden; 
  }

ul {
  display: flex;
  flex-direction: column;
  list-style: none;
}

/* /shadow */
.shadow-md {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

`;

export default GlobalStyle;
