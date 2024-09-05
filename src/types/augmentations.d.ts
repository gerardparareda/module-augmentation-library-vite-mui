import type {} from "@mui/material/styles";
import type {} from "@mui/material/Button";

declare module '@mui/material/styles' {
	interface ICustomStyles {
		custom?: {
			constants?: {
				borderRadius?: number,
				borderRadiusMinor?: number,
				appBarHeightMobile?: number,
				appBarHeightLaptop?: number,
				appBarBackgroundColor?: string,
				appBarTextColor?: string,
				logoImage?: string,
				logoBarImage?: string,
				logoBarMaxHeightImage?: number
			}
		}
	}
  
  interface Theme extends ICustomStyles {}
  interface ThemeOptions extends ICustomStyles {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    newCustomColorTest: true;
		grey: true;
  }
}