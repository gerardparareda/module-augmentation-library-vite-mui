import { createTheme, alpha, Theme, ThemeOptions } from '@mui/material/styles';

export const createBoilerplateTheme = (customConfig: ThemeOptions): Theme => {
  
  const globalThemeConstants: ThemeOptions = {
    palette: {
      primary: {
        main: "#6e96d8",
      },
      secondary: {
        main: "#d8af6e",
      },
    },
    custom: {
      constants: {
        borderRadiusMinor: 5,
        
      },
    }
  };

  let theme = createTheme(undefined, globalThemeConstants);
  theme = createTheme(theme, customConfig);

  const customThemeOptions: ThemeOptions = {
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
            props: { color: "newCustomColorTest" },
            style: {
              backgroundColor: "red"
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
  };

  return createTheme(theme, customThemeOptions);
}