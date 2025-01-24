import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import SelectionButton from './SelectionButton';
function ThumbnailButton(props) {
    var classes = useStyles();
    return (_jsxs(SelectionButton, { active: !!props.thumbnailUrl && props.active, disabled: !props.thumbnailUrl, onClick: props.onClick, children: [props.thumbnailUrl ? (_jsx("img", { className: clsx(classes.scalableContent, classes.image), src: props.thumbnailUrl, alt: "", onLoad: props.onLoad })) : (_jsx(Skeleton, { className: classes.scalableContent, variant: "rect" })), props.children] }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        scalableContent: {
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            margin: -1,
            borderRadius: theme.shape.borderRadius,
        },
        image: {
            objectFit: 'cover',
        },
    });
});
export default ThumbnailButton;
