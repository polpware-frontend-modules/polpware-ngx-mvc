import { IListMediatorPublic, IViewInstance, IListMediatorCtorOptions, INgStoreListMediatorPublic, IWritableListMediatorPublic, IWritableListMediatorCtorOptions, IRxjsPoweredDirContentMediatorDev } from '@polpware/fe-mvc';
import { ICollectionItem, ISlidingExpireCache } from '@polpware/fe-data';
import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, ElementRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { INgxNoty } from '@polpware/ngx-noty';

interface ILoadingIndicator {
    showLoadingIndicator(...args: any[]): void;
    hideLoadingIndicator(...args: any[]): void;
    setLoadingIndicatorDelay(seconds: number): any;
}
interface IRefreshingIndicator {
    showRefreshingIndicator(...args: any[]): void;
    hideRefreshingIndicator(...args: any[]): void;
}
interface ILoadingMoreIndicator {
    showMoreLoading(...args: any[]): void;
    hideMoreLoading(...args: any[]): void;
}

interface IMediatorCompatiblePage {
    moreDataCanBeLoaded: boolean;
    callbacks: {
        onRefresh: any;
        onInfinite: any;
    };
    showLoadingIndicator(...args: Array<any>): void;
    hideLoadingIndicator(...args: Array<any>): void;
    showMoreLoading(...args: Array<any>): void;
    hideMoreLoading(...args: Array<any>): void;
    showRefreshingIndicator(...args: Array<any>): void;
    hideRefreshingIndicator(...args: Array<any>): void;
    onNewItemsReady(items: any[]): any[];
    onItemsReady(): void;
}

/**
 * @fileOverview
 * This abstract class defines a base class for implementing
 * a page with such features as refreshing, loading more, and
 * listening to changes from a global database and inserting
 * or deleting elements accordingly.
 *
 * This class does not depend on any features that a specific
 * platform may provide, such as ionViewDidload and ...unload.
 *
 * @name PlatformAgosticFullFeatureListPage.ts
 * @author Xiaolong Tang <xxlongtang@gmail.com>
 * @license Copyright @me
 */

declare abstract class PlatformObliviousListPage implements IMediatorCompatiblePage, ILoadingIndicator, IRefreshingIndicator, ILoadingMoreIndicator {
    moreDataCanBeLoaded: boolean;
    callbacks: {
        onRefresh: any;
        onInfinite: any;
    };
    protected listMediator: IListMediatorPublic;
    constructor();
    protected abstract buildViewInstance(): IViewInstance;
    protected abstract buildMediator(...args: any[]): Promise<void>;
    protected turnOnMediator(fromCache: boolean, ...rest: any[]): void;
    protected turnOffMediator(): void;
    abstract showLoadingIndicator(...args: Array<any>): void;
    abstract hideLoadingIndicator(...args: Array<any>): void;
    abstract setLoadingIndicatorDelay(seconds: number): void;
    abstract showMoreLoading(...args: Array<any>): void;
    abstract hideMoreLoading(...args: Array<any>): void;
    abstract showRefreshingIndicator(...args: Array<any>): void;
    abstract hideRefreshingIndicator(...args: Array<any>): void;
    abstract onNewItemsReady(items: Array<any>): Array<any>;
    abstract onItemsReady(): void;
}

interface IPageLifeCycle {
    onDocumentReady(...args: Array<any>): void;
    onDocumentDestroy(...args: Array<any>): void;
}
declare abstract class FullFeatureListPage extends PlatformObliviousListPage implements IPageLifeCycle {
    onDocumentReady(...args: Array<any>): void;
    onDocumentDestroy(...args: Array<any>): void;
    protected abstract ensureDataProvider(...args: Array<any>): Promise<void>;
    protected abstract afterMediatorOn(): void;
    protected abstract afterMediatorOff(): void;
    protected abstract readMediatorFromCache(key: string): IListMediatorPublic;
    protected abstract writeMediatorIntoCache(key: string, value: IListMediatorPublic): void;
    protected abstract addOnCacheExpireHandler(key: string): void;
    protected abstract removeOnCacheExpireHandler(key: string): void;
    protected onDataProviderReady(dataProvider: any): Promise<void>;
    protected buildViewInstance(): IViewInstance;
    doRefresh(): void;
    doInfinite(): void;
    showLoadingIndicator(...args: any[]): void;
    hideLoadingIndicator(...args: any[]): void;
    setLoadingIndicatorDelay(seconds: number): void;
    showMoreLoading(...args: any[]): void;
    hideMoreLoading(...args: any[]): void;
    showRefreshingIndicator(...args: any[]): void;
    hideRefreshingIndicator(...args: any[]): void;
}

declare abstract class NgStoreBackedListPage<T extends ICollectionItem> extends FullFeatureListPage {
    protected defaultLivePeriod: number;
    protected mediatorCtorOptions: IListMediatorCtorOptions;
    protected mediatorCache: ISlidingExpireCache<INgStoreListMediatorPublic>;
    private _onCacheExpireCallback;
    private _storeSubscription;
    items: T[];
    constructor();
    protected turnOnMediator(fromCache: boolean): void;
    protected turnOffMediator(): void;
    protected buildMediator(dataProvider: any): Promise<void>;
    protected get asNgStoreListMeidator(): INgStoreListMediatorPublic;
    protected readMediatorFromCache(key: string): INgStoreListMediatorPublic;
    protected writeMediatorIntoCache(key: string, value: INgStoreListMediatorPublic): void;
    protected addOnCacheExpireHandler(key: string): void;
    protected removeOnCacheExpireHandler(key: string): void;
    onNewItemsReady(items: T[]): T[];
}

declare function adaptAngularToController(context: any): IViewInstance;

