// base
import { BackboneBackedListPage } from '../../mvc/backbone-backed-list-page';
import { DefListBaseMediator } from '../mediators/def-list-base.mediator';
export class DefListBaseController extends BackboneBackedListPage {
    constructor(_listSettings) {
        // If we navigated to this page, we will have an item available as a nav param
        super();
        this._listSettings = _listSettings;
        this.mediatorCache = this.getGlobalCache();
    }
    get asDefListBaseMediator() {
        return this.listMediator;
    }
    /**
     * Indicates whether the underlying medicator is built from the previous
     * cache or not.
     */
    get fromCache() {
        // Get the fromCache value ...
        return this.listMediator ? this.asDefListBaseMediator._formCache : false;
    }
    /**
     * Indicates whether the underlying medicator is still in the init stage,
     * I.e., the underlying mediator has not conducted any request or not.
     */
    get inInitState() {
        return this.listMediator ? this.asDefListBaseMediator._isInit : true;
    }
    getCacheKey() {
        return this._listSettings.cacheKey;
    }
    /**
     * Builds the underlying mediator
     * @param keyword The parameter is passed all the way from the
     * onDocumentReady method.
     */
    buildMediator(keyword) {
        const backendService = this.getBackendService();
        const backendProvider = backendService.backendProvider;
        let globalDataProvider = null;
        const reDBService = this.getRelationalDB();
        const relDB = reDBService.get();
        // Build collections
        globalDataProvider = relDB.getTable(this._listSettings.tableName).dataProvider();
        // Local data provider
        // The parameter is the endpoint defined by backend.service
        const Ctor = backendProvider.getEndPoint(this._listSettings.endpointName);
        const localDataProvider = new Ctor();
        this.touchLocalDataProvider(localDataProvider);
        // Init data provider 
        localDataProvider.state.pageSize = 40;
        localDataProvider.state.keyword = keyword;
        const filterOptions = globalDataProvider ? {
            added: true,
            removed: true,
            updated: false
        } : {
            added: false,
            removed: false,
            updated: false
        };
        const ctorOptions = {
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
    }
    /**
     * Provides a chance to invoke a derived mediator in the derived controller.
     * @param options
     */
    invokeMediatorCtor(options) {
        return new DefListBaseMediator(options);
    }
    /**
     * Provides a chance to update the freshly generated data provider.
     * E.g., we can use this method to update the endpoint url.
     */
    touchLocalDataProvider(dataProvider) {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9scHdhcmUvbmd4LW12Yy9zcmMvbGliL3BhZ2VzL2NvbnRyb2xsZXJzL2RlZi1saXN0LWJhc2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPO0FBQ1AsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFN0UsT0FBTyxFQUVILG1CQUFtQixFQUV0QixNQUFNLHFDQUFxQyxDQUFDO0FBUTdDLE1BQU0sT0FBZ0IscUJBQWlELFNBQVEsc0JBQXlCO0lBRXBHLFlBQStCLGFBQTZDO1FBQ3hFLDhFQUE4RTtRQUM5RSxLQUFLLEVBQUUsQ0FBQztRQUZtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0M7UUFJeEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQVcscUJBQXFCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQTBDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsU0FBUztRQUNoQiw4QkFBOEI7UUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RSxDQUFDO0lBRVMsV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFNRDs7OztPQUlHO0lBQ08sYUFBYSxDQUFDLE9BQWU7UUFFbkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDaEQsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztRQUV2RCxJQUFJLGtCQUFrQixHQUFnQyxJQUFJLENBQUM7UUFFM0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxvQkFBb0I7UUFDcEIsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRWpGLHNCQUFzQjtRQUN0QiwyREFBMkQ7UUFDM0QsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvQyxzQkFBc0I7UUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdEMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFMUMsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUMsQ0FBQztZQUNJLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBRU4sTUFBTSxXQUFXLEdBQW9DO1lBQ2pELGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxFQUFFO1lBQ1osY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGtCQUFrQixDQUFDLE9BQXdDO1FBQ2pFLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sc0JBQXNCLENBQUMsWUFBaUI7SUFDbEQsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJRnVsbEJhY2tib25lQ29sbGVjdGlvbkxpa2UsIElDb2xsZWN0aW9uSXRlbSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcbi8vIGJhc2VcbmltcG9ydCB7IEJhY2tib25lQmFja2VkTGlzdFBhZ2UgfSBmcm9tICcuLi8uLi9tdmMvYmFja2JvbmUtYmFja2VkLWxpc3QtcGFnZSc7XG5cbmltcG9ydCB7XG4gICAgSURlZkxpc3RCYXNlTWVkaWF0b3JDdG9yT3B0aW9ucyxcbiAgICBEZWZMaXN0QmFzZU1lZGlhdG9yLFxuICAgIElEZWZMaXN0QmFzZU1lZGlhdG9yUHVibGljXG59IGZyb20gJy4uL21lZGlhdG9ycy9kZWYtbGlzdC1iYXNlLm1lZGlhdG9yJztcblxuZXhwb3J0IGludGVyZmFjZSBJRGVmTGlzdEJhc2VDb250cm9sbGVyU2V0dGluZ3Mge1xuICAgIGVuZHBvaW50TmFtZTogc3RyaW5nO1xuICAgIHRhYmxlTmFtZTogc3RyaW5nO1xuICAgIGNhY2hlS2V5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEZWZMaXN0QmFzZUNvbnRyb2xsZXI8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT4gZXh0ZW5kcyBCYWNrYm9uZUJhY2tlZExpc3RQYWdlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBfbGlzdFNldHRpbmdzOiBJRGVmTGlzdEJhc2VDb250cm9sbGVyU2V0dGluZ3MpIHtcbiAgICAgICAgLy8gSWYgd2UgbmF2aWdhdGVkIHRvIHRoaXMgcGFnZSwgd2Ugd2lsbCBoYXZlIGFuIGl0ZW0gYXZhaWxhYmxlIGFzIGEgbmF2IHBhcmFtXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5tZWRpYXRvckNhY2hlID0gdGhpcy5nZXRHbG9iYWxDYWNoZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYXNEZWZMaXN0QmFzZU1lZGlhdG9yKCk6IElEZWZMaXN0QmFzZU1lZGlhdG9yUHVibGljIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE1lZGlhdG9yIGFzIElEZWZMaXN0QmFzZU1lZGlhdG9yUHVibGljO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB1bmRlcmx5aW5nIG1lZGljYXRvciBpcyBidWlsdCBmcm9tIHRoZSBwcmV2aW91cyBcbiAgICAgKiBjYWNoZSBvciBub3QuIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZnJvbUNhY2hlKCkge1xuICAgICAgICAvLyBHZXQgdGhlIGZyb21DYWNoZSB2YWx1ZSAuLi5cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE1lZGlhdG9yID8gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IuX2Zvcm1DYWNoZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB1bmRlcmx5aW5nIG1lZGljYXRvciBpcyBzdGlsbCBpbiB0aGUgaW5pdCBzdGFnZSwgXG4gICAgICogSS5lLiwgdGhlIHVuZGVybHlpbmcgbWVkaWF0b3IgaGFzIG5vdCBjb25kdWN0ZWQgYW55IHJlcXVlc3Qgb3Igbm90LiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGluSW5pdFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0TWVkaWF0b3IgPyB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5faXNJbml0IDogdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0Q2FjaGVLZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RTZXR0aW5ncy5jYWNoZUtleTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0QmFja2VuZFNlcnZpY2UoKTogYW55O1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRHbG9iYWxDYWNoZSgpOiBhbnk7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFJlbGF0aW9uYWxEQigpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHVuZGVybHlpbmcgbWVkaWF0b3JcbiAgICAgKiBAcGFyYW0ga2V5d29yZCBUaGUgcGFyYW1ldGVyIGlzIHBhc3NlZCBhbGwgdGhlIHdheSBmcm9tIHRoZVxuICAgICAqIG9uRG9jdW1lbnRSZWFkeSBtZXRob2QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVkaWF0b3Ioa2V5d29yZDogc3RyaW5nKTogUHJvbWlzZUxpa2U8dm9pZD4ge1xuXG4gICAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5nZXRCYWNrZW5kU2VydmljZSgpO1xuICAgICAgICBjb25zdCBiYWNrZW5kUHJvdmlkZXIgPSBiYWNrZW5kU2VydmljZS5iYWNrZW5kUHJvdmlkZXI7XG5cbiAgICAgICAgbGV0IGdsb2JhbERhdGFQcm92aWRlcjogSUZ1bGxCYWNrYm9uZUNvbGxlY3Rpb25MaWtlID0gbnVsbDtcblxuICAgICAgICBjb25zdCByZURCU2VydmljZSA9IHRoaXMuZ2V0UmVsYXRpb25hbERCKCk7XG4gICAgICAgIGNvbnN0IHJlbERCID0gcmVEQlNlcnZpY2UuZ2V0KCk7XG5cbiAgICAgICAgLy8gQnVpbGQgY29sbGVjdGlvbnNcbiAgICAgICAgZ2xvYmFsRGF0YVByb3ZpZGVyID0gcmVsREIuZ2V0VGFibGUodGhpcy5fbGlzdFNldHRpbmdzLnRhYmxlTmFtZSkuZGF0YVByb3ZpZGVyKCk7XG5cbiAgICAgICAgLy8gTG9jYWwgZGF0YSBwcm92aWRlclxuICAgICAgICAvLyBUaGUgcGFyYW1ldGVyIGlzIHRoZSBlbmRwb2ludCBkZWZpbmVkIGJ5IGJhY2tlbmQuc2VydmljZVxuICAgICAgICBjb25zdCBDdG9yID0gYmFja2VuZFByb3ZpZGVyLmdldEVuZFBvaW50KHRoaXMuX2xpc3RTZXR0aW5ncy5lbmRwb2ludE5hbWUpO1xuICAgICAgICBjb25zdCBsb2NhbERhdGFQcm92aWRlciA9IG5ldyBDdG9yKCk7XG5cbiAgICAgICAgdGhpcy50b3VjaExvY2FsRGF0YVByb3ZpZGVyKGxvY2FsRGF0YVByb3ZpZGVyKTtcblxuICAgICAgICAvLyBJbml0IGRhdGEgcHJvdmlkZXIgXG4gICAgICAgIGxvY2FsRGF0YVByb3ZpZGVyLnN0YXRlLnBhZ2VTaXplID0gNDA7XG4gICAgICAgIGxvY2FsRGF0YVByb3ZpZGVyLnN0YXRlLmtleXdvcmQgPSBrZXl3b3JkO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSBnbG9iYWxEYXRhUHJvdmlkZXIgPyB7XG4gICAgICAgICAgICBhZGRlZDogdHJ1ZSxcbiAgICAgICAgICAgIHJlbW92ZWQ6IHRydWUsXG4gICAgICAgICAgICB1cGRhdGVkOiBmYWxzZVxuICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgIGFkZGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZW1vdmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjdG9yT3B0aW9uczogSURlZkxpc3RCYXNlTWVkaWF0b3JDdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGdsb2JhbFByb3ZpZGVyOiBnbG9iYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICBmaWx0ZXJGbGFnczogZmlsdGVyT3B0aW9ucyxcbiAgICAgICAgICAgIGRhdGFQcm92aWRlcjogbG9jYWxEYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICB1c2VNb2RlbDogdHJ1ZSxcbiAgICAgICAgICAgIGtleXdvcmQ6IGtleXdvcmQsXG4gICAgICAgICAgICBwYWdlU2l6ZTogNDAsXG4gICAgICAgICAgICBlbmFibGVJbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZVJlZnJlc2g6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvciA9IHRoaXMuaW52b2tlTWVkaWF0b3JDdG9yKGN0b3JPcHRpb25zKTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc2V0VXAoKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBjaGFuY2UgdG8gaW52b2tlIGEgZGVyaXZlZCBtZWRpYXRvciBpbiB0aGUgZGVyaXZlZCBjb250cm9sbGVyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGludm9rZU1lZGlhdG9yQ3RvcihvcHRpb25zOiBJRGVmTGlzdEJhc2VNZWRpYXRvckN0b3JPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGVmTGlzdEJhc2VNZWRpYXRvcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNoYW5jZSB0byB1cGRhdGUgdGhlIGZyZXNobHkgZ2VuZXJhdGVkIGRhdGEgcHJvdmlkZXIuXG4gICAgICogRS5nLiwgd2UgY2FuIHVzZSB0aGlzIG1ldGhvZCB0byB1cGRhdGUgdGhlIGVuZHBvaW50IHVybC4gXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRvdWNoTG9jYWxEYXRhUHJvdmlkZXIoZGF0YVByb3ZpZGVyOiBhbnkpIHtcbiAgICB9XG5cbn1cbiJdfQ==