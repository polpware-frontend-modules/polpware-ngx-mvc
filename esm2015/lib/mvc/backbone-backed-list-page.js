import { pushArray } from '@polpware/fe-utilities';
import { WritableListMediator } from '@polpware/fe-mvc';
import { RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
// base
import { FullFeatureListPage } from './full-feature-list-page';
// Note that we use ICollectionItem rather than IModelLike,
// because we assume the least requirement for the input type.
// Precisely, the only requirement is that the collection item has an
// id field. 
export class BackboneBackedListPage extends FullFeatureListPage {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2JvbmUtYmFja2VkLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9iYWNrYm9uZS1iYWNrZWQtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxPQUFPLEVBQ0gsb0JBQW9CLEVBR3ZCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUNILCtCQUErQixFQUNsQyxNQUFNLGtCQUFrQixDQUFDO0FBVTFCLE9BQU87QUFDUCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUvRCwyREFBMkQ7QUFDM0QsOERBQThEO0FBQzlELHFFQUFxRTtBQUNyRSxhQUFhO0FBRWIsTUFBTSxPQUFnQixzQkFDbEIsU0FBUSxtQkFBbUI7SUFTM0I7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQVJGLHNCQUFpQixHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFVakMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBTUQsSUFBYyxzQkFBc0I7UUFDaEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM1QixPQUFPLENBQWdDLENBQUM7SUFDNUMsQ0FBQztJQUVELDRDQUE0QztJQUNsQyxvQ0FBb0MsQ0FBQyxpQkFBc0IsRUFBRSxZQUFxQjtRQUV4RixNQUFNLFdBQVcsR0FBcUM7WUFDbEQsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFFRixNQUFNLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hE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LEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVTLDBCQUEwQixDQUFDLEdBQVc7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSVZpZXdJbnN0YW5jZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQgeyBwdXNoQXJyYXkgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuaW1wb3J0IHtcbiAgICBXcml0YWJsZUxpc3RNZWRpYXRvcixcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucyxcbiAgICBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWNcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgUnhqc1Bvd2VyZWRXcml0YWJsZUxpc3RNZWRpYXRvclxufSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHtcbiAgICBJQ29sbGVjdGlvbkl0ZW1cbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5pbXBvcnQge1xuICAgIElTbGlkaW5nRXhwaXJlQ2FjaGVcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG4vLyBiYXNlXG5pbXBvcnQgeyBGdWxsRmVhdHVyZUxpc3RQYWdlIH0gZnJvbSAnLi9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlJztcblxuLy8gTm90ZSB0aGF0IHdlIHVzZSBJQ29sbGVjdGlvbkl0ZW0gcmF0aGVyIHRoYW4gSU1vZGVsTGlrZSxcbi8vIGJlY2F1c2Ugd2UgYXNzdW1lIHRoZSBsZWFzdCByZXF1aXJlbWVudCBmb3IgdGhlIGlucHV0IHR5cGUuXG4vLyBQcmVjaXNlbHksIHRoZSBvbmx5IHJlcXVpcmVtZW50IGlzIHRoYXQgdGhlIGNvbGxlY3Rpb24gaXRlbSBoYXMgYW5cbi8vIGlkIGZpZWxkLiBcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhY2tib25lQmFja2VkTGlzdFBhZ2U8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT5cbiAgICBleHRlbmRzIEZ1bGxGZWF0dXJlTGlzdFBhZ2Uge1xuXG4gICAgcHJvdGVjdGVkIGRlZmF1bHRMaXZlUGVyaW9kID0gNjAgKiA1O1xuXG4gICAgcHJvdGVjdGVkIG1lZGlhdG9yQ2FjaGU6IElTbGlkaW5nRXhwaXJlQ2FjaGU8SVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljPjtcbiAgICBwcml2YXRlIF9vbkNhY2hlRXhwaXJlQ2FsbGJhY2s6IGFueTtcblxuICAgIHB1YmxpYyBpdGVtczogVFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFdlIHVzZSBhIGZ1bmN0b24gdG8gY29tcHV0ZSBjYWNoZUtleSwgc28gdGhhdCB3ZSBjYW5cbiAgICAvLyBjb21wdXRlIHRoZSBjYWNoZSBrZXkgd2l0aCBtb3JlIGlucHV0cy4gXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldENhY2hlS2V5KC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIGdldCBhc1dyaXRhYmxlTGlzdE1lZGlhdG9yKCk6IElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmxpc3RNZWRpYXRvcjtcbiAgICAgICAgcmV0dXJuIG0gYXMgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZm9yIHVzaW5nIGJhY2tib25lXG4gICAgcHJvdGVjdGVkIHVzZU1lZGlhdG9yV2l0aE9ubHlMb2NhbERhdGFQcm92aWRlcihsb2NhbERhdGFQcm92aWRlcjogYW55LCBsb2NhbE9wdGlvbnM/OiBvYmplY3QpIHtcblxuICAgICAgICBjb25zdCBjdG9yT3B0aW9uczogSVdyaXRhYmxlTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGxvY2FsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVJbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZVJlZnJlc2g6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzID0gbmV3IFdyaXRhYmxlTGlzdE1lZGlhdG9yKGN0b3JPcHRpb25zKTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBzO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1c2VNZWRpYXRvcldpdGhHbG9iYWxEYXRhUHJvdmlkZXIobG9jYWxEYXRhUHJvdmlkZXI6IGFueSwgZ2xvYmFsRGF0YVByb3ZpZGVyOiBhbnksXG4gICAgICAgIGxvY2FsT3B0aW9ucz86IG9iamVjdCwgZ2xvYmFsT3B0aW9ucz86IG9iamVjdCkge1xuXG4gICAgICAgIGNvbnN0IG1lZGlhdG9yID0gbmV3IFJ4anNQb3dlcmVkV3JpdGFibGVMaXN0TWVkaWF0b3Ioe1xuICAgICAgICAgICAgZ2xvYmFsUHJvdmlkZXI6IGdsb2JhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIGZpbHRlckZsYWdzOiB7XG4gICAgICAgICAgICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFQcm92aWRlcjogbG9jYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICB1c2VNb2RlbDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIG5ldyBtZWRpYXRvciBpcyBjb25zdHJ1Y3R1cmUgXG4gICAgcHJvdGVjdGVkIHBvc3RVc2VGcmVzaE1lZGlhdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMudHVybk9uTWVkaWF0b3IoZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLmFmdGVyTWVkaWF0b3JPbigpO1xuICAgIH1cblxuICAgIC8vIEludm9rZWQgYWZ0ZXIgdGhlIGNhY2hlZCBtZWRpYXRvciBpcyB1c2VkIFxuICAgIHByb3RlY3RlZCBwb3N0VXNlQ2FjaGVkTWVkaWF0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy50dXJuT25NZWRpYXRvcih0cnVlLCAuLi5hcmdzKTtcbiAgICAgICAgdGhpcy5hZnRlck1lZGlhdG9yT24oKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSB0byBzdXBwb3J0IGNhY2hlXG4gICAgcHJvdGVjdGVkIGVuc3VyZURhdGFQcm92aWRlciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYXRvckNhY2hlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSguLi5hcmdzKTtcbiAgICAgICAgICAgIGxldCBpbkNhY2hlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lZGlhdG9yID0gdGhpcy5yZWFkTWVkaWF0b3JGcm9tQ2FjaGUoY2FjaGVLZXkpO1xuXG4gICAgICAgICAgICBpZiAoIW1lZGlhdG9yKSB7IC8vIE5vdCBpbiBjYWNoZVxuXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZE1lZGlhdG9yKC4uLmFyZ3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXAgaW4gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVNZWRpYXRvckludG9DYWNoZShjYWNoZUtleSwgdGhpcy5hc1dyaXRhYmxlTGlzdE1lZGlhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUZyZXNoTWVkaWF0b3IodHJ1ZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIEluIGNhY2hlXG5cbiAgICAgICAgICAgICAgICBpbkNhY2hlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG1lZGlhdG9yO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUNhY2hlZE1lZGlhdG9yKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGRNZWRpYXRvciguLi5hcmdzKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIENhc2UgMzogXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0VXNlRnJlc2hNZWRpYXRvcihmYWxzZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPbigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWF0b3JDYWNoZSkge1xuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBkbyBub3QgUHJvdmlkZSBhbnkgaW5wdXRzIFxuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLmFkZE9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGFmdGVyTWVkaWF0b3JPZmYoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG8gbm90IFByb3ZpZGUgYW55IGlucHV0c1xuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gRGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICAgIHB1YmxpYyBvbk5ld0l0ZW1zUmVhZHkoaXRlbXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcHVzaEFycmF5KHRoaXMuaXRlbXMsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uXG4gICAgb25JdGVtc1JlYWR5KCkge1xuICAgICAgICBjb25zdCB2aWV3RGF0YSA9IHRoaXMuYXNXcml0YWJsZUxpc3RNZWRpYXRvci52aWV3TGV2ZWxEYXRhKCk7XG4gICAgICAgIC8vIEdldCB0aGUgZGF0YSBmcm9tIHRoZSB2aWV3IGxldmVsIGRhdGEgXG4gICAgICAgIHRoaXMuaXRlbXMgPSB2aWV3RGF0YS5tb2RlbHMuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IGl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZGVjaWRlIGhvdyB0byB1c2UgdGhlXG4gICAgLy8gY2FjaGVkIHZhbHVlOyB3ZSBuZWVkIHRvIHByZWNpc2VseSB0ZWxsIHdoZXJlIHRoZXJlIGlzIGEgdmFsdWUgaW4gdGhlIGNhY2hlXG4gICAgLy8gZm9yIHRoZSBjb3JyZXNwb25kaW5nIGtleVxuICAgIHByb3RlY3RlZCByZWFkTWVkaWF0b3JGcm9tQ2FjaGUoa2V5OiBzdHJpbmcpOiBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYXRvckNhY2hlLmdldChrZXksIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3cml0ZU1lZGlhdG9ySW50b0NhY2hlKGtleTogc3RyaW5nLCBtZWRpYXRvcjogSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5zZXQoa2V5LCBtZWRpYXRvciwgdGhpcy5kZWZhdWx0TGl2ZVBlcmlvZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgbWVkaWF0b3IudGVhckRvd24oKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuYWRkT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLnJtT25FeHBpcmVIYW5kbGVyKGtleSwgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbn1cblxuIl19