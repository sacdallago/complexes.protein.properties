// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

export default class WebWorker {
    constructor(worker) {
        let code = worker.toString();
        code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

        // TODO: When updating the code in the worker, uncomment the following to make sure the worker... works...
        console.log(code);

        const blob = new Blob([code], { type: "application/javascript" });
        return new Worker(URL.createObjectURL(blob));
    }
}