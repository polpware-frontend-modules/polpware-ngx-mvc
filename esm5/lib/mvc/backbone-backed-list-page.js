import { __extends, __read, __spread } from "tslib";
import { pushArray } from '@polpware/fe-utilities';
import { WritableListMediator } from '@polpware/fe-mvc';
import { RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
// base
import { FullFeatureListPage } from './full-feature-list-page';
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
export { BackboneBackedListPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2JvbmUtYmFja2VkLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9iYWNrYm9uZS1iYWNrZWQtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQsT0FBTyxFQUNILG9CQUFvQixFQUd2QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFDSCwrQkFBK0IsRUFDbEMsTUFBTSxrQkFBa0IsQ0FBQztBQVUxQixPQUFPO0FBQ1AsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0QsMkRBQTJEO0FBQzNELDhEQUE4RDtBQUM5RCxxRUFBcUU7QUFDckUsYUFBYTtBQUViO0lBQ1ksMENBQW1CO0lBUzNCO1FBQUEsWUFDSSxpQkFBTyxTQUlWO1FBWlMsdUJBQWlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQVVqQyxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDOztJQUN2QyxDQUFDO0lBTUQsc0JBQWMsMERBQXNCO2FBQXBDO1lBQ0ksSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM1QixPQUFPLENBQWdDLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFRCw0Q0FBNEM7SUFDbEMscUVBQW9DLEdBQTlDLFVBQStDLGlCQUFzQixFQUFFLFlBQXFCO1FBRXhGLElBQU0sV0FBVyxHQUFxQztZQUNsRCxZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQztRQUVGLElBQU0sQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7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QUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyx3REFBdUIsR0FBakMsVUFBa0MsR0FBVztRQUN6QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsVUFBUyxHQUFHO1lBQ3RDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNyQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFUywyREFBMEIsR0FBcEMsVUFBcUMsR0FBVztRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFTCw2QkFBQztBQUFELENBQUMsQUF6S0QsQ0FDWSxtQkFBbUIsR0F3SzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElWaWV3SW5zdGFuY2UgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcblxuaW1wb3J0IHsgcHVzaEFycmF5IH0gZnJvbSAnQHBvbHB3YXJlL2ZlLXV0aWxpdGllcyc7XG5cbmltcG9ydCB7XG4gICAgV3JpdGFibGVMaXN0TWVkaWF0b3IsXG4gICAgSVdyaXRhYmxlTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMsXG4gICAgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQge1xuICAgIFJ4anNQb3dlcmVkV3JpdGFibGVMaXN0TWVkaWF0b3Jcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgSUNvbGxlY3Rpb25JdGVtXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuaW1wb3J0IHtcbiAgICBJU2xpZGluZ0V4cGlyZUNhY2hlXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuLy8gYmFzZVxuaW1wb3J0IHsgRnVsbEZlYXR1cmVMaXN0UGFnZSB9IGZyb20gJy4vZnVsbC1mZWF0dXJlLWxpc3QtcGFnZSc7XG5cbi8vIE5vdGUgdGhhdCB3ZSB1c2UgSUNvbGxlY3Rpb25JdGVtIHJhdGhlciB0aGFuIElNb2RlbExpa2UsXG4vLyBiZWNhdXNlIHdlIGFzc3VtZSB0aGUgbGVhc3QgcmVxdWlyZW1lbnQgZm9yIHRoZSBpbnB1dCB0eXBlLlxuLy8gUHJlY2lzZWx5LCB0aGUgb25seSByZXF1aXJlbWVudCBpcyB0aGF0IHRoZSBjb2xsZWN0aW9uIGl0ZW0gaGFzIGFuXG4vLyBpZCBmaWVsZC4gXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYWNrYm9uZUJhY2tlZExpc3RQYWdlPFQgZXh0ZW5kcyBJQ29sbGVjdGlvbkl0ZW0+XG4gICAgZXh0ZW5kcyBGdWxsRmVhdHVyZUxpc3RQYWdlIHtcblxuICAgIHByb3RlY3RlZCBkZWZhdWx0TGl2ZVBlcmlvZCA9IDYwICogNTtcblxuICAgIHByb3RlY3RlZCBtZWRpYXRvckNhY2hlOiBJU2xpZGluZ0V4cGlyZUNhY2hlPElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYz47XG4gICAgcHJpdmF0ZSBfb25DYWNoZUV4cGlyZUNhbGxiYWNrOiBhbnk7XG5cbiAgICBwdWJsaWMgaXRlbXM6IFRbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBXZSB1c2UgYSBmdW5jdG9uIHRvIGNvbXB1dGUgY2FjaGVLZXksIHNvIHRoYXQgd2UgY2FuXG4gICAgLy8gY29tcHV0ZSB0aGUgY2FjaGUga2V5IHdpdGggbW9yZSBpbnB1dHMuIFxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRDYWNoZUtleSguLi5hcmdzOiBhbnlbXSk6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBnZXQgYXNXcml0YWJsZUxpc3RNZWRpYXRvcigpOiBJV3JpdGFibGVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5saXN0TWVkaWF0b3I7XG4gICAgICAgIHJldHVybiBtIGFzIElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYztcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciB1c2luZyBiYWNrYm9uZVxuICAgIHByb3RlY3RlZCB1c2VNZWRpYXRvcldpdGhPbmx5TG9jYWxEYXRhUHJvdmlkZXIobG9jYWxEYXRhUHJvdmlkZXI6IGFueSwgbG9jYWxPcHRpb25zPzogb2JqZWN0KSB7XG5cbiAgICAgICAgY29uc3QgY3Rvck9wdGlvbnM6IElXcml0YWJsZUxpc3RNZWRpYXRvckN0b3JPcHRpb25zID0ge1xuICAgICAgICAgICAgZGF0YVByb3ZpZGVyOiBsb2NhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIHVzZU1vZGVsOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlSW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVSZWZyZXNoOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcyA9IG5ldyBXcml0YWJsZUxpc3RNZWRpYXRvcihjdG9yT3B0aW9ucyk7XG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yID0gcztcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc2V0VXAoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXNlTWVkaWF0b3JXaXRoR2xvYmFsRGF0YVByb3ZpZGVyKGxvY2FsRGF0YVByb3ZpZGVyOiBhbnksIGdsb2JhbERhdGFQcm92aWRlcjogYW55LFxuICAgICAgICBsb2NhbE9wdGlvbnM/OiBvYmplY3QsIGdsb2JhbE9wdGlvbnM/OiBvYmplY3QpIHtcblxuICAgICAgICBjb25zdCBtZWRpYXRvciA9IG5ldyBSeGpzUG93ZXJlZFdyaXRhYmxlTGlzdE1lZGlhdG9yKHtcbiAgICAgICAgICAgIGdsb2JhbFByb3ZpZGVyOiBnbG9iYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICBmaWx0ZXJGbGFnczoge1xuICAgICAgICAgICAgICAgIGFkZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlbW92ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdXBkYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGxvY2FsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBtZWRpYXRvcjtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc2V0VXAoKTtcbiAgICB9XG5cbiAgICAvLyBJbnZva2VkIGFmdGVyIHRoZSBuZXcgbWVkaWF0b3IgaXMgY29uc3RydWN0dXJlIFxuICAgIHByb3RlY3RlZCBwb3N0VXNlRnJlc2hNZWRpYXRvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICB0aGlzLnR1cm5Pbk1lZGlhdG9yKGZhbHNlLCAuLi5hcmdzKTtcbiAgICAgICAgdGhpcy5hZnRlck1lZGlhdG9yT24oKTtcbiAgICB9XG5cbiAgICAvLyBJbnZva2VkIGFmdGVyIHRoZSBjYWNoZWQgbWVkaWF0b3IgaXMgdXNlZCBcbiAgICBwcm90ZWN0ZWQgcG9zdFVzZUNhY2hlZE1lZGlhdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMudHVybk9uTWVkaWF0b3IodHJ1ZSwgLi4uYXJncyk7XG4gICAgICAgIHRoaXMuYWZ0ZXJNZWRpYXRvck9uKCk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgdG8gc3VwcG9ydCBjYWNoZVxuICAgIHByb3RlY3RlZCBlbnN1cmVEYXRhUHJvdmlkZXIoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWF0b3JDYWNoZSkge1xuXG4gICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXkoLi4uYXJncyk7XG4gICAgICAgICAgICBsZXQgaW5DYWNoZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb25zdCBtZWRpYXRvciA9IHRoaXMucmVhZE1lZGlhdG9yRnJvbUNhY2hlKGNhY2hlS2V5KTtcblxuICAgICAgICAgICAgaWYgKCFtZWRpYXRvcikgeyAvLyBOb3QgaW4gY2FjaGVcblxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRNZWRpYXRvciguLi5hcmdzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHVwIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlTWVkaWF0b3JJbnRvQ2FjaGUoY2FjaGVLZXksIHRoaXMuYXNXcml0YWJsZUxpc3RNZWRpYXRvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RVc2VGcmVzaE1lZGlhdG9yKHRydWUsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBJbiBjYWNoZVxuXG4gICAgICAgICAgICAgICAgaW5DYWNoZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSBtZWRpYXRvcjtcblxuICAgICAgICAgICAgICAgIC8vIENhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RVc2VDYWNoZWRNZWRpYXRvciguLi5hcmdzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkTWVkaWF0b3IoLi4uYXJncykudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBDYXNlIDM6IFxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFVzZUZyZXNoTWVkaWF0b3IoZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBhZnRlck1lZGlhdG9yT24oKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgZG8gbm90IFByb3ZpZGUgYW55IGlucHV0cyBcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSgpO1xuICAgICAgICAgICAgdGhpcy5hZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihjYWNoZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBhZnRlck1lZGlhdG9yT2ZmKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYXRvckNhY2hlKSB7XG4gICAgICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIGRvIG5vdCBQcm92aWRlIGFueSBpbnB1dHNcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVPbkNhY2hlRXhwaXJlSGFuZGxlcihjYWNoZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb25cbiAgICBwdWJsaWMgb25OZXdJdGVtc1JlYWR5KGl0ZW1zOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XG4gICAgICAgIHB1c2hBcnJheSh0aGlzLml0ZW1zLCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IGltcGxlbWVudGF0aW9uLlxuICAgIG9uSXRlbXNSZWFkeSgpIHtcbiAgICAgICAgY29uc3Qgdmlld0RhdGEgPSB0aGlzLmFzV3JpdGFibGVMaXN0TWVkaWF0b3Iudmlld0xldmVsRGF0YSgpO1xuICAgICAgICAvLyBHZXQgdGhlIGRhdGEgZnJvbSB0aGUgdmlldyBsZXZlbCBkYXRhIFxuICAgICAgICB0aGlzLml0ZW1zID0gdmlld0RhdGEubW9kZWxzLnNsaWNlKDApO1xuICAgIH1cblxuICAgIC8vIE5vdGUgdGhhdCBpdCBpcyB1cCB0byB0aGUgY2FsbGVyIHRvIGRlY2lkZSBob3cgdG8gdXNlIHRoZVxuICAgIC8vIGNhY2hlZCB2YWx1ZTsgd2UgbmVlZCB0byBwcmVjaXNlbHkgdGVsbCB3aGVyZSB0aGVyZSBpcyBhIHZhbHVlIGluIHRoZSBjYWNoZVxuICAgIC8vIGZvciB0aGUgY29ycmVzcG9uZGluZyBrZXlcbiAgICBwcm90ZWN0ZWQgcmVhZE1lZGlhdG9yRnJvbUNhY2hlKGtleTogc3RyaW5nKTogSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWF0b3JDYWNoZS5nZXQoa2V5LCB0aGlzLmRlZmF1bHRMaXZlUGVyaW9kKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd3JpdGVNZWRpYXRvckludG9DYWNoZShrZXk6IHN0cmluZywgbWVkaWF0b3I6IElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUuc2V0KGtleSwgbWVkaWF0b3IsIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QsIChldnQpID0+IHtcbiAgICAgICAgICAgIG1lZGlhdG9yLnRlYXJEb3duKCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25DYWNoZUV4cGlyZUNhbGxiYWNrID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybiBldnQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLmFkZE9uRXhwaXJlSGFuZGxlcihrZXksIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5ybU9uRXhwaXJlSGFuZGxlcihrZXksIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuXG59XG5cbiJdfQ==