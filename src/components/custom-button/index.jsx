import React from 'react';
import "./custom-button.scss";
import {lighten, styled} from '@mui/material/styles';
import {Button} from '@mui/material';
import colors from "../../scss/variables.module.scss"

const CustomButton = (props) => {
    const {
        textFontWeight,
        textSize,
        textPadding,
        textButtonColor,
        buttonName,
        buttonColor,
        buttonWidth,
        buttonHeight,
        disabled,
        borderRadius,
        onClick
    } = props;

    const CustomButton = styled(Button)({
        fontWeight: textFontWeight ?? "600",
        fontSize: textSize ?? "1em",
        backgroundColor: buttonColor ?? colors.greenBackgroundColor,
        width: buttonWidth ?? "auto",
        height: buttonHeight ?? "3em",
        borderRadius: borderRadius ?? "1.5em",
        textTransform: "none",
        color: textButtonColor?? colors.textColor,
        padding: textPadding?? "0 1.5em",
        '&:hover': {
            backgroundColor: lighten(buttonColor ?? colors.greenBackgroundColor, 0.1),
        },
        '&:active': {
            backgroundColor: lighten(buttonColor ?? colors.greenBackgroundColor, 0.12),
        },
    });

    const CustomButtonDisabled = styled(Button)({
        fontWeight: textFontWeight ?? "600",
        fontSize: textSize ?? "1em",
        backgroundColor: colors.greyBackgroundColor,
        width: buttonWidth ?? "auto",
        height: buttonHeight ?? "3em",
        borderRadius: borderRadius ?? "1.5em",
        textTransform: "none",
        color: colors.textColor,
        padding: textPadding?? "0 1.5em",
        '&:hover': {
            backgroundColor: lighten(colors.greyBackgroundColor, 0.1),
        },
        '&:active': {
            backgroundColor: lighten(colors.greyBackgroundColor, 0.12),
        },
    });

    return (
        <React.Fragment>
            {disabled ?
                (
                    <CustomButtonDisabled disabled>
                        {buttonName ? buttonName : "Submit"}
                    </CustomButtonDisabled>
                ) :
                (
                    <CustomButton onClick={onClick} className="shadow-md">
                        {buttonName ? buttonName : "Submit"}
                    </CustomButton>
                )}
        </React.Fragment>
    );
};

export default CustomButton;
