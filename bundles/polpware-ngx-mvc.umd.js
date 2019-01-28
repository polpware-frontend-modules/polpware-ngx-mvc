(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polpware/fe-data'), require('@polpware/fe-dependencies'), require('@polpware/fe-utilities'), require('@polpware/fe-mvc'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-mvc', ['exports', '@polpware/fe-data', '@polpware/fe-dependencies', '@polpware/fe-utilities', '@polpware/fe-mvc', '@angular/core'], factory) :
    (factory((global.polpware = global.polpware || {}, global.polpware['ngx-mvc'] = {}),global.feData,global.hInterface,global.feUtilities,global.feMvc,global.ng.core));
}(this, (function (exports,feData,hInterface,feUtilities,feMvc,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ PlatformObliviousListPage = /** @class */ (function () {
        function PlatformObliviousListPage() {
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
        PlatformObliviousListPage.prototype.turnOnMediator = /**
         * @protected
         * @param {?} fromCache
         * @param {...?} rest
         * @return {?}
         */
            function (fromCache) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                /** @type {?} */
                var viewInstance = this.buildViewInstance();
                this.listMediator.startService(viewInstance, fromCache);
            };
        /**
         * @protected
         * @return {?}
         */
        PlatformObliviousListPage.prototype.turnOffMediator = /**
         * @protected
         * @return {?}
         */
            function () {
                this.listMediator.stopService();
            };
        return PlatformObliviousListPage;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _$1 = hInterface.underscore;
    /** @type {?} */
    var noop = _$1.noop;
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
    var /**
     * @abstract
     */ FullFeatureListPage = /** @class */ (function (_super) {
        __extends(FullFeatureListPage, _super);
        function FullFeatureListPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.onDocumentReady = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // Cache will be provided in its derived class
                this.ensureDataProvider.apply(this, __spread(args));
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.onDocumentDestroy = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                // Cache will be provided in its derived class
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.turnOffMediator();
                this.afterMediatorOff();
            };
        // May be not needed. 
        // May be not needed. 
        /**
         * @protected
         * @param {?} dataProvider
         * @return {?}
         */
        FullFeatureListPage.prototype.onDataProviderReady =
            // May be not needed. 
            /**
             * @protected
             * @param {?} dataProvider
             * @return {?}
             */
            function (dataProvider) {
                var _this = this;
                this.buildMediator(dataProvider).then(function () {
                    _this.turnOnMediator(false);
                    _this.afterMediatorOn();
                });
            };
        // Override
        // Override
        /**
         * @protected
         * @return {?}
         */
        FullFeatureListPage.prototype.buildViewInstance =
            // Override
            /**
             * @protected
             * @return {?}
             */
            function () {
                return adaptAngularToController({
                    $scope: this
                });
            };
        /**
         * @return {?}
         */
        FullFeatureListPage.prototype.doRefresh = /**
         * @return {?}
         */
            function () {
                // Trigger refresh
                if (this.callbacks.onRefresh) {
                    this.callbacks.onRefresh();
                }
            };
        /**
         * @return {?}
         */
        FullFeatureListPage.prototype.doInfinite = /**
         * @return {?}
         */
            function () {
                // Trigger loading more
                if (this.callbacks.onInfinite) {
                    this.callbacks.onInfinite();
                }
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.showLoadingIndicator = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.hideLoadingIndicator = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        /**
         * @param {?} seconds
         * @return {?}
         */
        FullFeatureListPage.prototype.setLoadingIndicatorDelay = /**
         * @param {?} seconds
         * @return {?}
         */
            function (seconds) { };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.showMoreLoading = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.hideMoreLoading = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.showRefreshingIndicator = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        /**
         * @param {...?} args
         * @return {?}
         */
        FullFeatureListPage.prototype.hideRefreshingIndicator = /**
         * @param {...?} args
         * @return {?}
         */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        return FullFeatureListPage;
    }(PlatformObliviousListPage));

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
    var  
    // Note that in the class, please avoid to depend on onNewItemsReady,
    // as it is NOT in the update flow.
    /**
     * @abstract
     * @template T
     */
    NgStoreBackedListPage = /** @class */ (function (_super) {
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
        // Override
        /**
         * @protected
         * @param {?} fromCache
         * @return {?}
         */
        NgStoreBackedListPage.prototype.turnOnMediator =
            // Override
            /**
             * @protected
             * @param {?} fromCache
             * @return {?}
             */
            function (fromCache) {
                var _this = this;
                _super.prototype.turnOnMediator.call(this, fromCache);
                /** @type {?} */
                var store = this.asNgStoreListMeidator.getNgStore();
                this._storeSubscription = store.getState().subscribe(function (data) {
                    /** @type {?} */
                    var w = ( /** @type {?} */(data.items));
                    _this.items = w;
                    // Note that we must call onItemsReady ... 
                    _this.onItemsReady();
                });
            };
        // Override
        // Override
        /**
         * @protected
         * @return {?}
         */
        NgStoreBackedListPage.prototype.turnOffMediator =
            // Override
            /**
             * @protected
             * @return {?}
             */
            function () {
                this._storeSubscription.unsubscribe();
                _super.prototype.turnOffMediator.call(this);
            };
        // Override
        // Override
        /**
         * @protected
         * @param {?} dataProvider
         * @return {?}
         */
        NgStoreBackedListPage.prototype.buildMediator =
            // Override
            /**
             * @protected
             * @param {?} dataProvider
             * @return {?}
             */
            function (dataProvider) {
                /** @type {?} */
                var ctorOptions = __assign({}, this.mediatorCtorOptions, { dataProvider: dataProvider });
                /** @type {?} */
                var s = new feData.CollectionStore();
                /** @type {?} */
                var m = new feMvc.NgStoreListMediator(ctorOptions);
                m.setNgStore(s);
                this.listMediator = m;
                this.listMediator.setUp();
                return Promise.resolve();
            };
        Object.defineProperty(NgStoreBackedListPage.prototype, "asNgStoreListMeidator", {
            get: /**
             * @protected
             * @return {?}
             */ function () {
                /** @type {?} */
                var m = this.listMediator;
                return ( /** @type {?} */(m));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        NgStoreBackedListPage.prototype.readMediatorFromCache = /**
         * @protected
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this.mediatorCache.get(key, this.defaultLivePeriod);
            };
        /**
         * @protected
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        NgStoreBackedListPage.prototype.writeMediatorIntoCache = /**
         * @protected
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                this.mediatorCache.set(key, value, this.defaultLivePeriod, function (evt) {
                    value.tearDown();
                    return evt;
                });
            };
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        NgStoreBackedListPage.prototype.addOnCacheExpireHandler = /**
         * @protected
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this._onCacheExpireCallback = function (evt) {
                    evt.preventDefault();
                    return evt;
                };
                this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
            };
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        NgStoreBackedListPage.prototype.removeOnCacheExpireHandler = /**
         * @protected
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
                this._onCacheExpireCallback = null;
            };
        // Default implementation.
        // Override
        // Note that in the derived class we do NOT depend on it.
        // Default implementation.
        // Override
        // Note that in the derived class we do NOT depend on it.
        /**
         * @param {?} items
         * @return {?}
         */
        NgStoreBackedListPage.prototype.onNewItemsReady =
            // Default implementation.
            // Override
            // Note that in the derived class we do NOT depend on it.
            /**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                return items;
            };
        return NgStoreBackedListPage;
    }(FullFeatureListPage));

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
    var  
    // Note that we use ICollectionItem rather than IModelLike,
    // because we assume the least requirement for the input type.
    // Precisely, the only requirement is that the collection item has an
    // id field. 
    /**
     * @abstract
     * @template T
     */
    BackboneBackedListPage = /** @class */ (function (_super) {
        __extends(BackboneBackedListPage, _super);
        function BackboneBackedListPage() {
            var _this = _super.call(this) || this;
            _this.defaultLivePeriod = 60 * 5;
            _this.items = [];
            _this._onCacheExpireCallback = null;
            return _this;
        }
        Object.defineProperty(BackboneBackedListPage.prototype, "asWritableListMediator", {
            get: /**
             * @protected
             * @return {?}
             */ function () {
                /** @type {?} */
                var m = this.listMediator;
                return ( /** @type {?} */(m));
            },
            enumerable: true,
            configurable: true
        });
        // Default implementation for using backbone
        // Default implementation for using backbone
        /**
         * @protected
         * @param {?} localDataProvider
         * @param {?=} localOptions
         * @return {?}
         */
        BackboneBackedListPage.prototype.useMediatorWithOnlyLocalDataProvider =
            // Default implementation for using backbone
            /**
             * @protected
             * @param {?} localDataProvider
             * @param {?=} localOptions
             * @return {?}
             */
            function (localDataProvider, localOptions) {
                /** @type {?} */
                var ctorOptions = {
                    dataProvider: localDataProvider,
                    useModel: true,
                    enableInfinite: true,
                    enableRefresh: true
                };
                /** @type {?} */
                var s = new feMvc.WritableListMediator(ctorOptions);
                this.listMediator = s;
                this.listMediator.setUp();
            };
        /**
         * @protected
         * @param {?} localDataProvider
         * @param {?} globalDataProvider
         * @param {?=} localOptions
         * @param {?=} globalOptions
         * @return {?}
         */
        BackboneBackedListPage.prototype.useMediatorWithGlobalDataProvider = /**
         * @protected
         * @param {?} localDataProvider
         * @param {?} globalDataProvider
         * @param {?=} localOptions
         * @param {?=} globalOptions
         * @return {?}
         */
            function (localDataProvider, globalDataProvider, localOptions, globalOptions) {
                /** @type {?} */
                var mediator = new feMvc.RxjsPoweredWritableListMediator({
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
        // Invoked after the new mediator is constructure 
        /**
         * @protected
         * @param {...?} args
         * @return {?}
         */
        BackboneBackedListPage.prototype.postUseFreshMediator =
            // Invoked after the new mediator is constructure 
            /**
             * @protected
             * @param {...?} args
             * @return {?}
             */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.turnOnMediator.apply(this, __spread([false], args));
                this.afterMediatorOn();
            };
        // Invoked after the cached mediator is used 
        // Invoked after the cached mediator is used 
        /**
         * @protected
         * @param {...?} args
         * @return {?}
         */
        BackboneBackedListPage.prototype.postUseCachedMediator =
            // Invoked after the cached mediator is used 
            /**
             * @protected
             * @param {...?} args
             * @return {?}
             */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.turnOnMediator.apply(this, __spread([true], args));
                this.afterMediatorOn();
            };
        // Override to support cache
        // Override to support cache
        /**
         * @protected
         * @param {...?} args
         * @return {?}
         */
        BackboneBackedListPage.prototype.ensureDataProvider =
            // Override to support cache
            /**
             * @protected
             * @param {...?} args
             * @return {?}
             */
            function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (this.mediatorCache) {
                    /** @type {?} */
                    var cacheKey_1 = this.getCacheKey.apply(this, __spread(args));
                    /** @type {?} */
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
        // Override
        /**
         * @protected
         * @return {?}
         */
        BackboneBackedListPage.prototype.afterMediatorOn =
            // Override
            /**
             * @protected
             * @return {?}
             */
            function () {
                if (this.mediatorCache) {
                    // In this case, we do not Provide any inputs 
                    /** @type {?} */
                    var cacheKey = this.getCacheKey();
                    this.addOnCacheExpireHandler(cacheKey);
                }
            };
        // Override
        // Override
        /**
         * @protected
         * @return {?}
         */
        BackboneBackedListPage.prototype.afterMediatorOff =
            // Override
            /**
             * @protected
             * @return {?}
             */
            function () {
                if (this.mediatorCache) {
                    // In this case, we do not Provide any inputs
                    /** @type {?} */
                    var cacheKey = this.getCacheKey();
                    this.removeOnCacheExpireHandler(cacheKey);
                }
            };
        // Default implementation
        // Default implementation
        /**
         * @param {?} items
         * @return {?}
         */
        BackboneBackedListPage.prototype.onNewItemsReady =
            // Default implementation
            /**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                feUtilities.pushArray(this.items, items);
                return items;
            };
        // Default implementation.
        // Default implementation.
        /**
         * @return {?}
         */
        BackboneBackedListPage.prototype.onItemsReady =
            // Default implementation.
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var viewData = this.asWritableListMediator.viewLevelData();
                // Get the data from the view level data 
                this.items = viewData.models.slice(0);
            };
        // Note that it is up to the caller to decide how to use the
        // cached value; we need to precisely tell where there is a value in the cache
        // for the corresponding key
        // Note that it is up to the caller to decide how to use the
        // cached value; we need to precisely tell where there is a value in the cache
        // for the corresponding key
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        BackboneBackedListPage.prototype.readMediatorFromCache =
            // Note that it is up to the caller to decide how to use the
            // cached value; we need to precisely tell where there is a value in the cache
            // for the corresponding key
            /**
             * @protected
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return this.mediatorCache.get(key, this.defaultLivePeriod);
            };
        /**
         * @protected
         * @param {?} key
         * @param {?} mediator
         * @return {?}
         */
        BackboneBackedListPage.prototype.writeMediatorIntoCache = /**
         * @protected
         * @param {?} key
         * @param {?} mediator
         * @return {?}
         */
            function (key, mediator) {
                this.mediatorCache.set(key, mediator, this.defaultLivePeriod, function (evt) {
                    mediator.tearDown();
                    return evt;
                });
            };
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        BackboneBackedListPage.prototype.addOnCacheExpireHandler = /**
         * @protected
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this._onCacheExpireCallback = function (evt) {
                    evt.preventDefault();
                    return evt;
                };
                this.mediatorCache.addOnExpireHandler(key, this._onCacheExpireCallback);
            };
        /**
         * @protected
         * @param {?} key
         * @return {?}
         */
        BackboneBackedListPage.prototype.removeOnCacheExpireHandler = /**
         * @protected
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this.mediatorCache.rmOnExpireHandler(key, this._onCacheExpireCallback);
                this._onCacheExpireCallback = null;
            };
        return BackboneBackedListPage;
    }(FullFeatureListPage));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BackendSettings = /** @class */ (function () {
        function BackendSettings() {
        }
        return BackendSettings;
    }());
    /** @type {?} */
    var BACKEND_SETTINGS = new core.InjectionToken('Backend Settings');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgStoreBackedListPage = NgStoreBackedListPage;
    exports.adaptAngularToController = adaptAngularToController;
    exports.PlatformObliviousListPage = PlatformObliviousListPage;
    exports.BackboneBackedListPage = BackboneBackedListPage;
    exports.FullFeatureListPage = FullFeatureListPage;
    exports.BackendSettings = BackendSettings;
    exports.BACKEND_SETTINGS = BACKEND_SETTINGS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=polpware-ngx-mvc.umd.js.map