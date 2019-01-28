import { CollectionStore } from '@polpware/fe-data';
import { underscore } from '@polpware/fe-dependencies';
import { pushArray } from '@polpware/fe-utilities';
import { NgStoreListMediator, WritableListMediator, RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
import { InjectionToken } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class PlatformObliviousListPage {
    constructor() {
        this.moreDataCanBeLoaded = false;
        this.callbacks = {
            onRefresh: null,
            onInfinite: null
        };
    }
    /**
     * @protected
     * @param {?} fromCache
     * @param {...?} rest
     * @return {?}
     */
    turnOnMediator(fromCache, ...rest) {
        /** @type {?} */
        const viewInstance = this.buildViewInstance();
        this.listMediator.startService(viewInstance, fromCache);
    }
    /**
     * @protected
     * @return {?}
     */
    turnOffMediator() {
        this.listMediator.stopService();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const _$1 = underscore;
/** @type {?} */
const noop = _$1.noop;
/**
 * @param {?} context
 * @return {?}
 */
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
             */
            getState: noop,
            /**
             * Set state
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class FullFeatureListPage extends PlatformObliviousListPage {
    /**
     * @param {...?} args
     * @return {?}
     */
    onDocumentReady(...args) {
        // Cache will be provided in its derived class
        this.ensureDataProvider(...args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    onDocumentDestroy(...args) {
        // Cache will be provided in its derived class
        this.turnOffMediator();
        this.afterMediatorOff();
    }
    // May be not needed. 
    /**
     * @protected
     * @param {?} dataProvider
     * @return {?}
     */
    onDataProviderReady(dataProvider) {
        this.buildMediator(dataProvider).then(() => {
            this.turnOnMediator(false);
            this.afterMediatorOn();
        });
    }
    // Override
    /**
     * @protected
     * @return {?}
     */
    buildViewInstance() {
        return adaptAngularToController({
            $scope: this
        });
    }
    /**
     * @return {?}
     */
    doRefresh() {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    }
    /**
     * @return {?}
     */
    doInfinite() {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    showLoadingIndicator(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideLoadingIndicator(...args) { }
    /**
     * @param {?} seconds
     * @return {?}
     */
    setLoadingIndicatorDelay(seconds) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    showMoreLoading(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideMoreLoading(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    showRefreshingIndicator(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideRefreshingIndicator(...args) { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Note that in the class, please avoid to depend on onNewItemsReady,
// as it is NOT in the update flow.
/**
 * @abstract
 * @template T
 */
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
    /**
     * @protected
     * @param {?} fromCache
     * @return {?}
     */
    turnOnMediator(fromCache) {
        super.turnOnMediator(fromCache);
        /** @type {?} */
        const store = this.asNgStoreListMeidator.getNgStore();
        this._storeSubscription = store.getState().subscribe((data) => {
            /** @type {?} */
            const w = (/** @type {?} */ (data.items));
            this.items = w;
            // Note that we must call onItemsReady ... 
            this.onItemsReady();
        });
    }
    // Override
    /**
     * @protected
     * @return {?}
     */
    turnOffMediator() {
        this._storeSubscription.unsubscribe();
        super.turnOffMediator();
    }
    // Override
    /**
     * @protected
     * @param {?} dataProvider
     * @return {?}
     */
    buildMediator(dataProvider) {
        /** @type {?} */
        const ctorOptions = Object.assign({}, this.mediatorCtorOptions, { dataProvider: dataProvider });
        /** @type {?} */
        const s = new CollectionStore();
        /** @type {?} */
        const m = new NgStoreListMediator(ctorOptions);
        m.setNgStore(s);
        this.listMediator = m;
        this.listMediator.setUp();
        return Promise.resolve();
    }
    /**
     * @protected
     * @return {?}
     */
    get asNgStoreListMeidator() {
        /** @type {?} */
        const m = this.listMediator;
        return (/** @type {?} */ (m));
    }
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    readMediatorFromCache(key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    }
    /**
     * @protected
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    writeMediatorIntoCache(key, value) {
        this.mediatorCache.set(key, value, this.defaultLivePeriod, (evt) => {
            value.tearDown();
            return evt;
        });
    }
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    addOnCacheExpireHandler(key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    }
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    removeOnCacheExpireHandler(key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    }
    // Default implementation.
    // Override
    // Note that in the derived class we do NOT depend on it.
    /**
     * @param {?} items
     * @return {?}
     */
    onNewItemsReady(items) {
        return items;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Note that we use ICollectionItem rather than IModelLike,
// because we assume the least requirement for the input type.
// Precisely, the only requirement is that the collection item has an
// id field. 
/**
 * @abstract
 * @template T
 */
class BackboneBackedListPage extends FullFeatureListPage {
    constructor() {
        super();
        this.defaultLivePeriod = 60 * 5;
        this.items = [];
        this._onCacheExpireCallback = null;
    }
    /**
     * @protected
     * @return {?}
     */
    get asWritableListMediator() {
        /** @type {?} */
        const m = this.listMediator;
        return (/** @type {?} */ (m));
    }
    // Default implementation for using backbone
    /**
     * @protected
     * @param {?} localDataProvider
     * @param {?=} localOptions
     * @return {?}
     */
    useMediatorWithOnlyLocalDataProvider(localDataProvider, localOptions) {
        /** @type {?} */
        const ctorOptions = {
            dataProvider: localDataProvider,
            useModel: true,
            enableInfinite: true,
            enableRefresh: true
        };
        /** @type {?} */
        const s = new WritableListMediator(ctorOptions);
        this.listMediator = s;
        this.listMediator.setUp();
    }
    /**
     * @protected
     * @param {?} localDataProvider
     * @param {?} globalDataProvider
     * @param {?=} localOptions
     * @param {?=} globalOptions
     * @return {?}
     */
    useMediatorWithGlobalDataProvider(localDataProvider, globalDataProvider, localOptions, globalOptions) {
        /** @type {?} */
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
    /**
     * @protected
     * @param {...?} args
     * @return {?}
     */
    postUseFreshMediator(...args) {
        this.turnOnMediator(false, ...args);
        this.afterMediatorOn();
    }
    // Invoked after the cached mediator is used 
    /**
     * @protected
     * @param {...?} args
     * @return {?}
     */
    postUseCachedMediator(...args) {
        this.turnOnMediator(true, ...args);
        this.afterMediatorOn();
    }
    // Override to support cache
    /**
     * @protected
     * @param {...?} args
     * @return {?}
     */
    ensureDataProvider(...args) {
        if (this.mediatorCache) {
            /** @type {?} */
            const cacheKey = this.getCacheKey(...args);
            /** @type {?} */
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
    /**
     * @protected
     * @return {?}
     */
    afterMediatorOn() {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs 
            /** @type {?} */
            const cacheKey = this.getCacheKey();
            this.addOnCacheExpireHandler(cacheKey);
        }
    }
    // Override
    /**
     * @protected
     * @return {?}
     */
    afterMediatorOff() {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs
            /** @type {?} */
            const cacheKey = this.getCacheKey();
            this.removeOnCacheExpireHandler(cacheKey);
        }
    }
    // Default implementation
    /**
     * @param {?} items
     * @return {?}
     */
    onNewItemsReady(items) {
        pushArray(this.items, items);
        return items;
    }
    // Default implementation.
    /**
     * @return {?}
     */
    onItemsReady() {
        /** @type {?} */
        const viewData = this.asWritableListMediator.viewLevelData();
        // Get the data from the view level data 
        this.items = viewData.models.slice(0);
    }
    // Note that it is up to the caller to decide how to use the
    // cached value; we need to precisely tell where there is a value in the cache
    // for the corresponding key
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    readMediatorFromCache(key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    }
    /**
     * @protected
     * @param {?} key
     * @param {?} mediator
     * @return {?}
     */
    writeMediatorIntoCache(key, mediator) {
        this.mediatorCache.set(key, mediator, this.defaultLivePeriod, (evt) => {
            mediator.tearDown();
            return evt;
        });
    }
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    addOnCacheExpireHandler(key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    }
    /**
     * @protected
     * @param {?} key
     * @return {?}
     */
    removeOnCacheExpireHandler(key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BackendSettings {
}
/** @type {?} */
const BACKEND_SETTINGS = new InjectionToken('Backend Settings');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgStoreBackedListPage, adaptAngularToController, PlatformObliviousListPage, BackboneBackedListPage, FullFeatureListPage, BackendSettings, BACKEND_SETTINGS };

//# sourceMappingURL=polpware-ngx-mvc.js.map