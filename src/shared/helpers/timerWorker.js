var timeoutIds = new Map();
self.onmessage = function (event) {
    if (event.data.timeoutMs !== undefined) {
        var timeoutId = self.setTimeout(function () {
            self.postMessage({ callbackId: event.data.callbackId });
            timeoutIds.delete(event.data.callbackId);
        }, event.data.timeoutMs);
        timeoutIds.set(event.data.callbackId, timeoutId);
    }
    else {
        var timeoutId = timeoutIds.get(event.data.callbackId);
        self.clearTimeout(timeoutId);
        timeoutIds.delete(event.data.callbackId);
    }
};
export {};
