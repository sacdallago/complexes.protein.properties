// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

// MyWorker.js

// @args: You can pass your worker parameters on initialisation
export default function Executer(args) {
    let onmessage = e => {
        // eslint-disable-line no-unused-vars
        // Write your code here...
        let { executable } = e.data;

        postMessage(executable());
    };
}