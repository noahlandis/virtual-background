import { jsx as _jsx } from "react/jsx-runtime";
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
function SelectionButton(props) {
    var classes = useStyles();
    return (_jsx(Button, { className: clsx(classes.root, props.active && classes.active), disabled: props.disabled, onClick: props.onClick, children: props.children }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            padding: 0,
            minWidth: theme.spacing(7) + 2,
            height: theme.spacing(7) + 2,
            width: theme.spacing(7) + 2,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            border: '2px solid transparent',
            alignItems: 'stretch',
            transitionProperty: 'transform, border-color',
            transitionDuration: "".concat(theme.transitions.duration.shorter, "ms"),
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            '&:hover': {
                transform: 'scale(1.125)',
            },
        },
        active: {
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.125)',
        },
    });
});
export default SelectionButton;
