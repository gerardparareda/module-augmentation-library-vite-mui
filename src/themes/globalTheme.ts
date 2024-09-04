import { createTheme, darken, lighten, alpha, Theme, ThemeOptions } from '@mui/material/styles';
import { grey } from "@mui/material/colors";

export const createBoilerplateTheme = (customConfig: ThemeOptions): Theme => {
  
  const globalThemeConstants = {
    custom: {
      constants: {
        borderRadiusMinor: "5px",
      },
    }
  };

  let theme = createTheme(undefined, globalThemeConstants);
  theme = createTheme(undefined, customConfig);

  return createTheme(theme, {
    palette: {
      primary: {
        light: lighten(theme.palette.primary.main, 0.3),
        dark: darken(theme.palette.primary.main, 0.3),
      },
      secondary: {
        light: lighten(theme.palette.secondary.main, 0.3),
        dark: darken(theme.palette.secondary.main, 0.3),
      },
      // default: {...defaultColor(theme)},
      grey: {
        main: grey[300],
        dark: grey[400],
        // contrastText: "#000"
      },
      // black: {
      //   main: lighten(common.black, 0.3),
      // }
    },
    components: {
      MuiSwitch: {
        styleOverrides:{
          colorSecondary: {
            '&$checked': {
              color: theme.palette.primary.main
            },
            '&$checked + $track': {
              backgroundColor: theme.palette.primary.main
            }
          },
          track: {
            backgroundColor: theme.palette.secondary.main,
          }
        }
      },
      MuiButton: {
        styleOverrides:{
          root: {
            borderRadius: theme.custom?.constants?.borderRadius,
          }
        },
        variants: [
          {
            props: { variant: "contained", color: "grey" },
            style: {
              color: theme.palette.getContrastText(theme.palette.grey[300])
            }
          },
          {
            props: { variant: "outlined", color: "grey" },
            style: {
              color: theme.palette.text.primary,
              borderColor:
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.23)"
                  : "rgba(255, 255, 255, 0.23)",
              "&.Mui-disabled": {
                border: `1px solid ${theme.palette.action.disabledBackground}`
              },
              "&:hover": {
                borderColor:
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.23)"
                    : "rgba(255, 255, 255, 0.23)",
                backgroundColor: alpha(
                  theme.palette.text.primary,
                  theme.palette.action.hoverOpacity
                )
              }
            }
          },
          {
            props: { variant: "text", color: "grey" },
            style: {
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: alpha(
                  theme.palette.text.primary,
                  theme.palette.action.hoverOpacity
                )
              }
            }
          }
        ]
      },
      MuiPaper: {
        styleOverrides:{
          rounded: {
            borderRadius: theme.custom?.constants?.borderRadius,
          },
          
        }
      },
      MuiAppBar: {
        styleOverrides:{
          root: {
            minHeight: theme.custom?.constants?.appBarHeightMobile ?? 64,
            [theme.breakpoints.up('lg')]: {
              minHeight: theme.custom?.constants?.appBarHeightLaptop ?? 64
            },
          },
          colorPrimary: {
            // https://stackoverflow.com/questions/56224684/material-ui-v4-appbar-wont-change-theme
            // defaultTheme.overrides.MuiAppBar.colorPrimary.backgroundColor
            backgroundColor: theme.custom?.constants?.appBarBackgroundColor ?? theme.palette.primary.main
          },
        }
      },
      MuiFormControl: {
        defaultProps: {
          variant: 'standard'
        }
      },
      MuiTextField: {
        defaultProps: {
          variant: 'standard'
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.secondary.main
          }
        }
      },
      MuiList: {
        defaultProps: {
          dense: true
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: theme.custom?.constants?.borderRadiusMinor,
            overflow: "hidden"
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: theme.custom?.constants?.borderRadiusMinor,
            overflow: "hidden"
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: theme.custom?.constants?.borderRadiusMinor,
            overflow: "hidden"
          }
        }
      }
    },
    custom: {
      constants: {
        defaultButtonColor: "grey",
        logoBarMaxHeightImage: 64,
      },
    },
  });
};