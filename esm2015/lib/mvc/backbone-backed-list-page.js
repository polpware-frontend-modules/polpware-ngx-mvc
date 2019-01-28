/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class BackboneBackedListPage extends FullFeatureListPage {
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
            let inCache = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2JvbmUtYmFja2VkLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9iYWNrYm9uZS1iYWNrZWQtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQsT0FBTyxFQUNILG9CQUFvQixFQUd2QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFDSCwrQkFBK0IsRUFDbEMsTUFBTSxrQkFBa0IsQ0FBQzs7QUFXMUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7OztBQU8vRCxNQUFNLE9BQWdCLHNCQUNsQixTQUFRLG1CQUFtQjtJQVMzQjtRQUNJLEtBQUssRUFBRSxDQUFDO1FBUkYsc0JBQWlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQVVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBTUQsSUFBYyxzQkFBc0I7O2NBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWTtRQUMzQixPQUFPLG1CQUFBLENBQUMsRUFBK0IsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7OztJQUdTLG9DQUFvQyxDQUFDLGlCQUFzQixFQUFFLFlBQXFCOztjQUVsRixXQUFXLEdBQXFDO1lBQ2xELFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtTQUN0Qjs7Y0FFSyxDQUFDLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxXQUFXLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVB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LG1EQUFxQzs7Ozs7SUFFckMsK0NBQTBFOzs7OztJQUMxRSx3REFBb0M7O0lBRXBDLHVDQUFrQjs7Ozs7OztJQVdsQixtRUFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSVZpZXdJbnN0YW5jZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQgeyBwdXNoQXJyYXkgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuaW1wb3J0IHtcbiAgICBXcml0YWJsZUxpc3RNZWRpYXRvcixcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucyxcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWNcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgUnhqc1Bvd2VyZWRXcml0YWJsZUxpc3RNZWRpYXRvclxufSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHtcbiAgICBJQ29sbGVjdGlvbkl0ZW1cbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5pbXBvcnQge1xuICAgIElTbGlkaW5nRXhwaXJlQ2FjaGVcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG4vLyBiYXNlXG5pbXBvcnQgeyBGdWxsRmVhdHVyZUxpc3RQYWdlIH0gZnJvbSAnLi9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlJztcblxuLy8gTm90ZSB0aGF0IHdlIHVzZSBJQ29sbGVjdGlvbkl0ZW0gcmF0aGVyIHRoYW4gSU1vZGVsTGlrZSxcbi8vIGJlY2F1c2Ugd2UgYXNzdW1lIHRoZSBsZWFzdCByZXF1aXJlbWVudCBmb3IgdGhlIGlucHV0IHR5cGUuXG4vLyBQcmVjaXNlbHksIHRoZSBvbmx5IHJlcXVpcmVtZW50IGlzIHRoYXQgdGhlIGNvbGxlY3Rpb24gaXRlbSBoYXMgYW5cbi8vIGlkIGZpZWxkLiBcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhY2tib25lQmFja2VkTGlzdFBhZ2U8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT5cbiAgICBleHRlbmRzIEZ1bGxGZWF0dXJlTGlzdFBhZ2Uge1xuXG4gICAgcHJvdGVjdGVkIGRlZmF1bHRMaXZlUGVyaW9kID0gNjAgKiA1O1xuXG4gICAgcHJvdGVjdGVkIG1lZGlhdG9yQ2FjaGU6IElTbGlkaW5nRXhwaXJlQ2FjaGU8SVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljPjtcbiAgICBwcml2YXRlIF9vbkNhY2hlRXhwaXJlQ2FsbGJhY2s6IGFueTtcblxuICAgIHB1YmxpYyBpdGVtczogVFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFdlIHVzZSBhIGZ1bmN0b24gdG8gY29tcHV0ZSBjYWNoZUtleSwgc28gdGhhdCB3ZSBjYW5cbiAgICAvLyBjb21wdXRlIHRoZSBjYWNoZSBrZXkgd2l0aCBtb3JlIGlucHV0cy4gXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldENhY2hlS2V5KC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIGdldCBhc1dyaXRhYmxlTGlzdE1lZGlhdG9yKCk6IElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmxpc3RNZWRpYXRvcjtcbiAgICAgICAgcmV0dXJuIG0gYXMgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZm9yIHVzaW5nIGJhY2tib25lXG4gICAgcHJvdGVjdGVkIHVzZU1lZGlhdG9yV2l0aE9ubHlMb2NhbERhdGFQcm92aWRlcihsb2NhbERhdGFQcm92aWRlcjogYW55LCBsb2NhbE9wdGlvbnM/OiBvYmplY3QpIHtcblxuICAgICAgICBjb25zdCBjdG9yT3B0aW9uczogSVdyaXRhYmxlTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGxvY2FsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVJbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZVJlZnJlc2g6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzID0gbmV3IFdyaXRhYmxlTGlzdE1lZGlhdG9yKGN0b3JPcHRpb25zKTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBzO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1c2VNZWRpYXRvcldpdGhHbG9iYWxEYXRhUHJvdmlkZXIobG9jYWxEYXRhUHJvdmlkZXI6IGFueSwgZ2xvYmFsRGF0YVByb3ZpZGVyOiBhbnksXG4gICAgICAgIGxvY2FsT3B0aW9ucz86IG9iamVjdCwgZ2xvYmFsT3B0aW9ucz86IG9iamVjdCkge1xuXG4gICAgICAgIGNvbnN0IG1lZGlhdG9yID0gbmV3IFJ4anNQb3dlcmVkV3JpdGFibGVMaXN0TWVkaWF0b3Ioe1xuICAgICAgICAgICAgZ2xvYmFsUHJvdmlkZXI6IGdsb2JhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIGZpbHRlckZsYWdzOiB7XG4gICAgICAgICAgICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFQcm92aWRlcjogbG9jYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICB1c2VNb2RlbDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIG5ldyBtZWRpYXRvciBpcyBjb25zdHJ1Y3R1cmUgXG4gICAgcHJvdGVjdGVkIHBvc3RVc2VGcmVzaE1lZGlhdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMudHVybk9uTWVkaWF0b3IoZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLmFmdGVyTWVkaWF0b3JPbigpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIGNhY2hlZCBtZWRpYXRvciBpcyB1c2VkIFxuICAgIHByb3RlY3RlZCBwb3N0VXNlQ2FjaGVkTWVkaWF0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy50dXJuT25NZWRpYXRvcih0cnVlLCAuLi5hcmdzKTtcbiAgICAgICAgdGhpcy5hZnRlck1lZGlhdG9yT24oKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSB0byBzdXBwb3J0IGNhY2hlXG4gICAgcHJvdGVjdGVkIGVuc3VyZURhdGFQcm92aWRlciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYXRvckNhY2hlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSguLi5hcmdzKTtcbiAgICAgICAgICAgIGxldCBpbkNhY2hlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lZGlhdG9yID0gdGhpcy5yZWFkTWVkaWF0b3JGcm9tQ2FjaGUoY2FjaGVLZXkpO1xuXG4gICAgICAgICAgICBpZiAoIW1lZGlhdG9yKSB7IC8vIE5vdCBpbiBjYWNoZVxuXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZE1lZGlhdG9yKC4uLmFyZ3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXAgaW4gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVNZWRpYXRvckludG9DYWNoZShjYWNoZUtleSwgdGhpcy5hc1dyaXRhYmxlTGlzdE1lZGlhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUZyZXNoTWVkaWF0b3IodHJ1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIEluIGNhY2hlXG5cbiAgICAgICAgICAgICAgICBpbkNhY2hlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUNhY2hlZE1lZGlhdG9yKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGRNZWRpYXRvciguLi5hcmdzKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIENhc2UgMzogXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0VXNlRnJlc2hNZWRpYXRvcihmYWxzZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPbigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWF0b3JDYWNoZSkge1xuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBkbyBub3QgUHJvdmlkZSBhbnkgaW5wdXRzIFxuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLmFkZE9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPZmYoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG8gbm90IFByb3ZpZGUgYW55IGlucHV0c1xuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICAgIHB1YmxpYyBvbk5ld0l0ZW1zUmVhZHkoaXRlbXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcHVzaEFycmF5KHRoaXMuaXRlbXMsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uXG4gICAgb25JdGVtc1JlYWR5KCkge1xuICAgICAgICBjb25zdCB2aWV3RGF0YSA9IHRoaXMuYXNXcml0YWJsZUxpc3RNZWRpYXRvci52aWV3TGV2ZWxEYXRhKCk7XG4gICAgICAgIC8vIEdldCB0aGUgZGF0YSBmcm9tIHRoZSB2aWV3IGxldmVsIGRhdGEgXG4gICAgICAgIHRoaXMuaXRlbXMgPSB2aWV3RGF0YS5tb2RlbHMuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IGl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZGVjaWRlIGhvdyB0byB1c2UgdGhlXG4gICAgLy8gY2FjaGVkIHZhbHVlOyB3ZSBuZWVkIHRvIHByZWNpc2VseSB0ZWxsIHdoZXJlIHRoZXJlIGlzIGEgdmFsdWUgaW4gdGhlIGNhY2hlXG4gICAgLy8gZm9yIHRoZSBjb3JyZXNwb25kaW5nIGtleVxuICAgIHByb3RlY3RlZCByZWFkTWVkaWF0b3JGcm9tQ2FjaGUoa2V5OiBzdHJpbmcpOiBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYXRvckNhY2hlLmdldChrZXksIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3cml0ZU1lZGlhdG9ySW50b0NhY2hlKGtleTogc3RyaW5nLCBtZWRpYXRvcjogSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5zZXQoa2V5LCBtZWRpYXRvciwgdGhpcy5kZWZhdWx0TGl2ZVBlcmlvZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgbWVkaWF0b3IudGVhckRvd24oKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuYWRkT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLnJtT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbn1cblxuIl19