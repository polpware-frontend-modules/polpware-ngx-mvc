import { __extends, __spread, __assign } from 'tslib';
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
var _ = underscore;
var PlatformObliviousListPage = /** @class */ (function () {
    function PlatformObliviousListPage() {
        this.moreDataCanBeLoaded = false;
        this.callbacks = {
            onRefresh: null,
            onInfinite: null
        };
    }
    PlatformObliviousListPage.prototype.turnOnMediator = function (fromCache) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var viewInstance = this.buildViewInstance();
        this.listMediator.startService(viewInstance, fromCache);
    };
    PlatformObliviousListPage.prototype.turnOffMediator = function () {
        this.listMediator.stopService();
    };
    return PlatformObliviousListPage;
}());

var _$1 = underscore;
var noop = _$1.noop;
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

var FullFeatureListPage = /** @class */ (function (_super) {
    __extends(FullFeatureListPage, _super);
    function FullFeatureListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullFeatureListPage.prototype.onDocumentReady = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Cache will be provided in its derived class
        this.ensureDataProvider.apply(this, __spread(args));
    };
    FullFeatureListPage.prototype.onDocumentDestroy = function () {
        // Cache will be provided in its derived class
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.turnOffMediator();
        this.afterMediatorOff();
    };
    // May be not needed. 
    FullFeatureListPage.prototype.onDataProviderReady = function (dataProvider) {
        var _this = this;
        this.buildMediator(dataProvider).then(function () {
            _this.turnOnMediator(false);
            _this.afterMediatorOn();
        });
    };
    // Override
    FullFeatureListPage.prototype.buildViewInstance = function () {
        return adaptAngularToController({
            $scope: this
        });
    };
    FullFeatureListPage.prototype.doRefresh = function () {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    };
    FullFeatureListPage.prototype.doInfinite = function () {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    };
    FullFeatureListPage.prototype.showLoadingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideLoadingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.setLoadingIndicatorDelay = function (seconds) { };
    FullFeatureListPage.prototype.showMoreLoading = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideMoreLoading = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.showRefreshingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideRefreshingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return FullFeatureListPage;
}(PlatformObliviousListPage));

// Note that in the class, please avoid to depend on onNewItemsReady,
// as it is NOT in the update flow.
var NgStoreBackedListPage = /** @class */ (function (_super) {
    __extends(NgStoreBackedListPage, _super);
    function NgStoreBackedListPage() {
        var _this = _super.call(this) || this;
        _this.defaultLivePeriod = 60 * 5;
        _this.mediatorCtorOptions = {
            useModel: true,
            enableInfinite: true,
            enableRefresh: true
        };
        _this.items = [];
        _this._onCacheExpireCallback = null;
        return _this;
    }
    // Override
    NgStoreBackedListPage.prototype.turnOnMediator = function (fromCache) {
        var _this = this;
        _super.prototype.turnOnMediator.call(this, fromCache);
        var store = this.asNgStoreListMeidator.getNgStore();
        this._storeSubscription = store.getState().subscribe(function (data) {
            var w = data.items;
            _this.items = w;
            // Note that we must call onItemsReady ... 
            _this.onItemsReady();
        });
    };
    // Override
    NgStoreBackedListPage.prototype.turnOffMediator = function () {
        this._storeSubscription.unsubscribe();
        _super.prototype.turnOffMediator.call(this);
    };
    // Override
    NgStoreBackedListPage.prototype.buildMediator = function (dataProvider) {
        var ctorOptions = __assign(__assign({}, this.mediatorCtorOptions), { dataProvider: dataProvider });
        var s = new CollectionStore();
        var m = new NgStoreListMediator(ctorOptions);
        m.setNgStore(s);
        this.listMediator = m;
        this.listMediator.setUp();
        return Promise.resolve();
    };
    Object.defineProperty(NgStoreBackedListPage.prototype, "asNgStoreListMeidator", {
        get: function () {
            var m = this.listMediator;
            return m;
        },
        enumerable: true,
        configurable: true
    });
    NgStoreBackedListPage.prototype.readMediatorFromCache = function (key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    };
    NgStoreBackedListPage.prototype.writeMediatorIntoCache = function (key, value) {
        this.mediatorCache.set(key, value, this.defaultLivePeriod, function (evt) {
            value.tearDown();
            return evt;
        });
    };
    NgStoreBackedListPage.prototype.addOnCacheExpireHandler = function (key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    };
    NgStoreBackedListPage.prototype.removeOnCacheExpireHandler = function (key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    };
    // Default implementation.
    // Override
    // Note that in the derived class we do NOT depend on it.
    NgStoreBackedListPage.prototype.onNewItemsReady = function (items) {
        return items;
    };
    return NgStoreBackedListPage;
}(FullFeatureListPage));

