/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgStoreListMediator } from '@polpware/fe-mvc';
import { CollectionStore } from '@polpware/fe-data';
// base
import { FullFeatureListPage } from './full-feature-list-page';
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
    tslib_1.__extends(NgStoreBackedListPage, _super);
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
            var w = (/** @type {?} */ (data.items));
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
        var ctorOptions = tslib_1.__assign({}, this.mediatorCtorOptions, { dataProvider: dataProvider });
        /** @type {?} */
        var s = new CollectionStore();
        /** @type {?} */
        var m = new NgStoreListMediator(ctorOptions);
        m.setNgStore(s);
        this.listMediator = m;
        this.listMediator.setUp();
        return Promise.resolve();
    };
    Object.defineProperty(NgStoreBackedListPage.prototype, "asNgStoreListMeidator", {
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
// Note that in the class, please avoid to depend on onNewItemsReady,
// as it is NOT in the update flow.
/**
 * @abstract
 * @template T
 */
export { NgStoreBackedListPage };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    NgStoreBackedListPage.prototype.defaultLivePeriod;
    /**
     * @type {?}
     * @protected
     */
    NgStoreBackedListPage.prototype.mediatorCtorOptions;
    /**
     * @type {?}
     * @protected
     */
    NgStoreBackedListPage.prototype.mediatorCache;
    /**
     * @type {?}
     * @private
     */
    NgStoreBackedListPage.prototype._onCacheExpireCallback;
    /**
     * @type {?}
     * @private
     */
    NgStoreBackedListPage.prototype._storeSubscription;
    /** @type {?} */
    NgStoreBackedListPage.prototype.items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdzdG9yZS1iYWNrZWQtbGlzdC1wYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1tdmMvIiwic291cmNlcyI6WyJsaWIvbXZjL25nc3RvcmUtYmFja2VkLWxpc3QtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU1BLE9BQU8sRUFDSCxtQkFBbUIsRUFFdEIsTUFBTSxrQkFBa0IsQ0FBQztBQU0xQixPQUFPLEVBQ0gsZUFBZSxFQUNsQixNQUFNLG1CQUFtQixDQUFDOztBQVEzQixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztBQUsvRDs7Ozs7Ozs7SUFDWSxpREFBbUI7SUFhM0I7UUFBQSxZQUNJLGlCQUFPLFNBU1Y7UUFyQlMsdUJBQWlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQWNqQyxLQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDdkIsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDO1FBQ0YsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzs7SUFDdkMsQ0FBQztJQUVELFdBQVc7Ozs7Ozs7SUFDRCw4Q0FBYzs7Ozs7OztJQUF4QixVQUF5QixTQUFrQjtRQUEzQyxpQkFVQztRQVRHLGlCQUFNLGNBQWMsWUFBQyxTQUFTLENBQUMsQ0FBQzs7WUFFMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUU7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJOztnQkFDaEQsQ0FBQyxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLEVBQU87WUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZiwyQ0FBMkM7WUFDM0MsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7Ozs7OztJQUNELCtDQUFlOzs7Ozs7SUFBekI7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsaUJBQU0sZUFBZSxXQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7Ozs7Ozs7SUFDRCw2Q0FBYTs7Ozs7OztJQUF2QixVQUF3QixZQUFpQjs7WUFFL0IsV0FBVyx3QkFDVixJQUFJLENBQUMsbUJBQW1CLElBQzNCLFlBQVksRUFBRSxZQUFZLEdBQzdCOztZQUVLLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBSzs7WUFFNUIsQ0FBQyxHQUErQixJQUFJLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztRQUMxRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNCQUFjLHdEQUFxQjs7Ozs7UUFBbkM7O2dCQUNVLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWTtZQUMzQixPQUFPLG1CQUFBLENBQUMsRUFBOEIsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTs7Ozs7O0lBRVMscURBQXFCOzs7OztJQUEvQixVQUFnQyxHQUFXO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7Ozs7SUFFUyxzREFBc0I7Ozs7OztJQUFoQyxVQUFpQyxHQUFXLEVBQUUsS0FBaUM7UUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxHQUFHO1lBQzNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRVMsdURBQXVCOzs7OztJQUFqQyxVQUFrQyxHQUFXO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxVQUFTLEdBQUc7WUFDdEMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Ozs7O0lBRVMsMERBQTBCOzs7OztJQUFwQyxVQUFxQyxHQUFXO1FBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixXQUFXO0lBQ1gseURBQXlEOzs7Ozs7OztJQUN6RCwrQ0FBZTs7Ozs7Ozs7SUFBZixVQUFnQixLQUFVO1FBQ3RCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTCw0QkFBQztBQUFELENBQUMsQUFyR0QsQ0FDWSxtQkFBbUIsR0FvRzlCOzs7Ozs7Ozs7Ozs7O0lBbEdHLGtEQUFxQzs7Ozs7SUFHckMsb0RBQXdEOzs7OztJQUV4RCw4Q0FBeUU7Ozs7O0lBQ3pFLHVEQUFvQzs7Ozs7SUFFcEMsbURBQXlDOztJQUN6QyxzQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgICBJTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnNcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgTmdTdG9yZUxpc3RNZWRpYXRvcixcbiAgICBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpY1xufSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHtcbiAgICBJQ29sbGVjdGlvbkl0ZW1cbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5pbXBvcnQge1xuICAgIENvbGxlY3Rpb25TdG9yZVxufSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG5cblxuaW1wb3J0IHtcbiAgICBJU2xpZGluZ0V4cGlyZUNhY2hlXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuLy8gYmFzZVxuaW1wb3J0IHsgRnVsbEZlYXR1cmVMaXN0UGFnZSB9IGZyb20gJy4vZnVsbC1mZWF0dXJlLWxpc3QtcGFnZSc7XG5cbi8vIE5vdGUgdGhhdCBpbiB0aGUgY2xhc3MsIHBsZWFzZSBhdm9pZCB0byBkZXBlbmQgb24gb25OZXdJdGVtc1JlYWR5LFxuLy8gYXMgaXQgaXMgTk9UIGluIHRoZSB1cGRhdGUgZmxvdy5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nU3RvcmVCYWNrZWRMaXN0UGFnZTxUIGV4dGVuZHMgSUNvbGxlY3Rpb25JdGVtPlxuICAgIGV4dGVuZHMgRnVsbEZlYXR1cmVMaXN0UGFnZSB7XG5cbiAgICBwcm90ZWN0ZWQgZGVmYXVsdExpdmVQZXJpb2QgPSA2MCAqIDU7XG5cbiAgICAvLyBNb3JlIGNvbmZpZ3VyYXRpb24gZm9yIGNvbnN0cnVjdGluZyBkYXRhcHJvdmlkZXJcbiAgICBwcm90ZWN0ZWQgbWVkaWF0b3JDdG9yT3B0aW9uczogSUxpc3RNZWRpYXRvckN0b3JPcHRpb25zO1xuXG4gICAgcHJvdGVjdGVkIG1lZGlhdG9yQ2FjaGU6IElTbGlkaW5nRXhwaXJlQ2FjaGU8SU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWM+O1xuICAgIHByaXZhdGUgX29uQ2FjaGVFeHBpcmVDYWxsYmFjazogYW55O1xuXG4gICAgcHJpdmF0ZSBfc3RvcmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwdWJsaWMgaXRlbXM6IFRbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubWVkaWF0b3JDdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVzZU1vZGVsOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlSW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVSZWZyZXNoOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCB0dXJuT25NZWRpYXRvcihmcm9tQ2FjaGU6IGJvb2xlYW4pIHtcbiAgICAgICAgc3VwZXIudHVybk9uTWVkaWF0b3IoZnJvbUNhY2hlKTtcblxuICAgICAgICBjb25zdCBzdG9yZSA9IHRoaXMuYXNOZ1N0b3JlTGlzdE1laWRhdG9yLmdldE5nU3RvcmUoKTtcbiAgICAgICAgdGhpcy5fc3RvcmVTdWJzY3JpcHRpb24gPSBzdG9yZS5nZXRTdGF0ZSgpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdyA9IGRhdGEuaXRlbXMgYXMgVFtdO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHc7XG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgd2UgbXVzdCBjYWxsIG9uSXRlbXNSZWFkeSAuLi4gXG4gICAgICAgICAgICB0aGlzLm9uSXRlbXNSZWFkeSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCB0dXJuT2ZmTWVkaWF0b3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1cGVyLnR1cm5PZmZNZWRpYXRvcigpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVkaWF0b3IoZGF0YVByb3ZpZGVyOiBhbnkpOiBQcm9taXNlTGlrZTx2b2lkPiB7XG5cbiAgICAgICAgY29uc3QgY3Rvck9wdGlvbnM6IElMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWF0b3JDdG9yT3B0aW9ucyxcbiAgICAgICAgICAgIGRhdGFQcm92aWRlcjogZGF0YVByb3ZpZGVyXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcyA9IG5ldyBDb2xsZWN0aW9uU3RvcmU8VD4oKTtcblxuICAgICAgICBjb25zdCBtOiBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYyA9IG5ldyBOZ1N0b3JlTGlzdE1lZGlhdG9yKGN0b3JPcHRpb25zKTtcbiAgICAgICAgbS5zZXROZ1N0b3JlKHMpO1xuXG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yID0gbTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc2V0VXAoKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhc05nU3RvcmVMaXN0TWVpZGF0b3IoKTogSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5saXN0TWVkaWF0b3I7XG4gICAgICAgIHJldHVybiBtIGFzIElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFkTWVkaWF0b3JGcm9tQ2FjaGUoa2V5OiBzdHJpbmcpOiBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhdG9yQ2FjaGUuZ2V0KGtleSwgdGhpcy5kZWZhdWx0TGl2ZVBlcmlvZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdyaXRlTWVkaWF0b3JJbnRvQ2FjaGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuc2V0KGtleSwgdmFsdWUsIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QsIChldnQpID0+IHtcbiAgICAgICAgICAgIHZhbHVlLnRlYXJEb3duKCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLmFkZE9uRXhwaXJlSGFuZGxlcihrZXksIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5ybU9uRXhwaXJlSGFuZGxlcihrZXksIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvbi5cbiAgICAvLyBPdmVycmlkZVxuICAgIC8vIE5vdGUgdGhhdCBpbiB0aGUgZGVyaXZlZCBjbGFzcyB3ZSBkbyBOT1QgZGVwZW5kIG9uIGl0LlxuICAgIG9uTmV3SXRlbXNSZWFkeShpdGVtczogVFtdKSB7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbn1cblxuIl19