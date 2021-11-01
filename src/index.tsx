import { createElement, patch,VElement} from 'million';

export default class App {
    constructor(targetId:string) {
        const Example = (props:any):VElement => <p>{props.children}</p>
        const root = document.getElementById(targetId);
        const app = createElement(<Example>Goodbye world</Example>);
        setTimeout(() => {
            patch(app, <Example>Hello world</Example>)
        }, 1000);

        if (root) {
            root.appendChild(app);
        }
    }
}