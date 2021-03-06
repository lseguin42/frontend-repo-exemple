import * as React from "react";
import * as ReactWebComponent from "react-web-component";
import { HelloWorld } from "./hello-world.component";

declare global {
    interface HTMLElementTagNameMap {
        'react-app-1': HTMLElement
    }
}

(ReactWebComponent as any).create(<HelloWorld />, 'react-app-1');