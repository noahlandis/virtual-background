import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import ImageButton from '../../shared/components/ImageButton';
import SelectionIconButton from '../../shared/components/SelectionIconButton';
import { backgroundImageUrls, } from '../helpers/backgroundHelper';
function BackgroundConfigCard(props) {
    var classes = useStyles();
    return (_jsx(Card, { className: classes.root, children: _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", children: "Background" }), _jsx(SelectionIconButton, { active: props.config.type === 'none', onClick: function () { return props.onChange({ type: 'none' }); }, children: _jsx(BlockIcon, {}) }), _jsx(SelectionIconButton, { active: props.config.type === 'blur', onClick: function () { return props.onChange({ type: 'blur' }); }, children: _jsx(BlurOnIcon, {}) }), backgroundImageUrls.map(function (imageUrl) { return (_jsx(ImageButton, { imageUrl: imageUrl, active: imageUrl === props.config.url, onClick: function () { return props.onChange({ type: 'image', url: imageUrl }); } }, imageUrl)); })] }) }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            flex: 1,
        },
    });
});
export default BackgroundConfigCard;
