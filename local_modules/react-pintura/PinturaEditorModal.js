import React from 'react';

import { openEditor } from 'pintura';
import { sub, unsub } from './events';

class PinturaEditorModal extends React.Component {
    constructor(props) {
        super(props);
        this.editor = undefined;

        // We'll wrap the module in a container so we can use the container as a CSS module target
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // add the container
        document.body.appendChild(this.el);
        this.el.className = this.props.className;

        // create editor and proxy events
        const props = { ...this.props };
        this.editor = openEditor(props, this.el);
        sub(this, props);
    }

    componentDidUpdate() {
        const props = { ...this.props };
        Object.assign(this.editor, props);
        sub(this, props);
    }

    componentWillUnmount() {
        // remove our modal container
        document.body.removeChild(this.el);
        if (!this.editor) return;
        unsub(this);
        this.editor = undefined;
    }

    show() {
        this.editor.show();
    }

    hide() {
        this.editor.hide();
    }

    render() {
        return null;
    }
}

export default PinturaEditorModal;
