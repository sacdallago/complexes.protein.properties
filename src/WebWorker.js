// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

export default class WebWorker {
    constructor(worker) {
        // let code = worker.toString();
        // code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

        // TODO: When updating the code in the worker, paste in the contentent of console.log(code) below!

        const blob = new Blob([`
        var onmessage = function onmessage(e) {
            // eslint-disable-line no-unused-vars
            // Write your code here...
            var _e$data = e.data,
                executable = _e$data.executable;
    
            postMessage(executable());
        };
        `], { type: "application/javascript" });
        return new Worker(URL.createObjectURL(blob));
    }
}