import { NgStoreListMediator, WritableListMediator, RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
import { CollectionStore } from '@polpware/fe-data';
import { underscore } from '@polpware/fe-dependencies';
import { pushArray } from '@polpware/fe-utilities';
import { InjectionToken, EventEmitter, ɵɵinvalidFactory, ɵɵdefineDirective, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵInheritDefinitionFeature } from '@angular/core';
import { FormControl } from '@angular/forms';

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
const _ = underscore;
class PlatformObliviousListPage {
    constructor() {
        this.moreDataCanBeLoaded = false;
        this.callbacks = {
            onRefresh: null,
            onInfinite: null
        };
    }
    turnOnMediator(fromCache, ...rest) {
        const viewInstance = this.buildViewInstance();
        this.listMediator.startService(viewInstance, fromCache);
    }
    turnOffMediator() {
        this.listMediator.stopService();
    }
}

const _$1 = underscore;
const noop = _$1.noop;
function adaptAngularToController(context) {
    return {
        $data: {
            init: function () {
                context.$scope.moreDataCanBeLoaded = false;
            },
            setRefreshCallback: function (callback) {
                context.$scope.callbacks.onRefresh = callback;
            },
            setInfiniteCallback: function (callback) {
                context.$scope.callbacks.onInfinite = callback;
            },
            clean: function () {
                context.$scope.onItemsReady();
            },
            asyncPush: function (items) {
                context.$scope.onNewItemsReady(items);
                context.$scope.onItemsReady();
            },
            syncPush: function (items) {
                context.$scope.onNewItemsReady(items);
                context.$scope.onItemsReady();
            },
            asyncPop: function (items) {
                context.$scope.onItemsReady();
            },
            syncPop: function (items) {
                context.$scope.onItemsReady();
            },
            asyncPrepend: function (items) {
                context.$scope.onNewItemsReady(items);
                context.$scope.onItemsReady();
            },
            syncPrepend: function (items) {
                context.$scope.onNewItemsReady(items);
                context.$scope.onItemsReady();
            },
            asyncRefresh: noop,
            syncRefresh: noop,
            hasMoreData: function (flag) {
                context.$scope.moreDataCanBeLoaded = flag;
            },
            getItems: function () {
            },
            setupSearch: function (criteria, callback) {
                context.$scope.searchCriteria = criteria;
                context.$scope.doSearch = callback;
            },
            updateSearchCriteria: function (criteria) {
                context.$scope.searchCriteria = criteria;
            },
            getAncestor: function () {
                return context.$scope.ancestor;
            }
        },
        $loader: {
            show: function () {
                context.$scope.showLoadingIndicator();
            },
            hide: function () {
                context.$scope.hideLoadingIndicator();
            }
        },
        $refresher: {
            show: function () {
                context.$scope.showRefreshingIndicator();
            },
            hide: function () {
                context.$scope.hideRefreshingIndicator();
            }
        },
        $moreLoader: {
            show: function () {
                context.$scope.showMoreLoading();
            },
            hide: function () {
                context.$scope.hideMoreLoading();
            }
        },
        $router: {
            go: function (url, data) {
                context.$state.go(url, data);
            }
        },
        $render: {
            ready: function (callback) {
                context.$scope.callbacks.onViewDidLoad = callback;
            },
            destroy: function (callback) {
                context.$scope.callbacks.onViewWillUnload = callback;
            },
            asyncDigest: noop
        },
        $navBar: {
            /**
             * Get current state
             * @returns {}
             */
            getState: noop,
            /**
             * Set state
             * @param {Boolean} s
             */
            setState: noop
        },
        $modal: {
            setData: function (key, data) {
                context.$scope[key] = data;
            },
            getData: function (key) {
                return context.$scope[key];
            },
            build: noop
        },
        $popover: {
            setData: function (key, data) {
                context.$scope[key] = data;
            },
            getData: function (key) {
                return context.$scope[key];
            },
            build: noop,
            onHidden: noop
        },
        $popup: {
            setData: function (data) {
                context.$scope.popupInput = _$1.extend({
                    confirmed: false
                }, data);
            },
            getData: function () {
                return context.$scope.popupInput;
            },
            build: noop,
            confirm: noop,
            prompt: noop,
            alert: noop
        },
        $progressBar: {
            create: noop,
            reset: function () {
                context.$scope.progressBar = 0;
            },
            createInfinite: noop,
            onProgress: function (percentage) {
                context.$scope.progressBar = percentage;
            },
            destroy: noop,
            destroyInfinite: noop,
            showAbort: noop
        },
        $alertify: context.alertify,
        $history: {
            goBack: function () {
                context.$ionicHistory.goBack();
            }
        }
    };
}

// base
class FullFeatureListPage extends PlatformObliviousListPage {
    onDocumentReady(...args) {
        // Cache will be provided in its derived class
        this.ensureDataProvider(...args);
    }
    onDocumentDestroy(...args) {
        // Cache will be provided in its derived class
        this.turnOffMediator();
        this.afterMediatorOff();
    }
    // May be not needed. 
    onDataProviderReady(dataProvider) {
        this.buildMediator(dataProvider).then(() => {
            this.turnOnMediator(false);
            this.afterMediatorOn();
        });
    }
    // Override
    buildViewInstance() {
        return adaptAngularToController({
            $scope: this
        });
    }
    doRefresh() {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    }
    doInfinite() {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    }
    showLoadingIndicator(...args) { }
    hideLoadingIndicator(...args) { }
    setLoadingIndicatorDelay(seconds) { }
    showMoreLoading(...args) { }
    hideMoreLoading(...args) { }
    showRefreshingIndicator(...args) { }
    hideRefreshingIndicator(...args) { }
}

// Note that in the class, please avoid to depend on onNewItemsReady,
// as it is NOT in the update flow.
class NgStoreBackedListPage extends FullFeatureListPage {
    constructor() {
        super();
        this.defaultLivePeriod = 60 * 5;
        this.mediatorCtorOptions = {
            useModel: true,
            enableInfinite: true,
            enableRefresh: true
        };
        this.items = [];
        this._onCacheExpireCallback = null;
    }
    // Override
    turnOnMediator(fromCache) {
        super.turnOnMediator(fromCache);
        const store = this.asNgStoreListMeidator.getNgStore();
        this._storeSubscription = store.getState().subscribe((data) => {
            const w = data.items;
            this.items = w;
            // Note that we must call onItemsReady ... 
            this.onItemsReady();
        });
    }
    // Override
    turnOffMediator() {
        this._storeSubscription.unsubscribe();
        super.turnOffMediator();
    }
    // Override
    buildMediator(dataProvider) {
        const ctorOptions = Object.assign(Object.assign({}, this.mediatorCtorOptions), { dataProvider: dataProvider });
        const s = new CollectionStore();
        const m = new NgStoreListMediator(ctorOptions);
        m.setNgStore(s);
        this.listMediator = m;
        this.listMediator.setUp();
        return Promise.resolve();
    }
    get asNgStoreListMeidator() {
        const m = this.listMediator;
        return m;
    }
    readMediatorFromCache(key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    }
    writeMediatorIntoCache(key, value) {
        this.mediatorCache.set(key, value, this.defaultLivePeriod, (evt) => {
            value.tearDown();
            return evt;
        });
    }
    addOnCacheExpireHandler(key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    }
    removeOnCacheExpireHandler(key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    }
    // Default implementation.
    // Override
    // Note that in the derived class we do NOT depend on it.
    onNewItemsReady(items) {
        return items;
    }
}

// Note that we use ICollectionItem rather than IModelLike,
// because we assume the least requirement for the input type.
// Precisely, the only requirement is that the collection item has an
// id field. 
class BackboneBackedListPage extends FullFeatureListPage {
    constructor() {
        super();
        this.defaultLivePeriod = 60 * 5;
        this.items = [];
        this._onCacheExpireCallback = null;
    }
    get asWritableListMediator() {
        const m = this.listMediator;
        return m;
    }
    // Default implementation for using backbone
    useMediatorWithOnlyLocalDataProvider(localDataProvider, localOptions) {
        const ctorOptions = {
            dataProvider: localDataProvider,
            useModel: true,
            enableInfinite: true,
            enableRefresh: true
        };
        const s = new WritableListMediator(ctorOptions);
        this.listMediator = s;
        this.listMediator.setUp();
    }
    useMediatorWithGlobalDataProvider(localDataProvider, globalDataProvider, localOptions, globalOptions) {
        const mediator = new RxjsPoweredWritableListMediator({
            globalProvider: globalDataProvider,
            filterFlags: {
                added: true,
                removed: true,
                updated: false
            },
            dataProvider: localDataProvider,
            useModel: true
        });
        this.listMediator = mediator;
        this.listMediator.setUp();
    }
    // Invoked after the new mediator is constructure 
    postUseFreshMediator(...args) {
        this.turnOnMediator(false, ...args);
        this.afterMediatorOn();
    }
    // Invoked after the cached mediator is used 
    postUseCachedMediator(...args) {
        this.turnOnMediator(true, ...args);
        this.afterMediatorOn();
    }
    // Override to support cache
    ensureDataProvider(...args) {
        if (this.mediatorCache) {
            const cacheKey = this.getCacheKey(...args);
            let inCache = false;
            const mediator = this.readMediatorFromCache(cacheKey);
            if (!mediator) { // Not in cache
                this.buildMediator(...args).then(() => {
                    // set up in the cache
                    this.writeMediatorIntoCache(cacheKey, this.asWritableListMediator);
                    // case 1:
                    this.postUseFreshMediator(true, ...args);
                });
            }
            else { // In cache
                inCache = true;
                this.listMediator = mediator;
                // Case 2:
                this.postUseCachedMediator(...args);
            }
        }
        else {
            this.buildMediator(...args).then(() => {
                // Case 3: 
                this.postUseFreshMediator(false, ...args);
            });
        }
    }
    // Override
    afterMediatorOn() {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs 
            const cacheKey = this.getCacheKey();
            this.addOnCacheExpireHandler(cacheKey);
        }
    }
    // Override
    afterMediatorOff() {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs
            const cacheKey = this.getCacheKey();
            this.removeOnCacheExpireHandler(cacheKey);
        }
    }
    // Default implementation
    onNewItemsReady(items) {
        pushArray(this.items, items);
        return items;
    }
    // Default implementation.
    onItemsReady() {
        const viewData = this.asWritableListMediator.viewLevelData();
        // Get the data from the view level data 
        this.items = viewData.models.slice(0);
    }
    // Note that it is up to the caller to decide how to use the
    // cached value; we need to precisely tell where there is a value in the cache
    // for the corresponding key
    readMediatorFromCache(key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    }
    writeMediatorIntoCache(key, mediator) {
        this.mediatorCache.set(key, mediator, this.defaultLivePeriod, (evt) => {
            mediator.tearDown();
            return evt;
        });
    }
    addOnCacheExpireHandler(key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    }
    removeOnCacheExpireHandler(key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    }
}

