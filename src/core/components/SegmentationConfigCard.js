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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
function SegmentationConfigCard(props) {
    var classes = useStyles();
    function handleModelChange(event) {
        var model = event.target.value;
        var backend = props.config.backend;
        var inputResolution = props.config.inputResolution;
        var pipeline = props.config.pipeline;
        switch (model) {
            case 'bodyPix':
                backend = 'webgl';
                inputResolution = '640x360';
                pipeline = 'canvas2dCpu';
                break;
            case 'meet':
                if ((backend !== 'wasm' && backend !== 'wasmSimd') ||
                    (inputResolution !== '256x144' && inputResolution !== '160x96')) {
                    backend = props.isSIMDSupported ? 'wasmSimd' : 'wasm';
                    inputResolution = '160x96';
                    pipeline = 'webgl2';
                }
                break;
            case 'mlkit':
                if ((backend !== 'wasm' && backend !== 'wasmSimd') ||
                    inputResolution !== '256x256') {
                    backend = props.isSIMDSupported ? 'wasmSimd' : 'wasm';
                    inputResolution = '256x256';
                    pipeline = 'webgl2';
                }
                break;
        }
        props.onChange(__assign(__assign({}, props.config), { model: model, backend: backend, inputResolution: inputResolution, pipeline: pipeline }));
    }
    function handleBackendChange(event) {
        props.onChange(__assign(__assign({}, props.config), { backend: event.target.value }));
    }
    function handleInputResolutionChange(event) {
        props.onChange(__assign(__assign({}, props.config), { inputResolution: event.target.value }));
    }
    function handlePipelineChange(event) {
        props.onChange(__assign(__assign({}, props.config), { pipeline: event.target.value }));
    }
    function handleTargetFpsChange(event) {
        props.onChange(__assign(__assign({}, props.config), { targetFps: parseInt(event.target.value) }));
    }
    function handleDeferInputResizingChange(event) {
        props.onChange(__assign(__assign({}, props.config), { deferInputResizing: event.target.checked }));
    }
    return (_jsx(Card, { className: classes.root, children: _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", children: "Segmentation" }), _jsxs("div", { className: classes.formControls, children: [_jsxs(FormControl, { className: classes.formControl, variant: "outlined", children: [_jsx(InputLabel, { children: "Model" }), _jsxs(Select, { label: "Model", value: props.config.model, onChange: handleModelChange, children: [_jsx(MenuItem, { value: "meet", children: "Meet" }), _jsx(MenuItem, { value: "mlkit", children: "ML Kit" }), _jsx(MenuItem, { value: "bodyPix", children: "BodyPix" })] })] }), _jsxs(FormControl, { className: classes.formControl, variant: "outlined", children: [_jsx(InputLabel, { children: "Backend" }), _jsxs(Select, { label: "Backend", value: props.config.backend, onChange: handleBackendChange, children: [_jsx(MenuItem, { value: "wasm", disabled: props.config.model === 'bodyPix', children: "WebAssembly" }), _jsx(MenuItem, { value: "wasmSimd", disabled: props.config.model === 'bodyPix' || !props.isSIMDSupported, children: "WebAssembly SIMD" }), _jsx(MenuItem, { value: "webgl", disabled: props.config.model !== 'bodyPix', children: "WebGL" })] })] }), _jsxs(FormControl, { className: classes.formControl, variant: "outlined", children: [_jsx(InputLabel, { children: "Input resolution" }), _jsxs(Select, { label: "Input resolution", value: props.config.inputResolution, onChange: handleInputResolutionChange, children: [_jsx(MenuItem, { value: "640x360", disabled: props.config.model !== 'bodyPix', children: "640x360" }), _jsx(MenuItem, { value: "256x256", disabled: props.config.model !== 'mlkit', children: "256x256" }), _jsx(MenuItem, { value: "256x144", disabled: props.config.model !== 'meet', children: "256x144" }), _jsx(MenuItem, { value: "160x96", disabled: props.config.model !== 'meet', children: "160x96" })] })] }), _jsxs(FormControl, { className: classes.formControl, variant: "outlined", children: [_jsx(InputLabel, { children: "Pipeline" }), _jsxs(Select, { label: "Pipeline", value: props.config.pipeline, onChange: handlePipelineChange, children: [_jsx(MenuItem, { value: "webgl2", disabled: props.config.model === 'bodyPix', children: "WebGL 2" }), _jsx(MenuItem, { value: "canvas2dCpu", children: "Canvas 2D + CPU" })] })] }), props.config.pipeline === 'webgl2' && (_jsxs(_Fragment, { children: [_jsx(TextField, { className: classes.formControl, label: "Target fps", type: "number", variant: "outlined", value: props.config.targetFps, onChange: handleTargetFpsChange }), _jsx(FormControlLabel, { className: classes.formControl, label: "Defer input resizing", control: _jsx(Switch, { checked: props.config.deferInputResizing, onChange: handleDeferInputResizingChange, color: "primary" }) })] }))] })] }) }));
}
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: (_a = {},
            _a[theme.breakpoints.only('md')] = {
                gridColumnStart: 2,
                gridRowStart: 2,
            },
            _a),
        formControls: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(2),
            minWidth: 200,
            flex: 1,
        },
    });
});
export default SegmentationConfigCard;
