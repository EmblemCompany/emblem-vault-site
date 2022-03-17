/* eslint-disable @typescript-eslint/no-explicit-any */
type ProgressCallback = (event: ProgressEvent) => void;

type Percentage = string;

interface PinturaMetadata {
    [key: string]: any;
}

// prettier-ignore
/**
 * A matrix of 20 digits based on the SVG <feColorMatrix> filter
 *
 * @example
 * ```
 *     R G B A W
 * R | 1 0 0 0 0
 * G | 0 1 0 0 0
 * B | 0 0 1 0 0
 * A | 0 0 0 1 0
 * ```
 * @link Utility to generate a color matrix: https://fecolormatrix.com
 * @link More information on color matrices: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix
 */
type ColorMatrix = [
    number, number, number, number, number,
    number, number, number, number, number, 
    number, number, number, number, number, 
    number, number, number, number, number
];

// prettier-ignore
/**
 * A matrix of 9 digits based on the SVG <feConvolveMatrix> filter
 *
 * @example
 * ```
 * 1 0 0
 * 0 1 0
 * 0 0 1
 * ```
 * @link More information on convolution matrices: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix
 */
type ConvolutionMatrix = [
    number, number, number, 
    number, number, number, 
    number, number, number
];

type Color = number[];

type TextAlign = 'left' | 'center' | 'right';

type TextLayout = 'auto-width' | 'auto-height' | 'fixed-size';

type SizeCategory =
    | 'extraSmall'
    | 'small'
    | 'mediumSmall'
    | 'medium'
    | 'mediumLarge'
    | 'large'
    | 'extraLarge';

type LineEndStyle =
    | 'bar'
    | 'arrow'
    | 'arrowSolid'
    | 'circle'
    | 'circleSolid'
    | 'square'
    | 'squareSolid';

interface ColorPalette {
    transparent?: Color;
    white?: Color;
    silver?: Color;
    gray?: Color;
    black?: Color;
    navy?: Color;
    blue?: Color;
    aqua?: Color;
    teal?: Color;
    olive?: Color;
    green?: Color;
    yellow?: Color;
    orange?: Color;
    red?: Color;
    maroon?: Color;
    fuchsia?: Color;
    purple?: Color;
}

type SizeCategories = Record<SizeCategory, Percentage | number>;

interface LocaleCollection {
    [shapeProperty: string]: string;
}

type LocaleString = string | ((locale: LocaleCollection) => string);

interface Vector {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ShapeToolOptions {
    position?: string;
}

interface ShapeRectangle {
    x?: number | Percentage;
    y?: number | Percentage;
    width?: number | Percentage;
    height?: number | Percentage;
}

interface Shape {
    x?: number | Percentage;
    y?: number | Percentage;
    width?: number | Percentage;
    height?: number | Percentage;
    left?: number | Percentage;
    top?: number | Percentage;
    right?: number | Percentage;
    bottom?: number | Percentage;
    rx?: number | Percentage;
    ry?: number | Percentage;
    x1?: number | Percentage;
    y1?: number | Percentage;
    x2?: number | Percentage;
    y2?: number | Percentage;
    x3?: number | Percentage;
    y3?: number | Percentage;
    strokeColor?: Color;
    strokeWidth?: number | Percentage;
    cornerRadius?: number | Percentage;
    fontSize?: number | Percentage;
    fontFamily?: string;
    lineHeight?: number | Percentage;
    textAlign?: undefined | 'left' | 'center' | 'right';
    text?: string;
    aspectRatio?: number;
    rotation?: number;
    points?: Vector[];
    color?: Color;
    backgroundColor?: Color;
    eraseRadius?: number;
    lineStart?:
        | undefined
        | 'bar'
        | 'arrow'
        | 'arrow-solid'
        | 'square'
        | 'square-solid'
        | 'circle'
        | 'circle-solid';
    lineEnd?:
        | undefined
        | 'bar'
        | 'arrow'
        | 'arrow-solid'
        | 'square'
        | 'square-solid'
        | 'circle'
        | 'circle-solid';
    isSelected?: boolean;
    isEditing?: boolean;
    disableStyle?: boolean | string[];
    disableErase?: boolean;
    disableSelect?: boolean;
    disableRemove?: boolean;
    disableDuplicate?: boolean;
    disableReorder?: boolean;
    disableFlip?: boolean;
    disableInput?: boolean | ((text: string) => string);
    disableManipulate?: boolean;
    disableMove?: boolean;
    disableResize?: boolean;
    disableRotate?: boolean;
    disableTextLayout?: boolean | TextLayout[];

