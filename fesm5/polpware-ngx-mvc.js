import { __extends, __spread, __assign } from 'tslib';
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

var DefListBaseMediator = RxjsPoweredWritableListMediator.extend({
    /* Properties */
    Properties: 'filter,keyword,pageSize',
    /**
     * Override
     *
     * @param settings
     */
    init: function (settings) {
        var self = this;
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
        var self = this;
        self._super(asyncLoaded);
    },
    /**
     * Override
     * so that we can reload data even in the case of cache
     * @param {} fromCache
     */
    startService: function (viewInstance, fromCache) {
        var self = this;
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
        var self = this;
        // target
        var state = self._dataProvider.state;
        state.offset = 0;
        state.keyword = self._keyword || '';
    },
    /**
     * Override
     */
    loadInitData: function () {
        var self = this;
        self.reComputeDataParams();
        return self._super();
    }
});

var DefListBaseController = /** @class */ (function (_super) {
    __extends(DefListBaseController, _super);
    function DefListBaseController(_listSettings) {
        var _this = 
        // If we navigated to this page, we will have an item available as a nav param
        _super.call(this) || this;
        _this._listSettings = _listSettings;
        _this.mediatorCache = _this.getGlobalCache();
        return _this;
    }
    Object.defineProperty(DefListBaseController.prototype, "asDefListBaseMediator", {
        get: function () {
            return this.listMediator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseController.prototype, "fromCache", {
        /**
         * Indicates whether the underlying medicator is built from the previous
         * cache or not.
         */
        get: function () {
            // Get the fromCache value ...
            return this.listMediator ? this.asDefListBaseMediator._formCache : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseController.prototype, "inInitState", {
        /**
         * Indicates whether the underlying medicator is still in the init stage,
         * I.e., the underlying mediator has not conducted any request or not.
         */
        get: function () {
            return this.listMediator ? this.asDefListBaseMediator._isInit : true;
        },
        enumerable: true,
        configurable: true
    });
    DefListBaseController.prototype.getCacheKey = function () {
        return this._listSettings.cacheKey;
    };
    /**
     * Builds the underlying mediator
     * @param keyword The parameter is passed all the way from the
     * onDocumentReady method.
     */
    DefListBaseController.prototype.buildMediator = function (keyword) {
        var backendService = this.getBackendService();
        var backendProvider = backendService.backendProvider;
        var globalDataProvider = null;
        var reDBService = this.getRelationalDB();
        var relDB = reDBService.get();
        // Build collections
        globalDataProvider = relDB.getTable(this._listSettings.tableName).dataProvider();
        // Local data provider
        // The parameter is the endpoint defined by backend.service
        var Ctor = backendProvider.getEndPoint(this._listSettings.endpointName);
        var localDataProvider = new Ctor();
        this.touchLocalDataProvider(localDataProvider);
        // Init data provider 
        localDataProvider.state.pageSize = 40;
        localDataProvider.state.keyword = keyword;
        var filterOptions = globalDataProvider ? {
            added: true,
            removed: true,
            updated: false
        } : {
            added: false,
            removed: false,
            updated: false
        };
        var ctorOptions = {
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
    };
    /**
     * Provides a chance to invoke a derived mediator in the derived controller.
     * @param options
     */
    DefListBaseController.prototype.invokeMediatorCtor = function (options) {
        return new DefListBaseMediator(options);
    };
    /**
     * Provides a chance to update the freshly generated data provider.
     * E.g., we can use this method to update the endpoint url.
     */
    DefListBaseController.prototype.touchLocalDataProvider = function (dataProvider) {
    };
    return DefListBaseController;
}(BackboneBackedListPage));

var _c0 = ["searchControlElem"];
var DefListBaseComponent = /** @class */ (function (_super) {
    __extends(DefListBaseComponent, _super);
    function DefListBaseComponent(listSettings, _spinner, _toastr) {
        var _this = _super.call(this, listSettings) || this;
        _this._spinner = _spinner;
        _this._toastr = _toastr;
        _this.bottomOffset = 0;
        _this.minHeight = 0;
        _this.fixedHeight = 0;
        _this.maxHeight = 0;
        _this.topOffset = 0;
        _this.containerClass = '';
        _this.initHighlightId = '';
        _this.onSelect = new EventEmitter();
        // By default, search is enabled
        _this.searchEnabled = true;
        _this.searchControl = new FormControl('');
        return _this;
    }
    Object.defineProperty(DefListBaseComponent.prototype, "totalCount", {
        // Compute the total number of records from the underlying mediator
        // and further the data provider of the mediator.
        get: function () {
            return this.asDefListBaseMediator.dataProvider().state.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseComponent.prototype, "offset", {
        // As above, compute the loaded number of records so far.
        get: function () {
            return this.asDefListBaseMediator.dataProvider().state.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseComponent.prototype, "spinnerName", {
        get: function () {
            return this._listSettings.spinnerName;
        },
        enumerable: true,
        configurable: true
    });
    DefListBaseComponent.prototype.ngOnInit = function () {
        this._spinner.startToListenSpinner(this.spinnerName);
        this.onDocumentReady();
        this.startObserveSearchKeyword();
    };
    DefListBaseComponent.prototype.ngOnDestroy = function () {
        this._spinner.stopListener(this.spinnerName);
        this.onDocumentDestroy();
        this.stopObserveSearchKeyword();
    };
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
    DefListBaseComponent.prototype.turnOnMediator = function (fromCache, keyword) {
        _super.prototype.turnOnMediator.call(this, fromCache, keyword);
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
    };
    ////////////////////////////////////////////////////////////////////////////////
    // Indicators
    ////////////////////////////////////////////////////////////////////////////////
    // Override
    DefListBaseComponent.prototype.showLoadingIndicator = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    DefListBaseComponent.prototype.hideLoadingIndicator = function () {
        this._spinner.hide(this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.showMoreLoading = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.hideMoreLoading = function () {
        this._spinner.hide(this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.showRefreshingIndicator = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.hideRefreshingIndicator = function () {
        this._spinner.hide(this.spinnerName);
        // Release a message 
        this._toastr.success("List was just refreshed.", 'Success', {
            closeButton: true
        });
    };
    ////////////////////////////////////////////////////////////////////////////////
    // Search state machine
    ////////////////////////////////////////////////////////////////////////////////
    // Start to listen for search keyword change
    DefListBaseComponent.prototype.startObserveSearchKeyword = function () {
        var _this = this;
        this._searchKeywordSubr = this.searchControl.valueChanges.subscribe(function (a) {
            a = (a || '').toLowerCase();
            if (a && a !== _this.keywordInEffect) {
                _this.anyFutureKeyword = a;
            }
            else {
                _this.anyFutureKeyword = '';
            }
        });
    };
    DefListBaseComponent.prototype.stopObserveSearchKeyword = function () {
        this._searchKeywordSubr && this._searchKeywordSubr.unsubscribe();
    };
    // Recomputes the search state
    //
    // 
    DefListBaseComponent.prototype.computeSearchState = function () {
        this.anyFutureKeyword = '';
        this.keywordInEffectState = false;
        this.typeKeywordState = false;
        this.waitForInputState = false;
        var keyword = this.asDefListBaseMediator.keyword();
        if (keyword) {
            keyword = keyword.toLowerCase();
            this.keywordInEffect = keyword;
            this.keywordInEffectState = true;
            // Make sure that the search input has the latest value
            var rhs = this.searchControl.value || '';
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
            var rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs) {
                this.searchControl.setValue('', {
                    emitEvent: false
                });
            }
        }
    };
    // Swtiches to the state for providing
    // the search input control for end users.
    // 
    DefListBaseComponent.prototype.startToTypeKeyword = function () {
        this.anyFutureKeyword = '';
        this.waitForInputState = false;
        this.keywordInEffectState = false;
        this.typeKeywordState = true;
        // Schedule focus behavior in next round of UI updating,
        // in order that the above settings are already in effect.
        setTimeout(function () {
            // TODO: Fix this
            // this.focusFolderSearchInput();
        });
    };
    // Cancel typed keyword and
    // reset to whatever the previous state
    //
    // This operation does not cause new network request.
    DefListBaseComponent.prototype.cancelTypedKeyword = function () {
        this.computeSearchState();
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    };
    // Clear up keyword
    //
    // This operation causes new network request.
    DefListBaseComponent.prototype.clearKeywordInEffect = function () {
        this.asDefListBaseMediator.keyword('');
        this.asDefListBaseMediator.refresh(true);
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    };
    // Starts a new round of search
    //
    // This operation causes new network request.
    DefListBaseComponent.prototype.kickOffSearch = function () {
        var k = this.searchControl.value;
        // TODO: Normalize into lowercase ?
        var currentKeyword = this.asDefListBaseMediator.keyword;
        if (k === currentKeyword) {
            // Nothing to do;
            this.computeSearchState();
            return;
        }
        // Otherwise, move forward to search 
        this.asDefListBaseMediator.keyword(k);
        this.asDefListBaseMediator.refresh(true);
    };
    // Override
    //
    // The extra operation allows for synchronizing the internal state
    // with the user interface.
    DefListBaseComponent.prototype.onItemsReady = function () {
        _super.prototype.onItemsReady.call(this);
        this.computeSearchState();
        if (this.initHighlightId) {
            this.highlight(this.initHighlightId);
        }
    };
    /**
      * Sends a notification back to its parent or client.
      * @param item A data entity.
      */
    DefListBaseComponent.prototype.selectItem = function (item) {
        this.initHighlightId = null;
        this.selected = item;
        this.onSelect.emit(item);
    };
    /**
     * Allows the client to highlight an item by Id.
     * @param id
     */
    DefListBaseComponent.prototype.highlight = function (id) {
        var item = this.items.find(function (a) { return a.id == id; });
        if (item && this.selected !== item) {
            this.selected = item;
        }
    };
    /** @nocollapse */ DefListBaseComponent.ɵfac = function DefListBaseComponent_Factory(t) { ɵɵinvalidFactory(); };
    /** @nocollapse */ DefListBaseComponent.ɵdir = ɵɵdefineDirective({ type: DefListBaseComponent, viewQuery: function DefListBaseComponent_Query(rf, ctx) { if (rf & 1) {
            ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchControlElem = _t.first);
        } }, inputs: { bottomOffset: "bottomOffset", minHeight: "minHeight", fixedHeight: "fixedHeight", maxHeight: "maxHeight", topOffset: "topOffset", containerClass: "containerClass", initHighlightId: "initHighlightId" }, outputs: { onSelect: "onSelect" }, features: [ɵɵInheritDefinitionFeature] });
    return DefListBaseComponent;
}(DefListBaseController));

/*
 * Public API Surface of ngx-mvc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BACKEND_SETTINGS, BackboneBackedListPage, BackendSettings, DefListBaseComponent, DefListBaseController, DefListBaseMediator, FullFeatureListPage, NgStoreBackedListPage, PlatformObliviousListPage, adaptAngularToController };
//# sourceMappingURL=polpware-ngx-mvc.js.map
