import { NgStoreListMediator, WritableListMediator, RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
import { CollectionStore } from '@polpware/fe-data';
import { underscore } from '@polpware/fe-dependencies';
import { pushArray } from '@polpware/fe-utilities';
import { InjectionToken } from '@angular/core';

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

/*
 * Public API Surface of ngx-mvc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BACKEND_SETTINGS, BackboneBackedListPage, BackendSettings, FullFeatureListPage, NgStoreBackedListPage, PlatformObliviousListPage, adaptAngularToController };
//# sourceMappingURL=polpware-ngx-mvc.js.map
