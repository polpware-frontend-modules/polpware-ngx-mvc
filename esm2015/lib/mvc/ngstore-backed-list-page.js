/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class NgStoreBackedListPage extends FullFeatureListPage {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdzdG9yZS1iYWNrZWQtbGlzdC1wYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1tdmMvIiwic291cmNlcyI6WyJsaWIvbXZjL25nc3RvcmUtYmFja2VkLWxpc3QtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILG1CQUFtQixFQUV0QixNQUFNLGtCQUFrQixDQUFDO0FBTTFCLE9BQU8sRUFDSCxlQUFlLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7O0FBUTNCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBSy9ELE1BQU0sT0FBZ0IscUJBQ2xCLFNBQVEsbUJBQW1CO0lBYTNCO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFaRixzQkFBaUIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBY2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN2QixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7SUFHUyxjQUFjLENBQUMsU0FBa0I7UUFDdkMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Y0FFMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUU7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7a0JBQ3BELENBQUMsR0FBRyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFPO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUdTLGVBQWU7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7Ozs7O0lBR1MsYUFBYSxDQUFDLFlBQWlCOztjQUUvQixXQUFXLHFCQUNWLElBQUksQ0FBQyxtQkFBbUIsSUFDM0IsWUFBWSxFQUFFLFlBQVksR0FDN0I7O2NBRUssQ0FBQyxHQUFHLElBQUksZUFBZSxFQUFLOztjQUU1QixDQUFDLEdBQStCLElBQUksbUJBQW1CLENBQUMsV0FBVyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELElBQWMscUJBQXFCOztjQUN6QixDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVk7UUFDM0IsT0FBTyxtQkFBQSxDQUFDLEVBQThCLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRVMscUJBQXFCLENBQUMsR0FBVztRQUN2QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7O0lBRVMsc0JBQXNCLENBQUMsR0FBVyxFQUFFLEtBQWlDO1FBQzNFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFUyx1QkFBdUIsQ0FBQyxHQUFXO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxVQUFTLEdBQUc7WUFDdEMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Ozs7O0lBRVMsMEJBQTBCLENBQUMsR0FBVztRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7O0lBS0QsZUFBZSxDQUFDLEtBQVU7UUFDdEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUVKOzs7Ozs7SUFsR0csa0RBQXFDOzs7OztJQUdyQyxvREFBd0Q7Ozs7O0lBRXhELDhDQUF5RTs7Ozs7SUFDekUsdURBQW9DOzs7OztJQUVwQyxtREFBeUM7O0lBQ3pDLHNDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIElMaXN0TWVkaWF0b3JDdG9yT3B0aW9uc1xufSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHtcbiAgICBOZ1N0b3JlTGlzdE1lZGlhdG9yLFxuICAgIElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQge1xuICAgIElDb2xsZWN0aW9uSXRlbVxufSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG5cbmltcG9ydCB7XG4gICAgQ29sbGVjdGlvblN0b3JlXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuXG5pbXBvcnQge1xuICAgIElTbGlkaW5nRXhwaXJlQ2FjaGVcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG4vLyBiYXNlXG5pbXBvcnQgeyBGdWxsRmVhdHVyZUxpc3RQYWdlIH0gZnJvbSAnLi9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlJztcblxuLy8gTm90ZSB0aGF0IGluIHRoZSBjbGFzcywgcGxlYXNlIGF2b2lkIHRvIGRlcGVuZCBvbiBvbk5ld0l0ZW1zUmVhZHksXG4vLyBhcyBpdCBpcyBOT1QgaW4gdGhlIHVwZGF0ZSBmbG93LlxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdTdG9yZUJhY2tlZExpc3RQYWdlPFQgZXh0ZW5kcyBJQ29sbGVjdGlvbkl0ZW0+XG4gICAgZXh0ZW5kcyBGdWxsRmVhdHVyZUxpc3RQYWdlIHtcblxuICAgIHByb3RlY3RlZCBkZWZhdWx0TGl2ZVBlcmlvZCA9IDYwICogNTtcblxuICAgIC8vIE1vcmUgY29uZmlndXJhdGlvbiBmb3IgY29uc3RydWN0aW5nIGRhdGFwcm92aWRlclxuICAgIHByb3RlY3RlZCBtZWRpYXRvckN0b3JPcHRpb25zOiBJTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnM7XG5cbiAgICBwcm90ZWN0ZWQgbWVkaWF0b3JDYWNoZTogSVNsaWRpbmdFeHBpcmVDYWNoZTxJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYz47XG4gICAgcHJpdmF0ZSBfb25DYWNoZUV4cGlyZUNhbGxiYWNrOiBhbnk7XG5cbiAgICBwcml2YXRlIF9zdG9yZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHB1YmxpYyBpdGVtczogVFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5tZWRpYXRvckN0b3JPcHRpb25zID0ge1xuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVJbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZVJlZnJlc2g6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIHR1cm5Pbk1lZGlhdG9yKGZyb21DYWNoZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlci50dXJuT25NZWRpYXRvcihmcm9tQ2FjaGUpO1xuXG4gICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5hc05nU3RvcmVMaXN0TWVpZGF0b3IuZ2V0TmdTdG9yZSgpO1xuICAgICAgICB0aGlzLl9zdG9yZVN1YnNjcmlwdGlvbiA9IHN0b3JlLmdldFN0YXRlKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3ID0gZGF0YS5pdGVtcyBhcyBUW107XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdztcbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBtdXN0IGNhbGwgb25JdGVtc1JlYWR5IC4uLiBcbiAgICAgICAgICAgIHRoaXMub25JdGVtc1JlYWR5KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIHR1cm5PZmZNZWRpYXRvcigpIHtcbiAgICAgICAgdGhpcy5fc3RvcmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgc3VwZXIudHVybk9mZk1lZGlhdG9yKCk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgYnVpbGRNZWRpYXRvcihkYXRhUHJvdmlkZXI6IGFueSk6IFByb21pc2VMaWtlPHZvaWQ+IHtcblxuICAgICAgICBjb25zdCBjdG9yT3B0aW9uczogSUxpc3RNZWRpYXRvckN0b3JPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4udGhpcy5tZWRpYXRvckN0b3JPcHRpb25zLFxuICAgICAgICAgICAgZGF0YVByb3ZpZGVyOiBkYXRhUHJvdmlkZXJcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzID0gbmV3IENvbGxlY3Rpb25TdG9yZTxUPigpO1xuXG4gICAgICAgIGNvbnN0IG06IElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljID0gbmV3IE5nU3RvcmVMaXN0TWVkaWF0b3IoY3Rvck9wdGlvbnMpO1xuICAgICAgICBtLnNldE5nU3RvcmUocyk7XG5cbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBtO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFzTmdTdG9yZUxpc3RNZWlkYXRvcigpOiBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmxpc3RNZWRpYXRvcjtcbiAgICAgICAgcmV0dXJuIG0gYXMgSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWRNZWRpYXRvckZyb21DYWNoZShrZXk6IHN0cmluZyk6IElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWF0b3JDYWNoZS5nZXQoa2V5LCB0aGlzLmRlZmF1bHRMaXZlUGVyaW9kKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd3JpdGVNZWRpYXRvckludG9DYWNoZShrZXk6IHN0cmluZywgdmFsdWU6IElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5zZXQoa2V5LCB2YWx1ZSwgdGhpcy5kZWZhdWx0TGl2ZVBlcmlvZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdmFsdWUudGVhckRvd24oKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuYWRkT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLnJtT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLlxuICAgIC8vIE92ZXJyaWRlXG4gICAgLy8gTm90ZSB0aGF0IGluIHRoZSBkZXJpdmVkIGNsYXNzIHdlIGRvIE5PVCBkZXBlbmQgb24gaXQuXG4gICAgb25OZXdJdGVtc1JlYWR5KGl0ZW1zOiBUW10pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxufVxuXG4iXX0=