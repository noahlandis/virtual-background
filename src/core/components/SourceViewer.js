var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { useEffect, useRef, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function SourceViewer(props) {
    var classes = useStyles();
    var _a = useState(), sourceUrl = _a[0], setSourceUrl = _a[1];
    var _b = useState(false), isLoading = _b[0], setLoading = _b[1];
    var _c = useState(false), isCameraError = _c[0], setCameraError = _c[1];
    var videoRef = useRef(null);
    useEffect(function () {
        setSourceUrl(undefined);
        setLoading(true);
        setCameraError(false);
        setTimeout(function () { return setSourceUrl(props.sourceConfig.url); });
    }, [props.sourceConfig]);
    useEffect(function () {
        function getCameraStream() {
            return __awaiter(this, void 0, void 0, function () {
                var constraint, stream, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            constraint = { video: true };
                            return [4, navigator.mediaDevices.getUserMedia(constraint)];
                        case 1:
                            stream = _a.sent();
                            if (videoRef.current) {
                                videoRef.current.srcObject = stream;
                                return [2];
                            }
                            return [3, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error opening video camera.', error_1);
                            return [3, 3];
                        case 3:
                            setLoading(false);
                            setCameraError(true);
                            return [2];
                    }
                });
            });
        }
        if (props.sourceConfig.type === 'camera') {
            getCameraStream();
        }
        else if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, [props.sourceConfig]);
    function handleImageLoad(event) {
        var image = event.target;
        props.onLoad({
            htmlElement: image,
            width: image.naturalWidth,
            height: image.naturalHeight,
        });
        setLoading(false);
    }
    function handleVideoLoad(event) {
        var video = event.target;
        props.onLoad({
            htmlElement: video,
            width: video.videoWidth,
            height: video.videoHeight,
        });
        setLoading(false);
    }
    return (_jsxs("div", { className: classes.root, children: [isLoading && _jsx(CircularProgress, {}), props.sourceConfig.type === 'image' ? (_jsx("img", { className: classes.sourcePlayback, src: sourceUrl, hidden: isLoading, alt: "", onLoad: handleImageLoad })) : isCameraError ? (_jsx(VideocamOffIcon, { fontSize: "large" })) : (_jsx("video", { ref: videoRef, className: classes.sourcePlayback, src: sourceUrl, hidden: isLoading, autoPlay: true, playsInline: true, controls: false, muted: true, loop: true, onLoadedData: handleVideoLoad }))] }));
}
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: (_a = {
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '0px'
            },
            _a[theme.breakpoints.down('xs')] = {
                width: 0,
                overflow: 'hidden',
            },
            _a[theme.breakpoints.up('sm')] = {
                flex: 'none',
                width: '0px',
                borderRightWidth: 1,
                borderRightStyle: 'solid',
                borderRightColor: theme.palette.divider,
            },
            _a),
        sourcePlayback: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    });
});
export default SourceViewer;
