import { jsx as _jsx } from "react/jsx-runtime";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SelectionButton from './SelectionButton';
function SelectionIconButton(props) {
    var classes = useStyles();
    return (_jsx(SelectionButton, { active: props.active, onClick: props.onClick, children: _jsx("div", { className: classes.root, children: props.children }) }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            width: '100%',
            height: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: theme.shape.borderRadius,
            margin: -1,
            boxSizing: 'content-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
});
export default SelectionIconButton;
