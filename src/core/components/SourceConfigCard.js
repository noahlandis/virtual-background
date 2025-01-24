import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VideocamIcon from '@material-ui/icons/Videocam';
import ImageButton from '../../shared/components/ImageButton';
import SelectionIconButton from '../../shared/components/SelectionIconButton';
import VideoButton from '../../shared/components/VideoButton';
import { sourceImageUrls, sourceVideoUrls, } from '../helpers/sourceHelper';
function SourceConfigCard(props) {
    var classes = useStyles();
    return (_jsx(Card, { className: classes.root, children: _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", children: "Source" }), _jsx(SelectionIconButton, { active: props.config.type === 'camera', onClick: function () { return props.onChange({ type: 'camera' }); }, children: _jsx(VideocamIcon, {}) }), sourceImageUrls.map(function (imageUrl) { return (_jsx(ImageButton, { imageUrl: imageUrl, active: imageUrl === props.config.url, onClick: function () { return props.onChange({ type: 'image', url: imageUrl }); } }, imageUrl)); }), sourceVideoUrls.map(function (videoUrl) { return (_jsx(VideoButton, { videoUrl: videoUrl, active: videoUrl === props.config.url, onClick: function () { return props.onChange({ type: 'video', url: videoUrl }); } }, videoUrl)); })] }) }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            flex: 1,
        },
    });
});
export default SourceConfigCard;
