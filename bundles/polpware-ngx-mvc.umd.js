(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polpware/fe-mvc'), require('@polpware/fe-data'), require('@polpware/fe-dependencies'), require('@polpware/fe-utilities'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-mvc', ['exports', '@polpware/fe-mvc', '@polpware/fe-data', '@polpware/fe-dependencies', '@polpware/fe-utilities', '@angular/core'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-mvc'] = {}), global.feMvc, global.feData, global.feDependencies, global.feUtilities, global.ng.core));
}(this, (function (exports, feMvc, feData, feDependencies, feUtilities, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
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
    var _ = feDependencies.underscore;
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

    var _$1 = feDependencies.underscore;
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
            var s = new feData.CollectionStore();
            var m = new feMvc.NgStoreListMediator(ctorOptions);
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
            var s = new feMvc.WritableListMediator(ctorOptions);
            this.listMediator = s;
            this.listMediator.setUp();
        };
        BackboneBackedListPage.prototype.useMediatorWithGlobalDataProvider = function (localDataProvider, globalDataProvider, localOptions, globalOptions) {
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
            feUtilities.pushArray(this.items, items);
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
    var BACKEND_SETTINGS = new core.InjectionToken('Backend Settings');

    exports.BACKEND_SETTINGS = BACKEND_SETTINGS;
    exports.BackboneBackedListPage = BackboneBackedListPage;
    exports.BackendSettings = BackendSettings;
    exports.FullFeatureListPage = FullFeatureListPage;
    exports.NgStoreBackedListPage = NgStoreBackedListPage;
    exports.PlatformObliviousListPage = PlatformObliviousListPage;
    exports.adaptAngularToController = adaptAngularToController;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-mvc.umd.js.map
