import { jsx as _jsx } from "react/jsx-runtime";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useVideoThumbnail from '../hooks/useVideoThumbnail';
import ThumbnailButton from './TumbnailButton';
function VideoButton(props) {
    var classes = useStyles();
    var _a = useVideoThumbnail(props.videoUrl), thumbnailUrl = _a[0], revokeThumbnailUrl = _a[1];
    return (_jsx(ThumbnailButton, { thumbnailUrl: thumbnailUrl, active: props.active, onClick: props.onClick, onLoad: revokeThumbnailUrl, children: _jsx(PlayCircleOutlineIcon, { className: classes.icon }) }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        icon: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: theme.palette.common.white,
        },
    });
});
export default VideoButton;
