/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { pushArray } from '@polpware/fe-utilities';
import { WritableListMediator } from '@polpware/fe-mvc';
import { RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
// base
import { FullFeatureListPage } from './full-feature-list-page';
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
    tslib_1.__extends(BackboneBackedListPage, _super);
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
         */
        function () {
            /** @type {?} */
            var m = this.listMediator;
            return (/** @type {?} */ (m));
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
        var s = new WritableListMediator(ctorOptions);
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
        this.turnOnMediator.apply(this, tslib_1.__spread([false], args));
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
        this.turnOnMediator.apply(this, tslib_1.__spread([true], args));
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
            var cacheKey_1 = this.getCacheKey.apply(this, tslib_1.__spread(args));
            /** @type {?} */
            var inCache = false;
            /** @type {?} */
            var mediator = this.readMediatorFromCache(cacheKey_1);
            if (!mediator) { // Not in cache
                this.buildMediator.apply(// Not in cache
                this, tslib_1.__spread(args)).then(function () {
                    // set up in the cache
                    _this.writeMediatorIntoCache(cacheKey_1, _this.asWritableListMediator);
                    // case 1:
                    _this.postUseFreshMediator.apply(_this, tslib_1.__spread([true], args));
                });
            }
            else { // In cache
                inCache = true;
                this.listMediator = mediator;
                // Case 2:
                this.postUseCachedMediator.apply(this, tslib_1.__spread(args));
            }
        }
        else {
            this.buildMediator.apply(this, tslib_1.__spread(args)).then(function () {
                // Case 3: 
                _this.postUseFreshMediator.apply(_this, tslib_1.__spread([false], args));
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
        pushArray(this.items, items);
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
// Note that we use ICollectionItem rather than IModelLike,
// because we assume the least requirement for the input type.
// Precisely, the only requirement is that the collection item has an
// id field. 
/**
 * @abstract
 * @template T
 */
export { BackboneBackedListPage };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    BackboneBackedListPage.prototype.defaultLivePeriod;
    /**
     * @type {?}
     * @protected
     */
    BackboneBackedListPage.prototype.mediatorCache;
    /**
     * @type {?}
     * @private
     */
    BackboneBackedListPage.prototype._onCacheExpireCallback;
    /** @type {?} */
    BackboneBackedListPage.prototype.items;
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    BackboneBackedListPage.prototype.getCacheKey = function (args) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2JvbmUtYmFja2VkLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9iYWNrYm9uZS1iYWNrZWQtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFDSCxvQkFBb0IsRUFHdkIsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQ0gsK0JBQStCLEVBQ2xDLE1BQU0sa0JBQWtCLENBQUM7O0FBVzFCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7QUFPL0Q7Ozs7Ozs7Ozs7SUFDWSxrREFBbUI7SUFTM0I7UUFBQSxZQUNJLGlCQUFPLFNBSVY7UUFaUyx1QkFBaUIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBVWpDLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7O0lBQ3ZDLENBQUM7SUFNRCxzQkFBYywwREFBc0I7Ozs7O1FBQXBDOztnQkFDVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVk7WUFDM0IsT0FBTyxtQkFBQSxDQUFDLEVBQStCLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFRCw0Q0FBNEM7Ozs7Ozs7O0lBQ2xDLHFFQUFvQzs7Ozs7Ozs7SUFBOUMsVUFBK0MsaUJBQXNCLEVBQUUsWUFBcUI7O1lBRWxGLFdBQVcsR0FBcUM7WUFDbEQsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCOztZQUVLLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FB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RyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFUyx3REFBdUI7Ozs7O0lBQWpDLFVBQWtDLEdBQVc7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVMsR0FBRztZQUN0QyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDckIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7Ozs7SUFFUywyREFBMEI7Ozs7O0lBQXBDLFVBQXFDLEdBQVc7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUwsNkJBQUM7QUFBRCxDQUFDLEFBektELENBQ1ksbUJBQW1CLEdBd0s5Qjs7Ozs7Ozs7Ozs7Ozs7O0lBdEtHLG1EQUFxQzs7Ozs7SUFFckMsK0NBQTBFOzs7OztJQUMxRSx3REFBb0M7O0lBRXBDLHVDQUFrQjs7Ozs7OztJQVdsQixtRUFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSVZpZXdJbnN0YW5jZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQgeyBwdXNoQXJyYXkgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuaW1wb3J0IHtcbiAgICBXcml0YWJsZUxpc3RNZWRpYXRvcixcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucyxcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWNcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgUnhqc1Bvd2VyZWRXcml0YWJsZUxpc3RNZWRpYXRvclxufSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHtcbiAgICBJQ29sbGVjdGlvbkl0ZW1cbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5pbXBvcnQge1xuICAgIElTbGlkaW5nRXhwaXJlQ2FjaGVcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG4vLyBiYXNlXG5pbXBvcnQgeyBGdWxsRmVhdHVyZUxpc3RQYWdlIH0gZnJvbSAnLi9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlJztcblxuLy8gTm90ZSB0aGF0IHdlIHVzZSBJQ29sbGVjdGlvbkl0ZW0gcmF0aGVyIHRoYW4gSU1vZGVsTGlrZSxcbi8vIGJlY2F1c2Ugd2UgYXNzdW1lIHRoZSBsZWFzdCByZXF1aXJlbWVudCBmb3IgdGhlIGlucHV0IHR5cGUuXG4vLyBQcmVjaXNlbHksIHRoZSBvbmx5IHJlcXVpcmVtZW50IGlzIHRoYXQgdGhlIGNvbGxlY3Rpb24gaXRlbSBoYXMgYW5cbi8vIGlkIGZpZWxkLiBcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhY2tib25lQmFja2VkTGlzdFBhZ2U8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT5cbiAgICBleHRlbmRzIEZ1bGxGZWF0dXJlTGlzdFBhZ2Uge1xuXG4gICAgcHJvdGVjdGVkIGRlZmF1bHRMaXZlUGVyaW9kID0gNjAgKiA1O1xuXG4gICAgcHJvdGVjdGVkIG1lZGlhdG9yQ2FjaGU6IElTbGlkaW5nRXhwaXJlQ2FjaGU8SVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljPjtcbiAgICBwcml2YXRlIF9vbkNhY2hlRXhwaXJlQ2FsbGJhY2s6IGFueTtcblxuICAgIHB1YmxpYyBpdGVtczogVFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFdlIHVzZSBhIGZ1bmN0b24gdG8gY29tcHV0ZSBjYWNoZUtleSwgc28gdGhhdCB3ZSBjYW5cbiAgICAvLyBjb21wdXRlIHRoZSBjYWNoZSBrZXkgd2l0aCBtb3JlIGlucHV0cy4gXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldENhY2hlS2V5KC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIGdldCBhc1dyaXRhYmxlTGlzdE1lZGlhdG9yKCk6IElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmxpc3RNZWRpYXRvcjtcbiAgICAgICAgcmV0dXJuIG0gYXMgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZm9yIHVzaW5nIGJhY2tib25lXG4gICAgcHJvdGVjdGVkIHVzZU1lZGlhdG9yV2l0aE9ubHlMb2NhbERhdGFQcm92aWRlcihsb2NhbERhdGFQcm92aWRlcjogYW55LCBsb2NhbE9wdGlvbnM/OiBvYmplY3QpIHtcblxuICAgICAgICBjb25zdCBjdG9yT3B0aW9uczogSVdyaXRhYmxlTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGxvY2FsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVJbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZVJlZnJlc2g6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzID0gbmV3IFdyaXRhYmxlTGlzdE1lZGlhdG9yKGN0b3JPcHRpb25zKTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBzO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1c2VNZWRpYXRvcldpdGhHbG9iYWxEYXRhUHJvdmlkZXIobG9jYWxEYXRhUHJvdmlkZXI6IGFueSwgZ2xvYmFsRGF0YVByb3ZpZGVyOiBhbnksXG4gICAgICAgIGxvY2FsT3B0aW9ucz86IG9iamVjdCwgZ2xvYmFsT3B0aW9ucz86IG9iamVjdCkge1xuXG4gICAgICAgIGNvbnN0IG1lZGlhdG9yID0gbmV3IFJ4anNQb3dlcmVkV3JpdGFibGVMaXN0TWVkaWF0b3Ioe1xuICAgICAgICAgICAgZ2xvYmFsUHJvdmlkZXI6IGdsb2JhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIGZpbHRlckZsYWdzOiB7XG4gICAgICAgICAgICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFQcm92aWRlcjogbG9jYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICB1c2VNb2RlbDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIG5ldyBtZWRpYXRvciBpcyBjb25zdHJ1Y3R1cmUgXG4gICAgcHJvdGVjdGVkIHBvc3RVc2VGcmVzaE1lZGlhdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMudHVybk9uTWVkaWF0b3IoZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLmFmdGVyTWVkaWF0b3JPbigpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIGNhY2hlZCBtZWRpYXRvciBpcyB1c2VkIFxuICAgIHByb3RlY3RlZCBwb3N0VXNlQ2FjaGVkTWVkaWF0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy50dXJuT25NZWRpYXRvcih0cnVlLCAuLi5hcmdzKTtcbiAgICAgICAgdGhpcy5hZnRlck1lZGlhdG9yT24oKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSB0byBzdXBwb3J0IGNhY2hlXG4gICAgcHJvdGVjdGVkIGVuc3VyZURhdGFQcm92aWRlciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYXRvckNhY2hlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSguLi5hcmdzKTtcbiAgICAgICAgICAgIGxldCBpbkNhY2hlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lZGlhdG9yID0gdGhpcy5yZWFkTWVkaWF0b3JGcm9tQ2FjaGUoY2FjaGVLZXkpO1xuXG4gICAgICAgICAgICBpZiAoIW1lZGlhdG9yKSB7IC8vIE5vdCBpbiBjYWNoZVxuXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZE1lZGlhdG9yKC4uLmFyZ3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXAgaW4gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVNZWRpYXRvckludG9DYWNoZShjYWNoZUtleSwgdGhpcy5hc1dyaXRhYmxlTGlzdE1lZGlhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUZyZXNoTWVkaWF0b3IodHJ1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIEluIGNhY2hlXG5cbiAgICAgICAgICAgICAgICBpbkNhY2hlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUNhY2hlZE1lZGlhdG9yKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGRNZWRpYXRvciguLi5hcmdzKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIENhc2UgMzogXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0VXNlRnJlc2hNZWRpYXRvcihmYWxzZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPbigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWF0b3JDYWNoZSkge1xuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBkbyBub3QgUHJvdmlkZSBhbnkgaW5wdXRzIFxuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLmFkZE9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPZmYoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG8gbm90IFByb3ZpZGUgYW55IGlucHV0c1xuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICAgIHB1YmxpYyBvbk5ld0l0ZW1zUmVhZHkoaXRlbXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcHVzaEFycmF5KHRoaXMuaXRlbXMsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uXG4gICAgb25JdGVtc1JlYWR5KCkge1xuICAgICAgICBjb25zdCB2aWV3RGF0YSA9IHRoaXMuYXNXcml0YWJsZUxpc3RNZWRpYXRvci52aWV3TGV2ZWxEYXRhKCk7XG4gICAgICAgIC8vIEdldCB0aGUgZGF0YSBmcm9tIHRoZSB2aWV3IGxldmVsIGRhdGEgXG4gICAgICAgIHRoaXMuaXRlbXMgPSB2aWV3RGF0YS5tb2RlbHMuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IGl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZGVjaWRlIGhvdyB0byB1c2UgdGhlXG4gICAgLy8gY2FjaGVkIHZhbHVlOyB3ZSBuZWVkIHRvIHByZWNpc2VseSB0ZWxsIHdoZXJlIHRoZXJlIGlzIGEgdmFsdWUgaW4gdGhlIGNhY2hlXG4gICAgLy8gZm9yIHRoZSBjb3JyZXNwb25kaW5nIGtleVxuICAgIHByb3RlY3RlZCByZWFkTWVkaWF0b3JGcm9tQ2FjaGUoa2V5OiBzdHJpbmcpOiBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYXRvckNhY2hlLmdldChrZXksIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3cml0ZU1lZGlhdG9ySW50b0NhY2hlKGtleTogc3RyaW5nLCBtZWRpYXRvcjogSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5zZXQoa2V5LCBtZWRpYXRvciwgdGhpcy5kZWZhdWx0TGl2ZVBlcmlvZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgbWVkaWF0b3IudGVhckRvd24oKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuYWRkT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLnJtT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbn1cblxuIl19