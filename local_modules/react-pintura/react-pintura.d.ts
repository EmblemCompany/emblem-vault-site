declare module 'react-pintura' {
    import {
        PinturaEditorDefaultOptions,
        PinturaEditorModalOptions,
        // @ts-ignore
    } from 'pintura';

    // @ts-ignore
    import * as React from 'react';

    interface PinturaComponentEvents {
        onLoadstart?: (detail: any) => void;
        onLoadabort?: (detail: any) => void;
        onLoaderror?: (detail: any) => void;
        onLoadprogress?: (detail: any) => void;
        onLoad?: (detail: any) => void;
        onProcessstart?: (detail: any) => void;
        onProcessabort?: (detail: any) => void;
        onProcesserror?: (detail: any) => void;
        onProcessprogress?: (detail: any) => void;
        onProcess?: (detail: any) => void;
        onLoadpreview?: (detail: any) => void;
        onReady?: (detail: any) => void;
        onUpdate?: (detail: any) => void;
        onUndo?: (detail: any) => void;
        onRedo?: (detail: any) => void;
        onRevert?: (detail: any) => void;
        onClose?: (detail: any) => void;
        onDestroy?: (detail: any) => void;
        onAddshape?: (detail: any) => void;
        onSelectshape?: (detail: any) => void;
        onUpdateshape?: (detail: any) => void;
        onRemoveshape?: (detail: any) => void;
    }

    interface PinturaComponentModalEvents extends PinturaComponentEvents {
        onShow?: (detail: any) => void;
        onHide?: (detail: any) => void;
    }

    export class PinturaEditor extends React.Component<
        PinturaEditorDefaultOptions & PinturaComponentEvents & { className?: string },
        any
    > {}

    export class PinturaEditorModal extends React.Component<
        PinturaEditorDefaultOptions & PinturaEditorModalOptions & PinturaComponentModalEvents,
        { className?: string },
        any
    > {}

    export class PinturaEditorOverlay extends React.Component<
        PinturaEditorDefaultOptions & PinturaComponentEvents & { className?: string },
        any
    > {}
}