class BackendSettings {
}
const BACKEND_SETTINGS = new InjectionToken('Backend Settings');

const DefListBaseMediator = RxjsPoweredWritableListMediator.extend({
    /* Properties */
    Properties: 'filter,keyword,pageSize',
    /**
     * Override
     *
     * @param settings
     */
    init: function (settings) {
        const self = this;
        self._super(settings);
        self._filter = '';
        // Init 
        self._keyword = settings.keyword || '';
        self._pageSize = settings.pageSize || 40;
        self._fromCache = false;
    },
    /**
     * Override
     * Render data in
     * @param asyncLoaded
     */
    renderData: function (asyncLoaded) {
        const self = this;
        self._super(asyncLoaded);
    },
    /**
     * Override
     * so that we can reload data even in the case of cache
     * @param {} fromCache
     */
    startService: function (viewInstance, fromCache) {
        const self = this;
        self.attachView(viewInstance);
        if (fromCache === true) {
            self._fromCache = true;
            self.renderData(true);
        }
        else {
            self._fromCache = false;
            // Enforce that keyword is ''
            self.startServiceImpl();
        }
    },
    /**
     * Override
     */
    reComputeDataParams: function () {
        const self = this;
        // target
        const state = self._dataProvider.state;
        state.offset = 0;
        state.keyword = self._keyword || '';
    },
    /**
     * Override
     */
    loadInitData: function () {
        const self = this;
        self.reComputeDataParams();
        return self._super();
    }
});

