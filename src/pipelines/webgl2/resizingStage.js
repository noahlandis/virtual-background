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
import { compileShader, createPiplelineStageProgram, createTexture, glsl, readPixelsAsync, } from '../helpers/webglHelper';
export function buildResizingStage(timerWorker, gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, tflite) {
    var fragmentShaderSource = glsl(templateObject_1 || (templateObject_1 = __makeTemplateObject(["#version 300 es\n\n    precision highp float;\n\n    uniform sampler2D u_inputFrame;\n\n    in vec2 v_texCoord;\n\n    out vec4 outColor;\n\n    void main() {\n      outColor = texture(u_inputFrame, v_texCoord);\n    }\n  "], ["#version 300 es\n\n    precision highp float;\n\n    uniform sampler2D u_inputFrame;\n\n    in vec2 v_texCoord;\n\n    out vec4 outColor;\n\n    void main() {\n      outColor = texture(u_inputFrame, v_texCoord);\n    }\n  "])));
    var tfliteInputMemoryOffset = tflite._getInputMemoryOffset() / 4;
    var _a = inputResolutions[segmentationConfig.inputResolution], outputWidth = _a[0], outputHeight = _a[1];
    var outputPixelCount = outputWidth * outputHeight;
    var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var program = createPiplelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
    var inputFrameLocation = gl.getUniformLocation(program, 'u_inputFrame');
    var outputTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
    var frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
    var outputPixels = new Uint8Array(outputPixelCount * 4);
    gl.useProgram(program);
    gl.uniform1i(inputFrameLocation, 0);
    function render() {
        return __awaiter(this, void 0, void 0, function () {
            var readPixelsPromise, i, tfliteIndex, outputIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gl.viewport(0, 0, outputWidth, outputHeight);
                        gl.useProgram(program);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                        readPixelsPromise = readPixelsAsync(timerWorker, gl, 0, 0, outputWidth, outputHeight, gl.RGBA, gl.UNSIGNED_BYTE, outputPixels);
                        if (!segmentationConfig.deferInputResizing) return [3, 1];
                        return [3, 3];
                    case 1: return [4, readPixelsPromise];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        for (i = 0; i < outputPixelCount; i++) {
                            tfliteIndex = tfliteInputMemoryOffset + i * 3;
                            outputIndex = i * 4;
                            tflite.HEAPF32[tfliteIndex] = outputPixels[outputIndex] / 255;
                            tflite.HEAPF32[tfliteIndex + 1] = outputPixels[outputIndex + 1] / 255;
                            tflite.HEAPF32[tfliteIndex + 2] = outputPixels[outputIndex + 2] / 255;
                        }
                        return [2];
                }
            });
        });
    }
    function cleanUp() {
        gl.deleteFramebuffer(frameBuffer);
        gl.deleteTexture(outputTexture);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
    }
    return { render: render, cleanUp: cleanUp };
}
var templateObject_1;
