export function createTimerWorker() {
    var callbacks = new Map();
    var worker = new Worker(new URL('./timerWorker', import.meta.url));
    worker.onmessage = function (event) {
        var callback = callbacks.get(event.data.callbackId);
        if (!callback) {
            return;
        }
        callbacks.delete(event.data.callbackId);
        callback();
    };
    var nextCallbackId = 1;
    function setTimeout(callback, timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = 0; }
        var callbackId = nextCallbackId++;
        callbacks.set(callbackId, callback);
        worker.postMessage({ callbackId: callbackId, timeoutMs: timeoutMs });
        return callbackId;
    }
    function clearTimeout(callbackId) {
        if (!callbacks.has(callbackId)) {
            return;
        }
        worker.postMessage({ callbackId: callbackId });
        callbacks.delete(callbackId);
    }
    function terminate() {
        callbacks.clear();
        worker.terminate();
    }
    return { setTimeout: setTimeout, clearTimeout: clearTimeout, terminate: terminate };
}
