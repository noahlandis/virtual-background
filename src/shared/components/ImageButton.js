import { jsx as _jsx } from "react/jsx-runtime";
import useImageThumbnail from '../hooks/useImageThumbnail';
import ThumbnailButton from './TumbnailButton';
function ImageButton(props) {
    var _a = useImageThumbnail(props.imageUrl), thumbnailUrl = _a[0], revokeThumbnailUrl = _a[1];
    return (_jsx(ThumbnailButton, { thumbnailUrl: thumbnailUrl, active: props.active, onClick: props.onClick, onLoad: revokeThumbnailUrl }));
}
export default ImageButton;