// base
class DefListBaseController extends BackboneBackedListPage {
    constructor(_listSettings) {
        // If we navigated to this page, we will have an item available as a nav param
        super();
        this._listSettings = _listSettings;
        this.mediatorCache = this.getGlobalCache();
    }
    get asDefListBaseMediator() {
        return this.listMediator;
    }
    /**
     * Indicates whether the underlying medicator is built from the previous
     * cache or not.
     */
    get fromCache() {
        // Get the fromCache value ...
        return this.listMediator ? this.asDefListBaseMediator._formCache : false;
    }
    /**
     * Indicates whether the underlying medicator is still in the init stage,
     * I.e., the underlying mediator has not conducted any request or not.
     */
    get inInitState() {
        return this.listMediator ? this.asDefListBaseMediator._isInit : true;
    }
    getCacheKey() {
        return this._listSettings.cacheKey;
    }
    /**
     * Builds the underlying mediator
     * @param keyword The parameter is passed all the way from the
     * onDocumentReady method.
     */
    buildMediator(keyword) {
        const backendService = this.getBackendService();
        const backendProvider = backendService.backendProvider;
        let globalDataProvider = null;
        const reDBService = this.getRelationalDB();
        const relDB = reDBService.get();
        // Build collections
        globalDataProvider = relDB.getTable(this._listSettings.tableName).dataProvider();
        // Local data provider
        // The parameter is the endpoint defined by backend.service
        const Ctor = backendProvider.getEndPoint(this._listSettings.endpointName);
        const localDataProvider = new Ctor();
        this.touchLocalDataProvider(localDataProvider);
        // Init data provider 
        localDataProvider.state.pageSize = 40;
        localDataProvider.state.keyword = keyword;
        const filterOptions = globalDataProvider ? {
            added: true,
            removed: true,
            updated: false
        } : {
            added: false,
            removed: false,
            updated: false
        };
        const ctorOptions = {
            globalProvider: globalDataProvider,
            filterFlags: filterOptions,
            dataProvider: localDataProvider,
            useModel: true,
            keyword: keyword,
            pageSize: 40,
            enableInfinite: true,
            enableRefresh: true
        };
        this.listMediator = this.invokeMediatorCtor(ctorOptions);
        this.listMediator.setUp();
        return Promise.resolve();
    }
    /**
     * Provides a chance to invoke a derived mediator in the derived controller.
     * @param options
     */
    invokeMediatorCtor(options) {
        return new DefListBaseMediator(options);
    }
    /**
     * Provides a chance to update the freshly generated data provider.
     * E.g., we can use this method to update the endpoint url.
     */
    touchLocalDataProvider(dataProvider) {
    }
}

