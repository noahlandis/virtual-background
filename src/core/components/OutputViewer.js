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
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useRenderingPipeline from '../hooks/useRenderingPipeline';
function OutputViewer(props) {
    var _this = this;
    var classes = useStyles();
    // props passed in from parent:
    // sourcePlayback: { video, videoWidth, videoHeight }
    // backgroundConfig: {'image', url}
    // segmentationConfig: {'wasmSimd', deferInputResizing, inputResolution (landscape: 144x256 or square: 256x256), 'meet', 'webgl2', targetFps}
    // bodypix,
    // tflite
    // pipeline: {pipeline, backgroundImageRef, canvasRef, fps, durations}
    // postProcessingConfig: {blendMode: 'screen/linear dodge', coverage [start, end], jointBilateralFilter: {sigmaColor, sigmaSpace}}, lightWrapping: 0-1, smoothSegmentationMask: true/false

    var _a = useRenderingPipeline(props.sourcePlayback, props.backgroundConfig, props.segmentationConfig, props.bodyPix, props.tflite), pipeline = _a.pipeline, backgroundImageRef = _a.backgroundImageRef, canvasRef = _a.canvasRef, fps = _a.fps, _b = _a.durations, resizingDuration = _b[0], inferenceDuration = _b[1], postProcessingDuration = _b[2];
    console.log(pipeline);
    useEffect(function () {
        if (pipeline) {
            pipeline.updatePostProcessingConfig(props.postProcessingConfig);
        }
    }, [pipeline, props.postProcessingConfig]);
    useEffect(function () {
        var peerConnection = new RTCPeerConnection();
        var signalingChannel = new BroadcastChannel('signaling-channel');
        var localStream = canvasRef.current.captureStream();
        localStream.getTracks().forEach(function (track) {
            peerConnection.addTrack(track, localStream);
        });
        peerConnection.onicecandidate = function (event) {
            if (event.candidate) {
                console.log('Sending callee ICE candidate');
                signalingChannel.postMessage(JSON.stringify({ iceCandidate: event.candidate }));
            }
        };
        signalingChannel.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var message, remoteDesc, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = JSON.parse(event.data);
                        if (!message.offer) return [3, 4];
                        console.log('Received offer');
                        remoteDesc = new RTCSessionDescription(message.offer);
                        return [4, peerConnection.setRemoteDescription(remoteDesc)];
                    case 1:
                        _a.sent();
                        console.log('Sending answer');
                        return [4, peerConnection.createAnswer()];
                    case 2:
                        answer = _a.sent();
                        return [4, peerConnection.setLocalDescription(answer)];
                    case 3:
                        _a.sent();
                        signalingChannel.postMessage(JSON.stringify({ answer: answer }));
                        return [3, 6];
                    case 4:
                        if (!message.iceCandidate) return [3, 6];
                        console.log('Received caller ICE candidate');
                        return [4, peerConnection.addIceCandidate(message.iceCandidate)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        }); };
        return function () {
            peerConnection.close();
            signalingChannel.close();
        };
    }, [canvasRef]);
    var statDetails = [
        "resizing ".concat(resizingDuration, "ms"),
        "inference ".concat(inferenceDuration, "ms"),
        "post-processing ".concat(postProcessingDuration, "ms"),
    ];
    var stats = "".concat(Math.round(fps), " fps (").concat(statDetails.join(', '), ")");
    return (_jsxs("div", { className: classes.root, children: [props.backgroundConfig.type === 'image' && (_jsx("img", { ref: backgroundImageRef, className: classes.render, src: props.backgroundConfig.url, alt: "", hidden: props.segmentationConfig.pipeline === 'webgl2' })), _jsx("canvas", { ref: canvasRef, className: classes.render, width: props.sourcePlayback.width, height: props.sourcePlayback.height }, props.segmentationConfig.pipeline), _jsx(Typography, { className: classes.stats, variant: "caption", children: stats })] }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            flex: 1,
            position: 'relative',
        },
        render: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        stats: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.48)',
            color: theme.palette.common.white,
        },
    });
});
export default OutputViewer;