    // private
    readonly _context?: Rect | Size;
    readonly _isDraft?: boolean;
    readonly _isComplete?: boolean;
    readonly _isError?: boolean;
    readonly _isLoading?: boolean;
    readonly _isFormatted?: boolean;
}

type SvelteComponent = any;
type SvelteComponentProps = any;

type ShapeControl = [
    // Component to use
    SvelteComponent,

    // Component properties to map
    {
        title?: LocaleString;
        label?: LocaleString;
        options?: SvelteComponentProps;
        optionIconStyle?: LocaleString;
        optionLabelStyle?: LocaleString;
    }
];

type ShapeColorOption = [Color, string] | [Color, string, any];
type ShapeSizeOption = [number | Percentage, string] | [number | Percentage, string, any];

type ShapeLineEndOption = [LineEndStyle, string] | [LineEndStyle, string, any];
type ShapeFontFamilyOption = [string, string] | [string, string, any];
type ShapeFontStyleOption = [string, string] | [string, string, any];

interface ShapeControlOptions {
    colorOptions?: false | ShapeColorOption[];
    lineEndStyleOptions?: false | ShapeLineEndOption[];
    fontFamilyOptions?: false | ShapeFontFamilyOption[];
    fontStyleOptions?: false | ShapeFontStyleOption[];
    textAlignOptions?: false | [TextAlign, string][];
    strokeWidthOptions?: false | ShapeSizeOption[] | number[];
    fontSizeOptions?: false | ShapeSizeOption[] | number[];
    lineHeightOptions?: false | ShapeSizeOption[] | number[];
}

interface ShapeControlConfiguration {
    // A mapping of a shapeProperty to a Component
    [shapeProperty: string]: ShapeControl;
}

type StickerSrc = string; // emoji or URL

interface StickerTemplate {
    thumb?: StickerSrc;
    src?: StickerSrc;
    width?: number;
    height?: number;
    alt?: string;
    disabled?: boolean;
    shape?: Shape;
    mount?: (
        element: HTMLElement,
        sticker: StickerTemplate
    ) => { update?: (sticker: StickerTemplate) => void; destroy?: () => void };
}

type Sticker = StickerSrc | StickerTemplate;

interface StickerGroupOptions {
    icon?: string;
    hideLabel?: boolean;
    disabled?: boolean;
}

type StickerGroup = [string, Sticker[]] | [string, Sticker[], StickerGroupOptions];

type ImageSource = File | Blob | string | HTMLImageElement | HTMLCanvasElement;

interface Store {
    subscribe: (value: (value: any) => void) => () => void;
    set?: (value: any) => void;
    update?: (fn: (value: any) => any) => void;
}

interface StoreCollection {
    [shapeProperty: string]: Store;
}

type Filter = () => ColorMatrix;

interface Frame {
    shape: any;
    thumb: string; // HTML or SVG
}

interface Effect {
    base: number;
    min: number;
    max: number;
    getLabel?: (value: number) => number;
    getStore: (stores: StoreCollection) => Store;
    getValue: (store: Store) => number;
    setValue: (store: Store, value: number) => void;
}

interface EditorHistory {
    undo: () => number;
    redo: () => number;
    revert: () => void;
    write: (imageState?: any) => void;
    get: () => any[];
    getCollapsed: () => any[];
    set: (imageStates: any[]) => void;
    readonly length: number;
    readonly index: number;
}

interface EditorMethods {
    on: (event: string, cb: (detail?: any) => void) => void;
    loadImage: (
        src: ImageSource,
        options: ImageOptions
    ) => Promise<PinturaDefaultImageReaderResult>;
    editImage: (
        src: ImageSource,
        options: ImageOptions
    ) => Promise<PinturaDefaultImageWriterResult>;
    processImage: () => Promise<PinturaDefaultImageWriterResult>;
    abortLoadImage: () => void;
    abortProcessImage: () => void;
    updateImage: (src: ImageSource) => Promise<PinturaDefaultImageReaderResult>;
    updateImagePreview: (src: ImageSource) => void;
    readonly history: EditorHistory;
    close: () => void;
    destroy: () => void;
}

type CropOption = [number | undefined, string];

type SizeOption = [[number, number], string];

type CropPresetOption = CropOption | SizeOption;

type OptionGroup = [string, any[]] | [string, any[], any];

interface CropPluginOptions {
    cropAutoCenterImageSelectionTimeout?: undefined | number;
    cropWillRenderImageSelectionGuides?:
        | undefined
        | ((
              interaction: string,
              interactionFraction: number
          ) => { rows: number; cols: number; opacity: number });
    cropEnableButtonFlipHorizontal?: boolean;
    cropEnableButtonFlipVertical?: boolean;
    cropEnableButtonRotateLeft?: boolean;
    cropEnableButtonRotateRight?: boolean;
    cropEnableButtonToggleCropLimit?: boolean;
    cropEnableCenterImageSelection?: boolean;
    cropEnableImageSelection?: boolean;
    cropEnableInfoIndicator?: boolean;
    cropEnableLimitWheelInputToCropSelection?: boolean;
    cropEnableRotationInput?: boolean;
    cropEnableSelectPreset?: boolean;
    cropEnableZoomInput?: boolean;
    cropEnableZoomMatchImageAspectRatio?: boolean;
    cropEnableZoomTowardsWheelPosition?: boolean;
    cropEnableZoomAutoHide?: boolean;
    cropImageSelectionCornerStyle?: undefined | 'hook' | 'round' | 'invisible';
    cropSelectPresetOptions?: OptionGroup[] | CropPresetOption[];
    cropEnableRotateMatchImageAspectRatio?: 'never' | 'custom' | 'always';
    cropWillRenderTools?: (nodes: PinturaNode[], env: any, redraw: () => void) => PinturaNode[];
}

interface ShapeToolButtonOptions {
    icon?: string;
}

type ShapeTool = [string, LocaleString] | [string, LocaleString, ShapeToolButtonOptions];

interface MarkupEditorPropertier {
    markupEditorToolbar?: [string, LocaleString, any][];
    markupEditorToolStyles?: MarkupEditorToolStyleDefaults;
    markupEditorShapeStyleControls?: MarkupEditorShapeStyleControlDefaults;
    markupEditorToolSelectRadius?: number;
    markupEditorTextInputMode?: 'modal' | 'inline';
}

interface AnnotatePluginOptions extends MarkupEditorPropertier {
    annotateActiveTool?: string;
    annotateEnableButtonFlipVertical?: boolean;
    annotatePresets?: Sticker[] | StickerGroup[];
}

interface DecoratePluginOptions extends MarkupEditorPropertier {
    decorateActiveTool?: string;
    decorateEnableButtonFlipVertical?: boolean;
    decoratePresets?: Sticker[] | StickerGroup[];
}

interface FilterPluginOptions {
    filterFunctions?: { [key: string]: Filter };
    filterOptions?: any;
}

interface FinetunePluginOptions {
    finetuneControlConfiguration?: { [key: string]: Effect };
    finetuneOptions?: [string | undefined, LocaleString];
}

interface ResizePluginOptions {
    resizeMaxSize?: Size;
    resizeMinSize?: Size;
    resizeSizePresetOptions?: OptionGroup[] | SizeOption[];
    resizeWidthPresetOptions?: OptionGroup[] | SizeOption[];
    resizeHeightPresetOptions?: OptionGroup[] | SizeOption[];
    resizeWillRenderFooter?: (nodes: PinturaNode[], env: any, redraw: () => void) => PinturaNode[];
}

interface FramePluginOptions {
    frameStyles?: {
        [key: string]: {
            shape: {
                frameStyle: string;
                [key: string]: any;
            };
            thumb: string;
        };
    };
    frameOptions?: [string | undefined, LocaleString];
}

interface StickerPluginOptions {
    stickers?: Sticker[] | StickerGroup[];
    stickerStickToImage?: boolean;
    stickersEnableButtonFlipVertical?: boolean;
}

interface ImageOptions {
    readonly size: Size;
    readonly aspectRatio: number;
    readonly cropSize: Size;
    readonly cropRectAspectRatio: number;
    readonly file: File;
    readonly loadState: any;
    readonly processState: any;
    readonly rotationRange: [number, number];
    backgroundColor?: Color;
    colorMatrix?: ColorMatrix;
    convolutionMatrix?: ConvolutionMatrix;
    crop?: Rect;
    cropAspectRatio?: number | undefined;
    cropLimitToImage?: boolean;
    cropMaxSize?: Size;
    cropMinSize?: Size;
    redaction?: ShapeRectangle[];
    annotation?: Shape[];
    decoration?: Shape[];
    flipX?: boolean;
    flipY?: boolean;
    gamma?: number;
    noise?: number;
    rotation?: number;
    vignette?: number;
    targetSize?: Size;
    metadata?: PinturaMetadata;
    state?: any;
}

interface EditorImageOptionsReadonly {
    readonly imageSize: Size;
    readonly imageAspectRatio: number;
    readonly imageCropSize: Size;
    readonly imageCropRectAspectRatio: number;
    readonly imageFile: File;
    readonly imageLoadState: any;
    readonly imageProcessState: any;
    readonly imageRotationRange: [number, number];
}

interface EditorImageOptions {
    imageBackgroundColor?: Color;
    imageColorMatrix?: ColorMatrix;
    imageConvolutionMatrix?: ConvolutionMatrix;
    imageCrop?: Rect;
    imageCropAspectRatio?: number | undefined;
    imageCropLimitToImage?: boolean;
    imageCropMaxSize?: Size;
    imageCropMinSize?: Size;
    imageRedaction?: ShapeRectangle[];
    imageAnnotation?: Shape[];
    imageDecoration?: Shape[];
    imageFlipX?: boolean;
    imageFlipY?: boolean;
    imageGamma?: number;
    imageNoise?: number;
    imageRotation?: number;
    imageVignette?: number;
    imageTargetSize?: Size;
    imageFrame?:
        | string
        | {
              [key: string]: any;
              frameStyle: string;
          };
    imageMetadata?: PinturaMetadata;
    imageState?: any;
}

interface EditorOptionsReadonly {
    readonly element?: HTMLElement;
    readonly stores?: any[];
    readonly images?: any;
}

interface PinturaNodeOptions {
    [key: string]: any;
}

type PinturaComponent = 'Button' | 'Dropdown';

type PinturaNodeType = string | SvelteComponent | PinturaComponent;

// ignore for TypeScript 3.x
// @ts-ignore
type PinturaNode =
    | [PinturaNodeType, string]
    | [PinturaNodeType, string, PinturaNodeOptions]
    | [PinturaNodeType, string, PinturaNode[]]
    | [PinturaNodeType, string, PinturaNodeOptions, PinturaNode[]];

type PinturaEditorStatus = string | [string] | [string, number] | [string, false] | undefined;

interface EditorOptions {
    id?: string;
    class?: string;
    animations?: boolean;
    src?: ImageSource;
    util?: string;
    utils?: string[];
    disabled?: boolean;
    status?: PinturaEditorStatus;
    elasticityMultiplier?: number;
    layoutDirectionPreference?: 'auto' | 'horizontal' | 'vertical';
    layoutVerticalUtilsPreference?: 'left' | 'right';
    layoutHorizontalUtilsPreference?: 'bottom' | 'top';
    imageSourceToImageData?: (src: any) => Promise<ImageData>;
    previewImageData?: ImageBitmap | ImageData | HTMLCanvasElement;
    previewImageDataMaxSize?: Size;
    previewUpscale?: boolean;
    shapePreprocessor?: any;
    enableButtonClose?: boolean;
    enableButtonExport?: boolean;
    enableButtonResetHistory?: boolean;
    enableButtonRevert?: boolean;
    enableNavigateHistory?: boolean;
    enableToolbar?: boolean;
    enableUtils?: boolean;
    enableDropImage?: boolean;
    enablePasteImage?: boolean;
    enableMarkupEditorToolSelectToAddShape?: boolean;
    handleEvent?: (type: string, detail: any) => void;
    willRequestResource?: (url: string) => boolean;
    willClose?: () => Promise<boolean>;
    willRevert?: () => Promise<boolean>;
    willProcessImage?: () => Promise<boolean>;
    willRenderCanvas?: (
        shapes: {
            decorationShapes: Shape[];
            annotationShapes: Shape[];
            interfaceShapes: Shape[];
        },
        state: any
    ) => {
        decorationShapes: Shape[];
        annotationShapes: Shape[];
        interfaceShapes: Shape[];
    };
    willSetHistoryInitialState?: (initialState: any) => any;
    willRenderToolbar?: (nodes: PinturaNode[], env: any) => PinturaNode[];
    beforeSelectShape?: (current: Shape | undefined, target: Shape) => boolean;
    beforeDeselectShape?: (current: Shape, target: Shape | undefined) => boolean;
    beforeAddShape?: (shape: Shape) => boolean;
    beforeRemoveShape?: (shape: Shape) => boolean;
    beforeUpdateShape?: (shape: Shape, props: any, context: Rect) => Shape;
    willRenderShapeControls?: (nodes: PinturaNode[], shapeId: string) => PinturaNode[];
    willRenderShapePresetToolbar?: (
        nodes: PinturaNode[],
        addPreset: (sticker: Sticker) => void,
        env: any
    ) => PinturaNode[];
}

interface PinturaEditorOptions
    extends EditorOptions,
        EditorImageOptions,
        AnnotatePluginOptions,
        CropPluginOptions,
        DecoratePluginOptions,
        FilterPluginOptions,
        FinetunePluginOptions,
        StickerPluginOptions {
    locale: any;
    imageReader: any[];
    imageWriter?: any[];
    imageOrienter?: any;
    imageScrambler?: any;
}

interface PinturaEditorDefaultOptions
    extends EditorOptions,
        EditorImageOptions,
        AnnotatePluginOptions,
        CropPluginOptions,
        DecoratePluginOptions,
        FilterPluginOptions,
        FinetunePluginOptions,
        StickerPluginOptions {
    locale?: any;
    imageReader?: any[];
    imageWriter?: any[];
    imageOrienter?: any;
}

interface PinturaEditorHeadlessOptions extends EditorImageOptions {
    imageReader?: any[];
    imageWriter?: any[];
    imageScrambler?: any;
    shapePreprocessor?: any;
}

interface PinturaEditor
    extends EditorMethods,
        PinturaEditorOptions,
        EditorOptionsReadonly,
        EditorImageOptionsReadonly {}

interface PinturaEditorModalOptions {
    preventZoomViewport?: boolean;
    preventScrollBodyIfNeeded?: boolean;
    preventFooterOverlapIfNeeded?: boolean;
    enableAutoHide?: boolean;
    enableAutoDestroy?: boolean;
    readonly modal?: HTMLElement;
}

interface PinturaEditorModal extends PinturaEditor, PinturaEditorModalOptions {
    show: () => void;
    hide: () => void;
}

// Default image reader and writer
interface PinturaDefaultImageReaderResult {
    readonly src: ImageSource;
    readonly dest: File;
    readonly size: Size;
}

interface PinturaDefaultImageWriterResult {
    readonly src: ImageSource;
    readonly dest: File;
    readonly imageState: any;
    readonly store: any;
}

interface PinturaTargetSize {
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'force';
    upscale?: boolean;
}

interface PinturaDefaultImageReaderOptions {
    orientImage?: boolean;
    outputProps?: string[];
    preprocessImageFile?: (file: File, options: any, onprogress: ProgressCallback) => Promise<File>;
}

type PinturaStoreField = [string, string] | [string, Blob | File, string];

interface PinturaDefaultImageWriterOptions {
    canvasMemoryLimit?: number;
    orientImage?: boolean;
    copyImageHead?: boolean;
    mimeType?: string;
    quality?: number;
    format?: 'file' | 'imageData' | 'canvas';
    renameFile?: (file: File) => string;
    targetSize?: PinturaTargetSize;
    imageDataResizer?: (imageData: ImageData, width: number, height: number) => Promise<ImageData>;
    store?:
        | string
        | { url: string; dataset?: (imageState: any) => PinturaStoreField[] }
        | ((imageState: any, options: any, onprogress: ProgressCallback) => Promise<any>);
    outputProps?: string[];
    preprocessImageSource?: (
        imageSource: Blob | File,
        options: any,
        onprogress: ProgressCallback
    ) => Promise<Blob | File>;
    preprocessImageState?: (
        imageState: any,
        options: any,
        onprogress: ProgressCallback
    ) => Promise<any>;
    postprocessImageData?: (
        imageData: any,
        options: any,
        onprogress: ProgressCallback
    ) => Promise<ImageData>;

