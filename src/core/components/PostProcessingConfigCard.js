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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';
function PostProcessingConfigCard(props) {
    var classes = useStyles();
    function handleSmoothSegmentationMaskChange(event) {
        props.onChange(__assign(__assign({}, props.config), { smoothSegmentationMask: event.target.checked }));
    }
    function handleSigmaSpaceChange(_event, value) {
        props.onChange(__assign(__assign({}, props.config), { jointBilateralFilter: __assign(__assign({}, props.config.jointBilateralFilter), { sigmaSpace: value }) }));
    }
    function handleSigmaColorChange(_event, value) {
        props.onChange(__assign(__assign({}, props.config), { jointBilateralFilter: __assign(__assign({}, props.config.jointBilateralFilter), { sigmaColor: value }) }));
    }
    function handleCoverageChange(_event, value) {
        props.onChange(__assign(__assign({}, props.config), { coverage: value }));
    }
    function handleLightWrappingChange(_event, value) {
        props.onChange(__assign(__assign({}, props.config), { lightWrapping: value }));
    }
    function handleBlendModeChange(event) {
        props.onChange(__assign(__assign({}, props.config), { blendMode: event.target.value }));
    }
    return (_jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h6", component: "h2", children: "Post-processing" }), props.pipeline === 'webgl2' ? (_jsxs(React.Fragment, { children: [_jsx(Typography, { gutterBottom: true, children: "Joint bilateral filter" }), _jsx(Typography, { variant: "body2", children: "Sigma space" }), _jsx(Slider, { value: props.config.jointBilateralFilter.sigmaSpace, min: 0, max: 10, step: 0.1, valueLabelDisplay: "auto", onChange: handleSigmaSpaceChange }), _jsx(Typography, { variant: "body2", children: "Sigma color" }), _jsx(Slider, { value: props.config.jointBilateralFilter.sigmaColor, min: 0, max: 1, step: 0.01, valueLabelDisplay: "auto", onChange: handleSigmaColorChange }), _jsx(Typography, { gutterBottom: true, children: "Background" }), _jsx(Typography, { variant: "body2", children: "Coverage" }), _jsx(Slider, { value: props.config.coverage, min: 0, max: 1, step: 0.01, valueLabelDisplay: "auto", onChange: handleCoverageChange }), _jsx(Typography, { variant: "body2", gutterBottom: true, children: "Light wrapping" }), _jsxs("div", { className: classes.lightWrapping, children: [_jsxs(FormControl, { className: classes.formControl, variant: "outlined", children: [_jsx(InputLabel, { children: "Blend mode" }), _jsxs(Select, { label: "Blend mode", value: props.config.blendMode, onChange: handleBlendModeChange, children: [_jsx(MenuItem, { value: "screen", children: "Screen" }), _jsx(MenuItem, { value: "linearDodge", children: "Linear dodge" })] })] }), _jsx(Slider, { value: props.config.lightWrapping, min: 0, max: 1, step: 0.01, valueLabelDisplay: "auto", onChange: handleLightWrappingChange })] })] })) : (_jsx(FormControlLabel, { label: "Smooth segmentation mask", control: _jsx(Switch, { color: "primary", checked: props.config.smoothSegmentationMask, onChange: handleSmoothSegmentationMaskChange }) }))] }) }));
}
var useStyles = makeStyles(function (theme) {
    return createStyles({
        lightWrapping: {
            display: 'flex',
            alignItems: 'center',
        },
        formControl: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(2),
            minWidth: 160,
        },
    });
});
export default PostProcessingConfigCard;