const _c0 = ["searchControlElem"];
class DefListBaseComponent extends DefListBaseController {
    constructor(listSettings, _spinner, _toastr) {
        super(listSettings);
        this._spinner = _spinner;
        this._toastr = _toastr;
        this.bottomOffset = 0;
        this.minHeight = 0;
        this.fixedHeight = 0;
        this.maxHeight = 0;
        this.topOffset = 0;
        this.containerClass = '';
        this.initHighlightId = '';
        this.onSelect = new EventEmitter();
        // By default, search is enabled
        this.searchEnabled = true;
        this.searchControl = new FormControl('');
    }
    // Compute the total number of records from the underlying mediator
    // and further the data provider of the mediator.
    get totalCount() {
        return this.asDefListBaseMediator.dataProvider().state.totalRecords;
    }
    // As above, compute the loaded number of records so far.
    get offset() {
        return this.asDefListBaseMediator.dataProvider().state.totalRecords;
    }
    get spinnerName() {
        return this._listSettings.spinnerName;
    }
    ngOnInit() {
        this._spinner.startToListenSpinner(this.spinnerName);
        this.onDocumentReady();
        this.startObserveSearchKeyword();
    }
    ngOnDestroy() {
        this._spinner.stopListener(this.spinnerName);
        this.onDocumentDestroy();
        this.stopObserveSearchKeyword();
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Overrides to tweak the behaviors of the loading/unloading logic
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * Following building a mediator or retrieving a mediator from cache,
     * this method turns on the mediator to trigger network request.
     *
     * @param fromCache
     * @param keyword The parameters from the second one are passed all the way from the
     * onDocumentReady method.
     */
    turnOnMediator(fromCache, keyword) {
        super.turnOnMediator(fromCache, keyword);
        // TODO: Check if we need the following logic?
        // if (this.searchEnabled) {
        //     // Synchronizing the UI and the internal state
        //     const keyword = this.asDefListBaseMediator.keyword();
        //     if (keyword) {
        //         keyword = keyword.toLowerCase();
        //         this.searchControl.setValue(keyword, {
        //             emitEvent: false
        //         });
        //     }
        // }
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Indicators
    ////////////////////////////////////////////////////////////////////////////////
    // Override
    showLoadingIndicator() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    hideLoadingIndicator() {
        this._spinner.hide(this.spinnerName);
    }
    // Override
    showMoreLoading() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    // Override
    hideMoreLoading() {
        this._spinner.hide(this.spinnerName);
    }
    // Override
    showRefreshingIndicator() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    // Override
    hideRefreshingIndicator() {
        this._spinner.hide(this.spinnerName);
        // Release a message 
        this._toastr.success(`List was just refreshed.`, 'Success', {
            closeButton: true
        });
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Search state machine
    ////////////////////////////////////////////////////////////////////////////////
    // Start to listen for search keyword change
    startObserveSearchKeyword() {
        this._searchKeywordSubr = this.searchControl.valueChanges.subscribe(a => {
            a = (a || '').toLowerCase();
            if (a && a !== this.keywordInEffect) {
                this.anyFutureKeyword = a;
            }
            else {
                this.anyFutureKeyword = '';
            }
        });
    }
    stopObserveSearchKeyword() {
        this._searchKeywordSubr && this._searchKeywordSubr.unsubscribe();
    }
    // Recomputes the search state
    //
    // 
    computeSearchState() {
        this.anyFutureKeyword = '';
        this.keywordInEffectState = false;
        this.typeKeywordState = false;
        this.waitForInputState = false;
        let keyword = this.asDefListBaseMediator.keyword();
        if (keyword) {
            keyword = keyword.toLowerCase();
            this.keywordInEffect = keyword;
            this.keywordInEffectState = true;
            // Make sure that the search input has the latest value
            let rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs !== keyword) {
                this.searchControl.setValue(keyword, {
                    emitEvent: false
                });
            }
        }
        else {
            this.waitForInputState = true;
            // Make sure that the search input has the latest value
            let rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs) {
                this.searchControl.setValue('', {
                    emitEvent: false
                });
            }
        }
    }
    // Swtiches to the state for providing
    // the search input control for end users.
    // 
    startToTypeKeyword() {
        this.anyFutureKeyword = '';
        this.waitForInputState = false;
        this.keywordInEffectState = false;
        this.typeKeywordState = true;
        // Schedule focus behavior in next round of UI updating,
        // in order that the above settings are already in effect.
        setTimeout(() => {
            // TODO: Fix this
            // this.focusFolderSearchInput();
        });
    }
    // Cancel typed keyword and
    // reset to whatever the previous state
    //
    // This operation does not cause new network request.
    cancelTypedKeyword() {
        this.computeSearchState();
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    }
    // Clear up keyword
    //
    // This operation causes new network request.
    clearKeywordInEffect() {
        this.asDefListBaseMediator.keyword('');
        this.asDefListBaseMediator.refresh(true);
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    }
    // Starts a new round of search
    //
    // This operation causes new network request.
    kickOffSearch() {
        const k = this.searchControl.value;
        // TODO: Normalize into lowercase ?
        const currentKeyword = this.asDefListBaseMediator.keyword;
        if (k === currentKeyword) {
            // Nothing to do;
            this.computeSearchState();
            return;
        }
        // Otherwise, move forward to search 
        this.asDefListBaseMediator.keyword(k);
        this.asDefListBaseMediator.refresh(true);
    }
    // Override
    //
    // The extra operation allows for synchronizing the internal state
    // with the user interface.
    onItemsReady() {
        super.onItemsReady();
        this.computeSearchState();
        if (this.initHighlightId) {
            this.highlight(this.initHighlightId);
        }
    }
    /**
      * Sends a notification back to its parent or client.
      * @param item A data entity.
      */
    selectItem(item) {
        this.initHighlightId = null;
        this.selected = item;
        this.onSelect.emit(item);
    }
    /**
     * Allows the client to highlight an item by Id.
     * @param id
     */
    highlight(id) {
        const item = this.items.find(a => a.id == id);
        if (item && this.selected !== item) {
            this.selected = item;
        }
    }
}
/** @nocollapse */ DefListBaseComponent.ɵfac = function DefListBaseComponent_Factory(t) { ɵɵinvalidFactory(); };
/** @nocollapse */ DefListBaseComponent.ɵdir = ɵɵdefineDirective({ type: DefListBaseComponent, viewQuery: function DefListBaseComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchControlElem = _t.first);
    } }, inputs: { bottomOffset: "bottomOffset", minHeight: "minHeight", fixedHeight: "fixedHeight", maxHeight: "maxHeight", topOffset: "topOffset", containerClass: "containerClass", initHighlightId: "initHighlightId" }, outputs: { onSelect: "onSelect" }, features: [ɵɵInheritDefinitionFeature] });

/*
 * Public API Surface of ngx-mvc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BACKEND_SETTINGS, BackboneBackedListPage, BackendSettings, DefListBaseComponent, DefListBaseController, DefListBaseMediator, FullFeatureListPage, NgStoreBackedListPage, PlatformObliviousListPage, adaptAngularToController };
//# sourceMappingURL=polpware-ngx-mvc.js.map
