var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import BackgroundConfigCard from './core/components/BackgroundConfigCard';
import PostProcessingConfigCard from './core/components/PostProcessingConfigCard';
import SegmentationConfigCard from './core/components/SegmentationConfigCard';
import SourceConfigCard from './core/components/SourceConfigCard';
import ViewerCard from './core/components/ViewerCard';
import { backgroundImageUrls, } from './core/helpers/backgroundHelper';
import { sourceImageUrls } from './core/helpers/sourceHelper';
import useBodyPix from './core/hooks/useBodyPix';
import useTFLite from './core/hooks/useTFLite';
function App() {
    var classes = useStyles();
    var _a = useState({
        type: 'image',
        url: sourceImageUrls[0],
    }), sourceConfig = _a[0], setSourceConfig = _a[1];
    var _b = useState({
        type: 'image',
        url: backgroundImageUrls[0],
    }), backgroundConfig = _b[0], setBackgroundConfig = _b[1];
    var _c = useState({
        model: 'meet',
        backend: 'wasm',
        inputResolution: '160x96',
        pipeline: 'webgl2',
        targetFps: 65,
        deferInputResizing: true,
    }), segmentationConfig = _c[0], setSegmentationConfig = _c[1];
    var _d = useState({
        smoothSegmentationMask: true,
        jointBilateralFilter: { sigmaSpace: 1, sigmaColor: 0.1 },
        coverage: [0.5, 0.75],
        lightWrapping: 0.3,
        blendMode: 'screen',
    }), postProcessingConfig = _d[0], setPostProcessingConfig = _d[1];
    var bodyPix = useBodyPix();
    var _e = useTFLite(segmentationConfig), tflite = _e.tflite, isSIMDSupported = _e.isSIMDSupported;
    useEffect(function () {
        setSegmentationConfig(function (previousSegmentationConfig) {
            if (previousSegmentationConfig.backend === 'wasm' && isSIMDSupported) {
                return __assign(__assign({}, previousSegmentationConfig), { backend: 'wasmSimd' });
            }
            else {
                return previousSegmentationConfig;
            }
        });
    }, [isSIMDSupported]);
    return (_jsxs("div", { className: classes.root, children: [_jsx(ViewerCard, { sourceConfig: sourceConfig, backgroundConfig: backgroundConfig, segmentationConfig: segmentationConfig, postProcessingConfig: postProcessingConfig, bodyPix: bodyPix, tflite: tflite }), _jsx(SourceConfigCard, { config: sourceConfig, onChange: setSourceConfig }), _jsx(BackgroundConfigCard, { config: backgroundConfig, onChange: setBackgroundConfig }), _jsx(SegmentationConfigCard, { config: segmentationConfig, isSIMDSupported: isSIMDSupported, onChange: setSegmentationConfig }), _jsx(PostProcessingConfigCard, { config: postProcessingConfig, pipeline: segmentationConfig.pipeline, onChange: setPostProcessingConfig })] }));
}
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: (_a = {
                display: 'grid'
            },
            _a[theme.breakpoints.up('xs')] = {
                margin: theme.spacing(1),
                gap: theme.spacing(1),
                gridTemplateColumns: '1fr',
            },
            _a[theme.breakpoints.up('md')] = {
                margin: theme.spacing(2),
                gap: theme.spacing(2),
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            _a[theme.breakpoints.up('lg')] = {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            _a),
        resourceSelectionCards: {
            display: 'flex',
            flexDirection: 'column',
        },
    });
});
export default App;
