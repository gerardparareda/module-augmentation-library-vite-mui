import { Button, ButtonProps } from "@mui/material"

export const CustomButton = ({
	children,
	...rest
}: ButtonProps) => {
	return <Button {...rest}>{children}</Button>
}