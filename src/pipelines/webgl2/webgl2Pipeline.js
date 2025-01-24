var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { inputResolutions, } from '../../core/helpers/segmentationHelper';
import { compileShader, createTexture, glsl } from '../helpers/webglHelper';
import { buildBackgroundBlurStage, } from './backgroundBlurStage';
import { buildBackgroundImageStage, } from './backgroundImageStage';
import { buildJointBilateralFilterStage } from './jointBilateralFilterStage';
import { buildLoadSegmentationStage } from './loadSegmentationStage';
import { buildResizingStage } from './resizingStage';
import { buildSoftmaxStage } from './softmaxStage';
export function buildWebGL2Pipeline(sourcePlayback, backgroundImage, backgroundConfig, segmentationConfig, canvas, tflite, timerWorker, addFrameEvent) {
    var vertexShaderSource = glsl(templateObject_1 || (templateObject_1 = __makeTemplateObject(["#version 300 es\n\n    in vec2 a_position;\n    in vec2 a_texCoord;\n\n    out vec2 v_texCoord;\n\n    void main() {\n      gl_Position = vec4(a_position, 0.0, 1.0);\n      v_texCoord = a_texCoord;\n    }\n  "], ["#version 300 es\n\n    in vec2 a_position;\n    in vec2 a_texCoord;\n\n    out vec2 v_texCoord;\n\n    void main() {\n      gl_Position = vec4(a_position, 0.0, 1.0);\n      v_texCoord = a_texCoord;\n    }\n  "])));
    var frameWidth = sourcePlayback.width, frameHeight = sourcePlayback.height;
    var _a = inputResolutions[segmentationConfig.inputResolution], segmentationWidth = _a[0], segmentationHeight = _a[1];
    var gl = canvas.getContext('webgl2');
    var vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW);
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]), gl.STATIC_DRAW);
    var inputFrameTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    var segmentationTexture = createTexture(gl, gl.RGBA8, segmentationWidth, segmentationHeight);
    var personMaskTexture = createTexture(gl, gl.RGBA8, frameWidth, frameHeight);
    var resizingStage = buildResizingStage(timerWorker, gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, tflite);
    var loadSegmentationStage = segmentationConfig.model === 'meet'
        ? buildSoftmaxStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, tflite, segmentationTexture)
        : buildLoadSegmentationStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, tflite, segmentationTexture);
    var jointBilateralFilterStage = buildJointBilateralFilterStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationTexture, segmentationConfig, personMaskTexture, canvas);
    var backgroundStage = backgroundConfig.type === 'blur'
        ? buildBackgroundBlurStage(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, canvas)
        : buildBackgroundImageStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, backgroundImage, canvas);
    function render() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourcePlayback.htmlElement);
                        gl.bindVertexArray(vertexArray);
                        return [4, resizingStage.render()];
                    case 1:
                        _a.sent();
                        addFrameEvent();
                        tflite._runInference();
                        addFrameEvent();
                        loadSegmentationStage.render();
                        jointBilateralFilterStage.render();
                        backgroundStage.render();
                        return [2];
                }
            });
        });
    }
    function updatePostProcessingConfig(postProcessingConfig) {
        jointBilateralFilterStage.updateSigmaSpace(postProcessingConfig.jointBilateralFilter.sigmaSpace);
        jointBilateralFilterStage.updateSigmaColor(postProcessingConfig.jointBilateralFilter.sigmaColor);
        if (backgroundConfig.type === 'image') {
            var backgroundImageStage = backgroundStage;
            backgroundImageStage.updateCoverage(postProcessingConfig.coverage);
            backgroundImageStage.updateLightWrapping(postProcessingConfig.lightWrapping);
            backgroundImageStage.updateBlendMode(postProcessingConfig.blendMode);
        }
        else if (backgroundConfig.type === 'blur') {
            var backgroundBlurStage = backgroundStage;
            backgroundBlurStage.updateCoverage(postProcessingConfig.coverage);
        }
        else {
            var backgroundImageStage = backgroundStage;
            backgroundImageStage.updateCoverage([0, 0.9999]);
            backgroundImageStage.updateLightWrapping(0);
        }
    }
    function cleanUp() {
        backgroundStage.cleanUp();
        jointBilateralFilterStage.cleanUp();
        loadSegmentationStage.cleanUp();
        resizingStage.cleanUp();
        gl.deleteTexture(personMaskTexture);
        gl.deleteTexture(segmentationTexture);
        gl.deleteTexture(inputFrameTexture);
        gl.deleteBuffer(texCoordBuffer);
        gl.deleteBuffer(positionBuffer);
        gl.deleteVertexArray(vertexArray);
        gl.deleteShader(vertexShader);
    }
    return { render: render, updatePostProcessingConfig: updatePostProcessingConfig, cleanUp: cleanUp };
}
var templateObject_1;
