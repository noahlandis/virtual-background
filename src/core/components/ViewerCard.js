import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import OutputViewer from './OutputViewer';
import SourceViewer from './SourceViewer';
function ViewerCard(props) {
    var classes = useStyles();
    var _a = useState(), sourcePlayback = _a[0], setSourcePlayback = _a[1];
    useEffect(function () {
        setSourcePlayback(undefined);
    }, [props.sourceConfig]);
    return (_jsxs(Paper, { className: classes.root, children: [_jsx(SourceViewer, { sourceConfig: props.sourceConfig, onLoad: setSourcePlayback, style: { width: '0px' } }), sourcePlayback && props.bodyPix && props.tflite ? (_jsx(OutputViewer, { sourcePlayback: sourcePlayback, backgroundConfig: props.backgroundConfig, segmentationConfig: props.segmentationConfig, postProcessingConfig: props.postProcessingConfig, bodyPix: props.bodyPix, tflite: props.tflite })) : (_jsx("div", { className: classes.noOutput, children: _jsx(Avatar, { className: classes.avatar }) }))] }));
}
var useStyles = makeStyles(function (theme) {
    var _a;
    var minHeight = ["".concat(theme.spacing(52), "px"), "100vh - ".concat(theme.spacing(2), "px")];
    return createStyles({
        root: (_a = {
                minHeight: "calc(min(".concat(minHeight.join(', '), "))"),
                display: 'flex',
                overflow: 'hidden'
            },
            _a[theme.breakpoints.up('md')] = {
                gridColumnStart: 1,
                gridColumnEnd: 3,
            },
            _a[theme.breakpoints.up('lg')] = {
                gridRowStart: 1,
                gridRowEnd: 3,
            },
            _a),
        noOutput: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatar: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },
    });
});
export default ViewerCard;