declare abstract class BackboneBackedListPage<T extends ICollectionItem> extends FullFeatureListPage {
    protected defaultLivePeriod: number;
    protected mediatorCache: ISlidingExpireCache<IWritableListMediatorPublic>;
    private _onCacheExpireCallback;
    items: T[];
    constructor();
    protected abstract getCacheKey(...args: any[]): string;
    protected get asWritableListMediator(): IWritableListMediatorPublic;
    protected useMediatorWithOnlyLocalDataProvider(localDataProvider: any, localOptions?: object): void;
    protected useMediatorWithGlobalDataProvider(localDataProvider: any, globalDataProvider: any, localOptions?: object, globalOptions?: object): void;
    protected postUseFreshMediator(...args: any[]): void;
    protected postUseCachedMediator(...args: any[]): void;
    protected ensureDataProvider(...args: any[]): Promise<void>;
    protected afterMediatorOn(): void;
    protected afterMediatorOff(): void;
    onNewItemsReady(items: Array<any>): Array<any>;
    onItemsReady(): void;
    protected readMediatorFromCache(key: string): IWritableListMediatorPublic;
    protected writeMediatorIntoCache(key: string, mediator: IWritableListMediatorPublic): void;
    protected addOnCacheExpireHandler(key: string): void;
    protected removeOnCacheExpireHandler(key: string): void;
}

declare class BackendSettings {
    urlBase: string;
}
declare const BACKEND_SETTINGS: InjectionToken<BackendSettings>;

interface IDefListBaseMediatorCtorOptions extends IWritableListMediatorCtorOptions {
    keyword?: string;
    pageSize?: number;
}
/** Specifies the internal interface for accessing the properties
 * of the internal implementation of a mediator.
 *
 * This interface is supposed used only in the traditional way of implementing a
 * a class, e.g., the way of xx.extend({}).
 *
 * Using this interface helps the editor to figure out the correct properties
 * when we implement the mediator.
 */
interface IDefListBaseMediatorDev extends IRxjsPoweredDirContentMediatorDev {
    _filter: string;
    _keyword: string;
    _pageSize: number;
    _fromCache: boolean;
    reComputeDataParams(): any;
}
/** Specifies the interface that we can use in the controller
 * which uses the mediator.
 *
 * This interface and the above interface describes the same object in
 * two distinct perspectives. The above one defines the interface from the
 * perspective of implmenting a meditator. This one defines the interface
 * from the perspective of a client.
 *
 * Using this interface helps the editor to figure out the correct methods
 * we may use in the controller and its sub-classes.
 */
interface IDefListBaseMediatorPublic extends IWritableListMediatorPublic {
    keyword(value?: string): string;
    _formCache: boolean;
    _isInit: boolean;
}
declare const DefListBaseMediator: any;

interface IDefListBaseControllerSettings {
    endpointName: string;
    tableName: string;
    cacheKey: string;
}
declare abstract class DefListBaseController<T extends ICollectionItem> extends BackboneBackedListPage<T> {
    protected readonly _listSettings: IDefListBaseControllerSettings;
    constructor(_listSettings: IDefListBaseControllerSettings);
    get asDefListBaseMediator(): IDefListBaseMediatorPublic;
    /**
     * Indicates whether the underlying medicator is built from the previous
     * cache or not.
     */
    get fromCache(): boolean;
    /**
     * Indicates whether the underlying medicator is still in the init stage,
     * I.e., the underlying mediator has not conducted any request or not.
     */
    get inInitState(): boolean;
    protected getCacheKey(): string;
    protected abstract getBackendService(): any;
    protected abstract getGlobalCache(): any;
    protected abstract getRelationalDB(): any;
    /**
     * Builds the underlying mediator
     * @param keyword The parameter is passed all the way from the
     * onDocumentReady method.
     */
    protected buildMediator(keyword: string): Promise<void>;
    /**
     * Provides a chance to invoke a derived mediator in the derived controller.
     * @param options
     */
    protected invokeMediatorCtor(options: IDefListBaseMediatorCtorOptions): any;
    /**
     * Provides a chance to update the freshly generated data provider.
     * E.g., we can use this method to update the endpoint url.
     */
    protected touchLocalDataProvider(dataProvider: any): void;
}

interface IDefListBaseComponentSettings extends IDefListBaseControllerSettings {
    spinnerName: string;
}
interface ISpinnerLike {
    show(...args: any[]): any;
    hide(...args: any[]): any;
    startToListenSpinner(...args: any[]): any;
    stopListener(...args: any[]): any;
}
declare abstract class DefListBaseComponent<T extends ICollectionItem> extends DefListBaseController<T> {
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
    searchControl: UntypedFormControl;
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefListBaseComponent<any>, never, never, { "bottomOffset": { "alias": "bottomOffset"; "required": false; }; "minHeight": { "alias": "minHeight"; "required": false; }; "fixedHeight": { "alias": "fixedHeight"; "required": false; }; "maxHeight": { "alias": "maxHeight"; "required": false; }; "topOffset": { "alias": "topOffset"; "required": false; }; "containerClass": { "alias": "containerClass"; "required": false; }; "initHighlightId": { "alias": "initHighlightId"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}

export { BACKEND_SETTINGS, BackboneBackedListPage, BackendSettings, DefListBaseComponent, DefListBaseController, DefListBaseMediator, FullFeatureListPage, NgStoreBackedListPage, PlatformObliviousListPage, adaptAngularToController };
export type { IDefListBaseComponentSettings, IDefListBaseControllerSettings, IDefListBaseMediatorCtorOptions, IDefListBaseMediatorDev, IDefListBaseMediatorPublic, ILoadingIndicator, ILoadingMoreIndicator, IMediatorCompatiblePage, IPageLifeCycle, IRefreshingIndicator, ISpinnerLike };
