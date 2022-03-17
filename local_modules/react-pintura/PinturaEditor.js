import React from 'react';

import { appendEditor } from 'pintura';
import { sub, unsub } from './events';

class PinturaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.elementRef = React.createRef();
        this.editor = undefined;
    }

    componentDidMount() {
        if (!this.elementRef.current) return;
        const props = { ...this.props };
        this.editor = appendEditor(this.elementRef.current, props);
        sub(this, props);
    }

    componentDidUpdate() {
        const props = { ...this.props };
        Object.assign(this.editor, props);
        sub(this, props);
    }

    componentWillUnmount() {
        if (!this.editor) return;
        unsub(this);
        this.editor.destroy();
        this.editor = undefined;
    }

    render() {
        return React.createElement('div', {
            className: `PinturaRootWrapper ${this.props.className}`.trim(),
            ref: this.elementRef,
        });
    }
}

export default PinturaEditor;
