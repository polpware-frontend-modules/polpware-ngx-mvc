import { __extends } from "tslib";
// base
import { BackboneBackedListPage } from '../../mvc/backbone-backed-list-page';
import { DefListBaseMediator } from '../mediators/def-list-base.mediator';
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
export { DefListBaseController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1tdmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvY29udHJvbGxlcnMvZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPO0FBQ1AsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFN0UsT0FBTyxFQUVILG1CQUFtQixFQUV0QixNQUFNLHFDQUFxQyxDQUFDO0FBUTdDO0lBQStFLHlDQUF5QjtJQUVwRywrQkFBK0IsYUFBNkM7UUFBNUU7UUFDSSw4RUFBOEU7UUFDOUUsaUJBQU8sU0FHVjtRQUw4QixtQkFBYSxHQUFiLGFBQWEsQ0FBZ0M7UUFJeEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQy9DLENBQUM7SUFFRCxzQkFBVyx3REFBcUI7YUFBaEM7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUEwQyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBTUQsc0JBQVcsNENBQVM7UUFKcEI7OztXQUdHO2FBQ0g7WUFDSSw4QkFBOEI7WUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw4Q0FBVztRQUp0Qjs7O1dBR0c7YUFDSDtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBRVMsMkNBQVcsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFNRDs7OztPQUlHO0lBQ08sNkNBQWEsR0FBdkIsVUFBd0IsT0FBZTtRQUVuQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBRXZELElBQUksa0JBQWtCLEdBQWdDLElBQUksQ0FBQztRQUUzRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWhDLG9CQUFvQjtRQUNwQixrQkFBa0IsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFakYsc0JBQXNCO1FBQ3RCLDJEQUEyRDtRQUMzRCxJQUFNLElBQUksR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUUsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9DLHNCQUFzQjtRQUN0QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN0QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUUxQyxJQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0ksS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFFTixJQUFNLFdBQVcsR0FBb0M7WUFDakQsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sa0RBQWtCLEdBQTVCLFVBQTZCLE9BQXdDO1FBQ2pFLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sc0RBQXNCLEdBQWhDLFVBQWlDLFlBQWlCO0lBQ2xELENBQUM7SUFFTCw0QkFBQztBQUFELENBQUMsQUE3R0QsQ0FBK0Usc0JBQXNCLEdBNkdwRyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSUZ1bGxCYWNrYm9uZUNvbGxlY3Rpb25MaWtlLCBJQ29sbGVjdGlvbkl0ZW0gfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG4vLyBiYXNlXG5pbXBvcnQgeyBCYWNrYm9uZUJhY2tlZExpc3RQYWdlIH0gZnJvbSAnLi4vLi4vbXZjL2JhY2tib25lLWJhY2tlZC1saXN0LXBhZ2UnO1xuXG5pbXBvcnQge1xuICAgIElEZWZMaXN0QmFzZU1lZGlhdG9yQ3Rvck9wdGlvbnMsXG4gICAgRGVmTGlzdEJhc2VNZWRpYXRvcixcbiAgICBJRGVmTGlzdEJhc2VNZWRpYXRvclB1YmxpY1xufSBmcm9tICcuLi9tZWRpYXRvcnMvZGVmLWxpc3QtYmFzZS5tZWRpYXRvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURlZkxpc3RCYXNlQ29udHJvbGxlclNldHRpbmdzIHtcbiAgICBlbmRwb2ludE5hbWU6IHN0cmluZztcbiAgICB0YWJsZU5hbWU6IHN0cmluZztcbiAgICBjYWNoZUtleTogc3RyaW5nO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmTGlzdEJhc2VDb250cm9sbGVyPFQgZXh0ZW5kcyBJQ29sbGVjdGlvbkl0ZW0+IGV4dGVuZHMgQmFja2JvbmVCYWNrZWRMaXN0UGFnZTxUPiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgX2xpc3RTZXR0aW5nczogSURlZkxpc3RCYXNlQ29udHJvbGxlclNldHRpbmdzKSB7XG4gICAgICAgIC8vIElmIHdlIG5hdmlnYXRlZCB0byB0aGlzIHBhZ2UsIHdlIHdpbGwgaGF2ZSBhbiBpdGVtIGF2YWlsYWJsZSBhcyBhIG5hdiBwYXJhbVxuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZSA9IHRoaXMuZ2V0R2xvYmFsQ2FjaGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFzRGVmTGlzdEJhc2VNZWRpYXRvcigpOiBJRGVmTGlzdEJhc2VNZWRpYXRvclB1YmxpYyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RNZWRpYXRvciBhcyBJRGVmTGlzdEJhc2VNZWRpYXRvclB1YmxpYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdW5kZXJseWluZyBtZWRpY2F0b3IgaXMgYnVpbHQgZnJvbSB0aGUgcHJldmlvdXMgXG4gICAgICogY2FjaGUgb3Igbm90LiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGZyb21DYWNoZSgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBmcm9tQ2FjaGUgdmFsdWUgLi4uXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RNZWRpYXRvciA/IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLl9mb3JtQ2FjaGUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdW5kZXJseWluZyBtZWRpY2F0b3IgaXMgc3RpbGwgaW4gdGhlIGluaXQgc3RhZ2UsIFxuICAgICAqIEkuZS4sIHRoZSB1bmRlcmx5aW5nIG1lZGlhdG9yIGhhcyBub3QgY29uZHVjdGVkIGFueSByZXF1ZXN0IG9yIG5vdC4gXG4gICAgICovXG4gICAgcHVibGljIGdldCBpbkluaXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE1lZGlhdG9yID8gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IuX2lzSW5pdCA6IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldENhY2hlS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0U2V0dGluZ3MuY2FjaGVLZXk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEJhY2tlbmRTZXJ2aWNlKCk6IGFueTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0R2xvYmFsQ2FjaGUoKTogYW55O1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRSZWxhdGlvbmFsREIoKTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSB1bmRlcmx5aW5nIG1lZGlhdG9yXG4gICAgICogQHBhcmFtIGtleXdvcmQgVGhlIHBhcmFtZXRlciBpcyBwYXNzZWQgYWxsIHRoZSB3YXkgZnJvbSB0aGVcbiAgICAgKiBvbkRvY3VtZW50UmVhZHkgbWV0aG9kLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE1lZGlhdG9yKGtleXdvcmQ6IHN0cmluZyk6IFByb21pc2VMaWtlPHZvaWQ+IHtcblxuICAgICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuZ2V0QmFja2VuZFNlcnZpY2UoKTtcbiAgICAgICAgY29uc3QgYmFja2VuZFByb3ZpZGVyID0gYmFja2VuZFNlcnZpY2UuYmFja2VuZFByb3ZpZGVyO1xuXG4gICAgICAgIGxldCBnbG9iYWxEYXRhUHJvdmlkZXI6IElGdWxsQmFja2JvbmVDb2xsZWN0aW9uTGlrZSA9IG51bGw7XG5cbiAgICAgICAgY29uc3QgcmVEQlNlcnZpY2UgPSB0aGlzLmdldFJlbGF0aW9uYWxEQigpO1xuICAgICAgICBjb25zdCByZWxEQiA9IHJlREJTZXJ2aWNlLmdldCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIGNvbGxlY3Rpb25zXG4gICAgICAgIGdsb2JhbERhdGFQcm92aWRlciA9IHJlbERCLmdldFRhYmxlKHRoaXMuX2xpc3RTZXR0aW5ncy50YWJsZU5hbWUpLmRhdGFQcm92aWRlcigpO1xuXG4gICAgICAgIC8vIExvY2FsIGRhdGEgcHJvdmlkZXJcbiAgICAgICAgLy8gVGhlIHBhcmFtZXRlciBpcyB0aGUgZW5kcG9pbnQgZGVmaW5lZCBieSBiYWNrZW5kLnNlcnZpY2VcbiAgICAgICAgY29uc3QgQ3RvciA9IGJhY2tlbmRQcm92aWRlci5nZXRFbmRQb2ludCh0aGlzLl9saXN0U2V0dGluZ3MuZW5kcG9pbnROYW1lKTtcbiAgICAgICAgY29uc3QgbG9jYWxEYXRhUHJvdmlkZXIgPSBuZXcgQ3RvcigpO1xuXG4gICAgICAgIHRoaXMudG91Y2hMb2NhbERhdGFQcm92aWRlcihsb2NhbERhdGFQcm92aWRlcik7XG5cbiAgICAgICAgLy8gSW5pdCBkYXRhIHByb3ZpZGVyIFxuICAgICAgICBsb2NhbERhdGFQcm92aWRlci5zdGF0ZS5wYWdlU2l6ZSA9IDQwO1xuICAgICAgICBsb2NhbERhdGFQcm92aWRlci5zdGF0ZS5rZXl3b3JkID0ga2V5d29yZDtcblxuICAgICAgICBjb25zdCBmaWx0ZXJPcHRpb25zID0gZ2xvYmFsRGF0YVByb3ZpZGVyID8ge1xuICAgICAgICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICAgICAgICByZW1vdmVkOiB0cnVlLFxuICAgICAgICAgICAgdXBkYXRlZDogZmFsc2VcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICBhZGRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXBkYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3Rvck9wdGlvbnM6IElEZWZMaXN0QmFzZU1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBnbG9iYWxQcm92aWRlcjogZ2xvYmFsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgZmlsdGVyRmxhZ3M6IGZpbHRlck9wdGlvbnMsXG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGxvY2FsRGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgdXNlTW9kZWw6IHRydWUsXG4gICAgICAgICAgICBrZXl3b3JkOiBrZXl3b3JkLFxuICAgICAgICAgICAgcGFnZVNpemU6IDQwLFxuICAgICAgICAgICAgZW5hYmxlSW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBlbmFibGVSZWZyZXNoOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3IgPSB0aGlzLmludm9rZU1lZGlhdG9yQ3RvcihjdG9yT3B0aW9ucyk7XG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yLnNldFVwKCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGEgY2hhbmNlIHRvIGludm9rZSBhIGRlcml2ZWQgbWVkaWF0b3IgaW4gdGhlIGRlcml2ZWQgY29udHJvbGxlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbnZva2VNZWRpYXRvckN0b3Iob3B0aW9uczogSURlZkxpc3RCYXNlTWVkaWF0b3JDdG9yT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IERlZkxpc3RCYXNlTWVkaWF0b3Iob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBjaGFuY2UgdG8gdXBkYXRlIHRoZSBmcmVzaGx5IGdlbmVyYXRlZCBkYXRhIHByb3ZpZGVyLlxuICAgICAqIEUuZy4sIHdlIGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gdXBkYXRlIHRoZSBlbmRwb2ludCB1cmwuIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0b3VjaExvY2FsRGF0YVByb3ZpZGVyKGRhdGFQcm92aWRlcjogYW55KSB7XG4gICAgfVxuXG59XG4iXX0=