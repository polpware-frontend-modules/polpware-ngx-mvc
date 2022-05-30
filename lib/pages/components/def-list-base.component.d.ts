import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICollectionItem } from '@polpware/fe-data';
import { INgxNoty } from '@polpware/ngx-noty';
import { DefListBaseController, IDefListBaseControllerSettings } from '../controllers/def-list-base.controller';
import * as i0 from "@angular/core";
export interface IDefListBaseComponentSettings extends IDefListBaseControllerSettings {
    spinnerName: string;
}
export interface ISpinnerLike {
    show(...args: any[]): any;
    hide(...args: any[]): any;
    startToListenSpinner(...args: any[]): any;
    stopListener(...args: any[]): any;
}
export declare abstract class DefListBaseComponent<T extends ICollectionItem> extends DefListBaseController<T> {
    protected readonly _spinner: ISpinnerLike;
    protected readonly _toastr: INgxNoty;
    bottomOffset: number;
    minHeight: number;
    fixedHeight: number;
    maxHeight: number;
    topOffset: number;
    containerClass: string;
    initHighlightId: string;
    onSelect: EventEmitter<any>;
    searchControlElem: ElementRef;
    searchEnabled: boolean;
    waitForInputState: boolean;
    typeKeywordState: boolean;
    keywordInEffect: string;
    keywordInEffectState: boolean;
    searchControl: FormControl;
    anyFutureKeyword: string;
    selected: T;
    private _searchKeywordSubr;
    constructor(listSettings: IDefListBaseComponentSettings, _spinner: ISpinnerLike, _toastr: INgxNoty);
    get totalCount(): any;
    get offset(): any;
    get spinnerName(): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Following building a mediator or retrieving a mediator from cache,
     * this method turns on the mediator to trigger network request.
     *
     * @param fromCache
     * @param keyword The parameters from the second one are passed all the way from the
     * onDocumentReady method.
     */
    protected turnOnMediator(fromCache: boolean, keyword: string): void;
    showLoadingIndicator(): void;
    hideLoadingIndicator(): void;
    showMoreLoading(): void;
    hideMoreLoading(): void;
    showRefreshingIndicator(): void;
    hideRefreshingIndicator(): void;
    protected startObserveSearchKeyword(): void;
    protected stopObserveSearchKeyword(): void;
    protected computeSearchState(): void;
    startToTypeKeyword(): void;
    cancelTypedKeyword(): void;
    clearKeywordInEffect(): void;
    kickOffSearch(): void;
    onItemsReady(): void;
    /**
      * Sends a notification back to its parent or client.
      * @param item A data entity.
      */
    selectItem(item: T): void;
    /**
     * Allows the client to highlight an item by Id.
     * @param id
     */
    highlight(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefListBaseComponent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefListBaseComponent<any>, never, never, { "bottomOffset": "bottomOffset"; "minHeight": "minHeight"; "fixedHeight": "fixedHeight"; "maxHeight": "maxHeight"; "topOffset": "topOffset"; "containerClass": "containerClass"; "initHighlightId": "initHighlightId"; }, { "onSelect": "onSelect"; }, never>;
}
