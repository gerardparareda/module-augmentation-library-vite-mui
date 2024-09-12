# Module augmentation with: TypeScript + Vite + Material UI (MUI v5)

An example of module augmentation working as a library of components with mui v5. 

Use this example with:

- https://github.com/gerardparareda/module-augmentation-app-vite-mui

## How to use

1. Download the project
2. Install `npm install`
3. Build the project `npx vite build`

You can now install the components library somewhere else.

## How does it work
### In the components library
For this to work, it is imperative to import the types of those modules you are augmenting, otherwise it won't work:
`./src/types/augmentations.d.ts`:
```js
import {  } from '@mui/material/styles';
import {  } from '@mui/material/Button';

...
```

As stated here: https://github.com/mui/material-ui/issues/35743#issuecomment-1403251627

Also, make sure the declaration file is included in the typescript configuration (`tsconfig.<anything>.json`). It should fall inside of any included folder or file:
`./tsconfig.app.json`
```
{
  "compilerOptions": {
    ...
  },
  "include": ["src"]
}
```
```
src/
└── types/
    └── augmentations.ts
```

**Excluded files won't have our augmentations.** If needed, a seperate typescript configuration file for the build can be made that excludes certain files. This way when developing the components library our augmentations will appear in files that will later be excluded from our build:
`./tsconfig.build.json`
```
{
  "compilerOptions": {
    ...
  },
  "include": ["src"],
	"exclude": ["src/<someFileOrFolder>]
}
```
`./tsconfig.json`
```
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.build.json" }
  ]
}
```
`./package.json`
```
{
  "name": "components-library",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "files": [
    "dist"
  ],
  "module": "dist/my-lib.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc --build tsconfig.build.json && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    ...
  }
  ...
}

```

### For the consumer application
For the module augmentation to work, you need to "export" (not in the module `export {} ...` sense, but publish) the typings file.

So, when built, the `./dist` folder must include our module augmentation typings.

`./dist/types/augmentations.d.ts`
```js
import {  } from '@mui/material/styles';
import {  } from '@mui/material/Button';
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
```



My problem with ViteJS, is that these "headers"/types were excluded from the build perhaps because of rollup treeshaking or some vite-plugin-dts configuration (with `{rollupTypes: true}` it failed), generating as an example:
`./dist/index.d.ts`
```js
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
```
^ This didn't work, so beware.