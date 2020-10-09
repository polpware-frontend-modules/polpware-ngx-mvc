import { __assign, __extends } from "tslib";
import { NgStoreListMediator } from '@polpware/fe-mvc';
import { CollectionStore } from '@polpware/fe-data';
// base
import { FullFeatureListPage } from './full-feature-list-page';
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
export { NgStoreBackedListPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdzdG9yZS1iYWNrZWQtbGlzdC1wYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1tdmMvIiwic291cmNlcyI6WyJsaWIvbXZjL25nc3RvcmUtYmFja2VkLWxpc3QtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsT0FBTyxFQUNILG1CQUFtQixFQUV0QixNQUFNLGtCQUFrQixDQUFDO0FBTTFCLE9BQU8sRUFDSCxlQUFlLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFPM0IsT0FBTztBQUNQLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9ELHFFQUFxRTtBQUNyRSxtQ0FBbUM7QUFFbkM7SUFDWSx5Q0FBbUI7SUFhM0I7UUFBQSxZQUNJLGlCQUFPLFNBU1Y7UUFyQlMsdUJBQWlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQWNqQyxLQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDdkIsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDO1FBQ0YsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzs7SUFDdkMsQ0FBQztJQUVELFdBQVc7SUFDRCw4Q0FBYyxHQUF4QixVQUF5QixTQUFrQjtRQUEzQyxpQkFVQztRQVRHLGlCQUFNLGNBQWMsWUFBQyxTQUFTLENBQUMsQ0FBQztRQUVoQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3RELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFZLENBQUM7WUFDNUIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZiwyQ0FBMkM7WUFDM0MsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7SUFDRCwrQ0FBZSxHQUF6QjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxpQkFBTSxlQUFlLFdBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztJQUNELDZDQUFhLEdBQXZCLFVBQXdCLFlBQWlCO1FBRXJDLElBQU0sV0FBVyx5QkFDVixJQUFJLENBQUMsbUJBQW1CLEtBQzNCLFlBQVksRUFBRSxZQUFZLEdBQzdCLENBQUM7UUFFRixJQUFNLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBSyxDQUFDO1FBRW5DLElBQU0sQ0FBQyxHQUErQixJQUFJLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0JBQWMsd0RBQXFCO2FBQW5DO1lBQ0ksSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM1QixPQUFPLENBQStCLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFUyxxREFBcUIsR0FBL0IsVUFBZ0MsR0FBVztRQUN2QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRVMsc0RBQXNCLEdBQWhDLFVBQWlDLEdBQVcsRUFBRSxLQUFpQztRQUMzRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEdBQUc7WUFDM0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsdURBQXVCLEdBQWpDLFVBQWtDLEdBQVc7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVMsR0FBRztZQUN0QyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDckIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRVMsMERBQTBCLEdBQXBDLFVBQXFDLEdBQVc7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsMEJBQTBCO0lBQzFCLFdBQVc7SUFDWCx5REFBeUQ7SUFDekQsK0NBQWUsR0FBZixVQUFnQixLQUFVO1FBQ3RCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTCw0QkFBQztBQUFELENBQUMsQUFyR0QsQ0FDWSxtQkFBbUIsR0FvRzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgSUxpc3RNZWRpYXRvckN0b3JPcHRpb25zXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQge1xuICAgIE5nU3RvcmVMaXN0TWVkaWF0b3IsXG4gICAgSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWNcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7XG4gICAgSUNvbGxlY3Rpb25JdGVtXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuaW1wb3J0IHtcbiAgICBDb2xsZWN0aW9uU3RvcmVcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5cbmltcG9ydCB7XG4gICAgSVNsaWRpbmdFeHBpcmVDYWNoZVxufSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG5cbi8vIGJhc2VcbmltcG9ydCB7IEZ1bGxGZWF0dXJlTGlzdFBhZ2UgfSBmcm9tICcuL2Z1bGwtZmVhdHVyZS1saXN0LXBhZ2UnO1xuXG4vLyBOb3RlIHRoYXQgaW4gdGhlIGNsYXNzLCBwbGVhc2UgYXZvaWQgdG8gZGVwZW5kIG9uIG9uTmV3SXRlbXNSZWFkeSxcbi8vIGFzIGl0IGlzIE5PVCBpbiB0aGUgdXBkYXRlIGZsb3cuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ1N0b3JlQmFja2VkTGlzdFBhZ2U8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT5cbiAgICBleHRlbmRzIEZ1bGxGZWF0dXJlTGlzdFBhZ2Uge1xuXG4gICAgcHJvdGVjdGVkIGRlZmF1bHRMaXZlUGVyaW9kID0gNjAgKiA1O1xuXG4gICAgLy8gTW9yZSBjb25maWd1cmF0aW9uIGZvciBjb25zdHJ1Y3RpbmcgZGF0YXByb3ZpZGVyXG4gICAgcHJvdGVjdGVkIG1lZGlhdG9yQ3Rvck9wdGlvbnM6IElMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucztcblxuICAgIHByb3RlY3RlZCBtZWRpYXRvckNhY2hlOiBJU2xpZGluZ0V4cGlyZUNhY2hlPElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljPjtcbiAgICBwcml2YXRlIF9vbkNhY2hlRXhwaXJlQ2FsbGJhY2s6IGFueTtcblxuICAgIHByaXZhdGUgX3N0b3JlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHVibGljIGl0ZW1zOiBUW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1c2VNb2RlbDogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZUluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlUmVmcmVzaDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgdHVybk9uTWVkaWF0b3IoZnJvbUNhY2hlOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyLnR1cm5Pbk1lZGlhdG9yKGZyb21DYWNoZSk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLmFzTmdTdG9yZUxpc3RNZWlkYXRvci5nZXROZ1N0b3JlKCk7XG4gICAgICAgIHRoaXMuX3N0b3JlU3Vic2NyaXB0aW9uID0gc3RvcmUuZ2V0U3RhdGUoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHcgPSBkYXRhLml0ZW1zIGFzIFRbXTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB3O1xuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHdlIG11c3QgY2FsbCBvbkl0ZW1zUmVhZHkgLi4uIFxuICAgICAgICAgICAgdGhpcy5vbkl0ZW1zUmVhZHkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgdHVybk9mZk1lZGlhdG9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICBzdXBlci50dXJuT2ZmTWVkaWF0b3IoKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBidWlsZE1lZGlhdG9yKGRhdGFQcm92aWRlcjogYW55KTogUHJvbWlzZUxpa2U8dm9pZD4ge1xuXG4gICAgICAgIGNvbnN0IGN0b3JPcHRpb25zOiBJTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhdG9yQ3Rvck9wdGlvbnMsXG4gICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGRhdGFQcm92aWRlclxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHMgPSBuZXcgQ29sbGVjdGlvblN0b3JlPFQ+KCk7XG5cbiAgICAgICAgY29uc3QgbTogSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWMgPSBuZXcgTmdTdG9yZUxpc3RNZWRpYXRvcihjdG9yT3B0aW9ucyk7XG4gICAgICAgIG0uc2V0TmdTdG9yZShzKTtcblxuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IG07XG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yLnNldFVwKCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYXNOZ1N0b3JlTGlzdE1laWRhdG9yKCk6IElOZ1N0b3JlTGlzdE1lZGlhdG9yUHVibGljIHtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMubGlzdE1lZGlhdG9yO1xuICAgICAgICByZXR1cm4gbSBhcyBJTmdTdG9yZUxpc3RNZWRpYXRvclB1YmxpYztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZE1lZGlhdG9yRnJvbUNhY2hlKGtleTogc3RyaW5nKTogSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWMge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYXRvckNhY2hlLmdldChrZXksIHRoaXMuZGVmYXVsdExpdmVQZXJpb2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3cml0ZU1lZGlhdG9ySW50b0NhY2hlKGtleTogc3RyaW5nLCB2YWx1ZTogSU5nU3RvcmVMaXN0TWVkaWF0b3JQdWJsaWMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlLnNldChrZXksIHZhbHVlLCB0aGlzLmRlZmF1bHRMaXZlUGVyaW9kLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS50ZWFyRG93bigpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZE9uQ2FjaGVFeHBpcmVIYW5kbGVyKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uQ2FjaGVFeHBpcmVDYWxsYmFjayA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubWVkaWF0b3JDYWNoZS5hZGRPbkV4cGlyZUhhbmRsZXIoa2V5LCB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2spO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUucm1PbkV4cGlyZUhhbmRsZXIoa2V5LCB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9vbkNhY2hlRXhwaXJlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24uXG4gICAgLy8gT3ZlcnJpZGVcbiAgICAvLyBOb3RlIHRoYXQgaW4gdGhlIGRlcml2ZWQgY2xhc3Mgd2UgZG8gTk9UIGRlcGVuZCBvbiBpdC5cbiAgICBvbk5ld0l0ZW1zUmVhZHkoaXRlbXM6IFRbXSkge1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG59XG5cbiJdfQ==