// Note that we use ICollectionItem rather than IModelLike,
// because we assume the least requirement for the input type.
// Precisely, the only requirement is that the collection item has an
// id field. 
var BackboneBackedListPage = /** @class */ (function (_super) {
    __extends(BackboneBackedListPage, _super);
    function BackboneBackedListPage() {
        var _this = _super.call(this) || this;
        _this.defaultLivePeriod = 60 * 5;
        _this.items = [];
        _this._onCacheExpireCallback = null;
        return _this;
    }
    Object.defineProperty(BackboneBackedListPage.prototype, "asWritableListMediator", {
        get: function () {
            var m = this.listMediator;
            return m;
        },
        enumerable: true,
        configurable: true
    });
    // Default implementation for using backbone
    BackboneBackedListPage.prototype.useMediatorWithOnlyLocalDataProvider = function (localDataProvider, localOptions) {
        var ctorOptions = {
            dataProvider: localDataProvider,
            useModel: true,
            enableInfinite: true,
            enableRefresh: true
        };
        var s = new WritableListMediator(ctorOptions);
        this.listMediator = s;
        this.listMediator.setUp();
    };
    BackboneBackedListPage.prototype.useMediatorWithGlobalDataProvider = function (localDataProvider, globalDataProvider, localOptions, globalOptions) {
        var mediator = new RxjsPoweredWritableListMediator({
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
    };
    // Invoked after the new mediator is constructure 
    BackboneBackedListPage.prototype.postUseFreshMediator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.turnOnMediator.apply(this, __spread([false], args));
        this.afterMediatorOn();
    };
    // Invoked after the cached mediator is used 
    BackboneBackedListPage.prototype.postUseCachedMediator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.turnOnMediator.apply(this, __spread([true], args));
        this.afterMediatorOn();
    };
    // Override to support cache
    BackboneBackedListPage.prototype.ensureDataProvider = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.mediatorCache) {
            var cacheKey_1 = this.getCacheKey.apply(this, __spread(args));
            var inCache = false;
            var mediator = this.readMediatorFromCache(cacheKey_1);
            if (!mediator) { // Not in cache
                this.buildMediator.apply(// Not in cache
                this, __spread(args)).then(function () {
                    // set up in the cache
                    _this.writeMediatorIntoCache(cacheKey_1, _this.asWritableListMediator);
                    // case 1:
                    _this.postUseFreshMediator.apply(_this, __spread([true], args));
                });
            }
            else { // In cache
                inCache = true;
                this.listMediator = mediator;
                // Case 2:
                this.postUseCachedMediator.apply(this, __spread(args));
            }
        }
        else {
            this.buildMediator.apply(this, __spread(args)).then(function () {
                // Case 3: 
                _this.postUseFreshMediator.apply(_this, __spread([false], args));
            });
        }
    };
    // Override
    BackboneBackedListPage.prototype.afterMediatorOn = function () {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs 
            var cacheKey = this.getCacheKey();
            this.addOnCacheExpireHandler(cacheKey);
        }
    };
    // Override
    BackboneBackedListPage.prototype.afterMediatorOff = function () {
        if (this.mediatorCache) {
            // In this case, we do not Provide any inputs
            var cacheKey = this.getCacheKey();
            this.removeOnCacheExpireHandler(cacheKey);
        }
    };
    // Default implementation
    BackboneBackedListPage.prototype.onNewItemsReady = function (items) {
        pushArray(this.items, items);
        return items;
    };
    // Default implementation.
    BackboneBackedListPage.prototype.onItemsReady = function () {
        var viewData = this.asWritableListMediator.viewLevelData();
        // Get the data from the view level data 
        this.items = viewData.models.slice(0);
    };
    // Note that it is up to the caller to decide how to use the
    // cached value; we need to precisely tell where there is a value in the cache
    // for the corresponding key
    BackboneBackedListPage.prototype.readMediatorFromCache = function (key) {
        return this.mediatorCache.get(key, this.defaultLivePeriod);
    };
    BackboneBackedListPage.prototype.writeMediatorIntoCache = function (key, mediator) {
        this.mediatorCache.set(key, mediator, this.defaultLivePeriod, function (evt) {
            mediator.tearDown();
            return evt;
        });
    };
    BackboneBackedListPage.prototype.addOnCacheExpireHandler = function (key) {
        this._onCacheExpireCallback = function (evt) {
            evt.preventDefault();
            return evt;
        };
        this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
    };
    BackboneBackedListPage.prototype.removeOnCacheExpireHandler = function (key) {
        this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
        this._onCacheExpireCallback = null;
    };
    return BackboneBackedListPage;
}(FullFeatureListPage));

var BackendSettings = /** @class */ (function () {
    function BackendSettings() {
    }
    return BackendSettings;
}());
var BACKEND_SETTINGS = new InjectionToken('Backend Settings');

/*
 * Public API Surface of ngx-mvc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BACKEND_SETTINGS, BackboneBackedListPage, BackendSettings, FullFeatureListPage, NgStoreBackedListPage, PlatformObliviousListPage, adaptAngularToController };
//# sourceMappingURL=polpware-ngx-mvc.js.map
