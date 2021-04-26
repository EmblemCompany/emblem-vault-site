declare module 'react-doka' {
    // @ts-ignore
    import {
        DokaImageEditorOptions,
        DokaImageEditorModalOptions,
        // @ts-ignore
    } from './doka';

    // @ts-ignore
    import React from 'react';

    interface DokaComponentEvents {
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

    interface DokaComponentModalEvents extends DokaComponentEvents {
        onShow?: (detail: any) => void;
        onHide?: (detail: any) => void;
    }

    export class DokaImageEditor extends React.Component<DokaImageEditorOptions, any> {}

    export class DokaImageEditorModal extends React.Component<DokaImageEditorModalOptions, any> {}

    export class DokaImageEditorOverlay extends React.Component<DokaImageEditorOptions, any> {}
}