    postprocessImageBlob?: (
        output: {
            blob: Blob;
            imageData: ImageData;
            src: File;
        },
        options: any,
        onprogress: ProgressCallback
    ) => Promise<ImageData>;
}

interface PinturaDefaultImageScramblerOptions {
    blurAmount: number;
    scrambleAmount: number;
    // enableSmoothing: boolean;
}

interface PinturaImageOrienter {
    read: (file: Blob | File, onprogress?: ProgressCallback) => Promise<number>;
    apply: (imageData: ImageData, orientation: number) => ImageData;
}

// exports
export const setPlugins: (...plugins: any[]) => void;

export const getEditorDefaults: (
    options?: PinturaEditorDefaultOptions
) => PinturaEditorDefaultOptions;

export const appendEditor: (
    target: HTMLElement | string,
    options?: PinturaEditorOptions
) => PinturaEditor;

export const appendDefaultEditor: (
    target: HTMLElement | string,
    options?: PinturaEditorDefaultOptions
) => PinturaEditor;

export const appendEditors: (
    target: HTMLElement | string,
    options?: PinturaEditorOptions
) => PinturaEditor[];

export const appendDefaultEditors: (
    target: HTMLElement | string,
    options?: PinturaEditorDefaultOptions
) => PinturaEditor[];

export const overlayEditor: (
    target: HTMLElement | string,
    options?: PinturaEditorOptions
) => PinturaEditor;

export const overlayDefaultEditor: (
    target: HTMLElement | string,
    options?: PinturaEditorDefaultOptions
) => PinturaEditor;

export const openEditor: (options: PinturaEditorOptions) => PinturaEditorModal;

export const openDefaultEditor: (options: PinturaEditorDefaultOptions) => PinturaEditorModal;

export const defineCustomElements: (options?: PinturaEditorOptions) => Promise<PinturaEditor>;

export const defineDefaultCustomElements: (
    options?: PinturaEditorDefaultOptions
) => Promise<PinturaEditor>;

export const processImage: (
    src: ImageSource,
    options: PinturaEditorHeadlessOptions
) => Promise<PinturaDefaultImageWriterResult>;

export const processDefaultImage: (
    src: ImageSource,
    options: PinturaEditorHeadlessOptions
) => Promise<PinturaDefaultImageWriterResult>;

export const createDefaultImageReader: (options?: PinturaDefaultImageReaderOptions) => any[];

export const createDefaultImageWriter: (options?: PinturaDefaultImageWriterOptions) => any[];

export const createDefaultImageOrienter: () => PinturaImageOrienter;

export const createDefaultImageScrambler: (
    options?: PinturaDefaultImageScramblerOptions
) => (imageData: ImageData | ImageBitmap) => HTMLCanvasElement;

export const createDefaultShapePreprocessor: () => any;

// node tree helpers
export function createNode(
    name: PinturaNodeType,
    id: string,
    props: PinturaNodeOptions | undefined,
    children: PinturaNode[]
): PinturaNode;

export function createNode(name: PinturaNodeType, id: string): PinturaNode;

export function createNode(name: PinturaNodeType, id: string, children: PinturaNode[]): PinturaNode;

export function createNode(
    name: PinturaNodeType,
    id: string,
    props: PinturaNodeOptions
): PinturaNode;

export function findNode(id: string, haystack: PinturaNode | PinturaNode[]): void;
export function appendNode(node: PinturaNode, haystack: PinturaNode | PinturaNode[]): void;
export function removeNode(id: string): void;
export function insertNodeBefore(
    node: PinturaNode,
    targetId: string,
    haystack: PinturaNode | PinturaNode[]
): void;
export function insertNodeAfter(
    node: PinturaNode,
    targetId: string,
    haystack: PinturaNode | PinturaNode[]
): void;

// utils
export const supportsWebGL: () => boolean;
export const degToRad: (deg: number) => number;
export const colorStringToColorArray: (Color: string) => Color;
export const legacyDataToImageState: (data: any) => ImageOptions;
export const dispatchEditorEvents: (
    editor: PinturaEditor,
    element: HTMLElement,
    options?: { prefix?: string }
) => any[];
export const blobToFile: (blob: Blob) => File;
export const isSupported: () => boolean;

// locale
export const locale_en_gb: LocaleCollection;

//
// markup editor
//
interface MarkupEditorToolStyleDefaults {
    sharpie: [Shape, ShapeToolOptions];
    line: [Shape, ShapeToolOptions];
    arrow: [Shape, ShapeToolOptions];
    rectangle: [Shape, ShapeToolOptions];
    ellipse: [Shape, ShapeToolOptions];
    text: [Shape, ShapeToolOptions];
    [custom: string]: [Shape, ShapeToolOptions];
}

interface MarkupEditorShapeStyleControlDefaults {
    backgroundColor: undefined | ShapeControl;
    strokeColor: undefined | ShapeControl;
    strokeWidth: undefined | ShapeControl;
    lineStart: undefined | ShapeControl;
    lineEnd: undefined | ShapeControl;
    color: undefined | ShapeControl;
    fontFamily: undefined | ShapeControl;
    fontStyle_fontWeight: undefined | ShapeControl;
    fontSize: undefined | ShapeControl;
    textAlign: undefined | ShapeControl;
    lineHeight: undefined | ShapeControl;
}

type ToolbarItem =
    | string
    | [string, { disabled?: boolean; icon: string }]
    | [string, LocaleString, { disabled?: boolean; icon: string }];

/**
 * Create tools available in the markup editor
 */
export const createMarkupEditorToolbar: (tools?: ToolbarItem[]) => [string, LocaleString, any][];

/**
 * Create default shape styles for each tool, optionally add custom shape styles
 */

export const createMarkupEditorToolStyles: (toolStyles?: {
    [key: string]: [Shape, ShapeToolOptions];
}) => MarkupEditorToolStyleDefaults;

/**
 * Create a custom tool style based on one of the existing types
 */
export const createMarkupEditorToolStyle: (
    type: 'path' | 'rectangle' | 'ellipse' | 'line' | 'text',
    shape?: Shape,
    options?: ShapeToolOptions
) => [Shape, ShapeToolOptions];

/**
 * Create default shape style controls
 */
export const createMarkupEditorShapeStyleControls: (
    shapeControlOptions?: ShapeControlOptions
) => MarkupEditorShapeStyleControlDefaults;

export const createDefaultColorOptions: () => ColorPalette;
export const createDefaultFontSizeOptions: () => number[];
export const createDefaultFontScaleOptions: () => SizeCategories;
export const createDefaultLineHeightOptions: () => number[];
export const createDefaultLineHeightScaleOptions: () => SizeCategories;
export const createDefaultStrokeWidthOptions: () => number[];
export const createDefaultStrokeScaleOptions: () => SizeCategories;
export const createDefaultLineEndStyleOptions: () => LineEndStyle[];
export const createDefaultFontFamilyOptions: () => [string, string][];
export const createDefaultFontStyleOptions: () => [string, string][];
export const createDefaultTextAlignOptions: () => TextAlign[];

export const createMarkupEditorColorOptions: (colors: ColorPalette) => ShapeColorOption[];
export const createMarkupEditorFontSizeOptions: (sizes: number[]) => ShapeSizeOption[];
export const createMarkupEditorFontScaleOptions: (sizes: SizeCategories) => ShapeSizeOption[];
export const createMarkupEditorLineHeightOptions: (sizes: number[]) => ShapeSizeOption[];
export const createMarkupEditorLineHeightScaleOptions: (sizes: SizeCategories) => ShapeSizeOption[];
export const createMarkupEditorStrokeWidthOptions: (widths: number[]) => ShapeSizeOption[];
export const createMarkupEditorStrokeScaleOptions: (sizes: SizeCategories) => ShapeSizeOption[];
export const createMarkupEditorFontFamilyOptions: (
    families: [string, string][]
) => ShapeFontFamilyOption[];
export const createMarkupEditorFontStyleOptions: (
    styles: [string, string][]
) => ShapeFontStyleOption[];
export const createMarkupEditorLineEndStyleOptions: (
    styles: LineEndStyle[]
) => [LineEndStyle, string][];

export const createMarkupEditorBackgroundColorControl: (colors: ShapeColorOption[]) => ShapeControl;
export const createMarkupEditorStrokeColorControl: (
    colors: ShapeColorOption[],
    options?: { defaultStrokeWidth: number | string }
) => ShapeControl;
export const createMarkupEditorStrokeWidthControl: (widths: ShapeSizeOption[]) => ShapeControl;
export const createMarkupEditorLineStartStyleControl: (
    styles: [LineEndStyle, string][]
) => ShapeControl;
export const createMarkupEditorLineEndStyleControl: (
    styles: [LineEndStyle, string][]
) => ShapeControl;
export const createMarkupEditorFontColorControl: (colors: ShapeColorOption[]) => ShapeControl;
export const createMarkupEditorFontFamilyControl: (
    fontFamilies: [string, string][]
) => ShapeControl;
export const createMarkupEditorFontStyleControl: (fontStyles: [string, string][]) => ShapeControl;
export const createMarkupEditorFontSizeControl: (sizes: ShapeSizeOption[]) => ShapeControl;
export const createMarkupEditorTextAlignControl: (textAlignments: TextAlign[]) => ShapeControl;
export const createMarkupEditorLineHeightControl: (lineHeights: [number, string][]) => ShapeControl;

export const markup_editor_defaults: {
    markupEditorToolbar: [string, LocaleString, any][];
    markupEditorToolStyles: MarkupEditorToolStyleDefaults;
    markupEditorShapeStyleControls: MarkupEditorShapeStyleControlDefaults;
};

export const markup_editor_locale_en_gb: LocaleCollection;

//
// plugins
//
interface PinturaUtilPlugin {
    util: [string, any];
}

export const plugin_annotate: PinturaUtilPlugin;
export const plugin_crop: PinturaUtilPlugin;
export const plugin_decorate: PinturaUtilPlugin;
export const plugin_filter: PinturaUtilPlugin;
export const plugin_finetune: PinturaUtilPlugin;
export const plugin_resize: PinturaUtilPlugin;
export const plugin_sticker: PinturaUtilPlugin;
export const plugin_redact: PinturaUtilPlugin;
export const plugin_frame: PinturaUtilPlugin;

export const plugin_annotate_locale_en_gb: LocaleCollection;
export const plugin_crop_locale_en_gb: LocaleCollection;
export const plugin_decorate_locale_en_gb: LocaleCollection;
export const plugin_filter_locale_en_gb: LocaleCollection;
export const plugin_finetune_locale_en_gb: LocaleCollection;
export const plugin_resize_locale_en_gb: LocaleCollection;
export const plugin_sticker_locale_en_gb: LocaleCollection;
export const plugin_redact_locale_en_gb: LocaleCollection;
export const plugin_frame_locale_en_gb: LocaleCollection;

export const plugin_frame_defaults: FramePluginOptions;
export const plugin_filter_defaults: FilterPluginOptions;
export const plugin_finetune_defaults: FinetunePluginOptions;

export const effectBrightness: Effect;
export const effectContrast: Effect;
export const effectSaturation: Effect;
export const effectExposure: Effect;
export const effectGamma: Effect;
export const effectVignette: Effect;
export const effectClarity: Effect;
export const effectTemperature: Effect;

export const filterPastel: Filter;
export const filterChrome: Filter;
export const filterFade: Filter;
export const filterWarm: Filter;
export const filterCold: Filter;
export const filterInvert: Filter;
export const filterMonoDefault: Filter;
export const filterMonoNoir: Filter;
export const filterMonoWash: Filter;
export const filterMonoStark: Filter;
export const filterSepiaDefault: Filter;
export const filterSepiaBlues: Filter;
export const filterSepiaRust: Filter;
export const filterSepiaColor: Filter;

export const frameSolidSharp: Frame;
export const frameSolidRound: Frame;
export const frameLineSingle: Frame;
export const frameLineMultiple: Frame;
export const frameEdgeSeparate: Frame;
export const frameEdgeCross: Frame;
export const frameEdgeOverlap: Frame;
export const frameHook: Frame;
export const framePolaroid: Frame;
