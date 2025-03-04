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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
function Viewer() {
    var _this = this;
    var video = useRef(null);
    useEffect(function () {
        var peerConnection = new RTCPeerConnection();
        var signalingChannel = new BroadcastChannel('signaling-channel');
        peerConnection.ontrack = function (event) {
            var remoteStream = event.streams[0];
            video.current.srcObject = remoteStream;
        };
        peerConnection.onicecandidate = function (event) {
            if (event.candidate) {
                console.log('Sending caller ICE candidate');
                signalingChannel.postMessage(JSON.stringify({ iceCandidate: event.candidate }));
            }
        };
        signalingChannel.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var message, remoteDesc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = JSON.parse(event.data);
                        if (!message.answer) return [3, 2];
                        console.log('Received answer');
                        remoteDesc = new RTCSessionDescription(message.answer);
                        return [4, peerConnection.setRemoteDescription(remoteDesc)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!message.iceCandidate) return [3, 4];
                        console.log('Received callee ICE candidate');
                        return [4, peerConnection.addIceCandidate(message.iceCandidate)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        }); };
        var sendOffer = function () { return __awaiter(_this, void 0, void 0, function () {
            var offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Sending offer');
                        return [4, peerConnection.createOffer({
                                offerToReceiveVideo: true,
                            })];
                    case 1:
                        offer = _a.sent();
                        return [4, peerConnection.setLocalDescription(offer)];
                    case 2:
                        _a.sent();
                        signalingChannel.postMessage(JSON.stringify({ offer: offer }));
                        return [2];
                }
            });
        }); };
        sendOffer();
        return function () {
            peerConnection.close();
            signalingChannel.close();
        };
    }, []);
    return _jsx("video", { ref: video, autoPlay: true, playsInline: true, controls: false, muted: true });
}
export default Viewer;
