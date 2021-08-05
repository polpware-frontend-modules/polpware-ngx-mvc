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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1tdmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvY29udHJvbGxlcnMvZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU87QUFDUCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUU3RSxPQUFPLEVBRUgsbUJBQW1CLEVBRXRCLE1BQU0scUNBQXFDLENBQUM7QUFRN0MsTUFBTSxPQUFnQixxQkFBaUQsU0FBUSxzQkFBeUI7SUFFcEcsWUFBK0IsYUFBNkM7UUFDeEUsOEVBQThFO1FBQzlFLEtBQUssRUFBRSxDQUFDO1FBRm1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQztRQUl4RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBVyxxQkFBcUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBMEMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxTQUFTO1FBQ2hCLDhCQUE4QjtRQUM5QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pFLENBQUM7SUFFUyxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQU1EOzs7O09BSUc7SUFDTyxhQUFhLENBQUMsT0FBZTtRQUVuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBRXZELElBQUksa0JBQWtCLEdBQWdDLElBQUksQ0FBQztRQUUzRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWhDLG9CQUFvQjtRQUNwQixrQkFBa0IsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFakYsc0JBQXNCO1FBQ3RCLDJEQUEyRDtRQUMzRCxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9DLHNCQUFzQjtRQUN0QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN0QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUUxQyxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0ksS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFFTixNQUFNLFdBQVcsR0FBb0M7WUFDakQsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sa0JBQWtCLENBQUMsT0FBd0M7UUFDakUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDTyxzQkFBc0IsQ0FBQyxZQUFpQjtJQUNsRCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IElGdWxsQmFja2JvbmVDb2xsZWN0aW9uTGlrZSwgSUNvbGxlY3Rpb25JdGVtIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuLy8gYmFzZVxuaW1wb3J0IHsgQmFja2JvbmVCYWNrZWRMaXN0UGFnZSB9IGZyb20gJy4uLy4uL212Yy9iYWNrYm9uZS1iYWNrZWQtbGlzdC1wYWdlJztcblxuaW1wb3J0IHtcbiAgICBJRGVmTGlzdEJhc2VNZWRpYXRvckN0b3JPcHRpb25zLFxuICAgIERlZkxpc3RCYXNlTWVkaWF0b3IsXG4gICAgSURlZkxpc3RCYXNlTWVkaWF0b3JQdWJsaWNcbn0gZnJvbSAnLi4vbWVkaWF0b3JzL2RlZi1saXN0LWJhc2UubWVkaWF0b3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZWZMaXN0QmFzZUNvbnRyb2xsZXJTZXR0aW5ncyB7XG4gICAgZW5kcG9pbnROYW1lOiBzdHJpbmc7XG4gICAgdGFibGVOYW1lOiBzdHJpbmc7XG4gICAgY2FjaGVLZXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZkxpc3RCYXNlQ29udHJvbGxlcjxUIGV4dGVuZHMgSUNvbGxlY3Rpb25JdGVtPiBleHRlbmRzIEJhY2tib25lQmFja2VkTGlzdFBhZ2U8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IF9saXN0U2V0dGluZ3M6IElEZWZMaXN0QmFzZUNvbnRyb2xsZXJTZXR0aW5ncykge1xuICAgICAgICAvLyBJZiB3ZSBuYXZpZ2F0ZWQgdG8gdGhpcyBwYWdlLCB3ZSB3aWxsIGhhdmUgYW4gaXRlbSBhdmFpbGFibGUgYXMgYSBuYXYgcGFyYW1cbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm1lZGlhdG9yQ2FjaGUgPSB0aGlzLmdldEdsb2JhbENhY2hlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhc0RlZkxpc3RCYXNlTWVkaWF0b3IoKTogSURlZkxpc3RCYXNlTWVkaWF0b3JQdWJsaWMge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0TWVkaWF0b3IgYXMgSURlZkxpc3RCYXNlTWVkaWF0b3JQdWJsaWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHVuZGVybHlpbmcgbWVkaWNhdG9yIGlzIGJ1aWx0IGZyb20gdGhlIHByZXZpb3VzIFxuICAgICAqIGNhY2hlIG9yIG5vdC4gXG4gICAgICovXG4gICAgcHVibGljIGdldCBmcm9tQ2FjaGUoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgZnJvbUNhY2hlIHZhbHVlIC4uLlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0TWVkaWF0b3IgPyB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5fZm9ybUNhY2hlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHVuZGVybHlpbmcgbWVkaWNhdG9yIGlzIHN0aWxsIGluIHRoZSBpbml0IHN0YWdlLCBcbiAgICAgKiBJLmUuLCB0aGUgdW5kZXJseWluZyBtZWRpYXRvciBoYXMgbm90IGNvbmR1Y3RlZCBhbnkgcmVxdWVzdCBvciBub3QuIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaW5Jbml0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RNZWRpYXRvciA/IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLl9pc0luaXQgOiB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRDYWNoZUtleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFNldHRpbmdzLmNhY2hlS2V5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRCYWNrZW5kU2VydmljZSgpOiBhbnk7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEdsb2JhbENhY2hlKCk6IGFueTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0UmVsYXRpb25hbERCKCk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgdW5kZXJseWluZyBtZWRpYXRvclxuICAgICAqIEBwYXJhbSBrZXl3b3JkIFRoZSBwYXJhbWV0ZXIgaXMgcGFzc2VkIGFsbCB0aGUgd2F5IGZyb20gdGhlXG4gICAgICogb25Eb2N1bWVudFJlYWR5IG1ldGhvZC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZWRpYXRvcihrZXl3b3JkOiBzdHJpbmcpOiBQcm9taXNlTGlrZTx2b2lkPiB7XG5cbiAgICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLmdldEJhY2tlbmRTZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IGJhY2tlbmRQcm92aWRlciA9IGJhY2tlbmRTZXJ2aWNlLmJhY2tlbmRQcm92aWRlcjtcblxuICAgICAgICBsZXQgZ2xvYmFsRGF0YVByb3ZpZGVyOiBJRnVsbEJhY2tib25lQ29sbGVjdGlvbkxpa2UgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJlREJTZXJ2aWNlID0gdGhpcy5nZXRSZWxhdGlvbmFsREIoKTtcbiAgICAgICAgY29uc3QgcmVsREIgPSByZURCU2VydmljZS5nZXQoKTtcblxuICAgICAgICAvLyBCdWlsZCBjb2xsZWN0aW9uc1xuICAgICAgICBnbG9iYWxEYXRhUHJvdmlkZXIgPSByZWxEQi5nZXRUYWJsZSh0aGlzLl9saXN0U2V0dGluZ3MudGFibGVOYW1lKS5kYXRhUHJvdmlkZXIoKTtcblxuICAgICAgICAvLyBMb2NhbCBkYXRhIHByb3ZpZGVyXG4gICAgICAgIC8vIFRoZSBwYXJhbWV0ZXIgaXMgdGhlIGVuZHBvaW50IGRlZmluZWQgYnkgYmFja2VuZC5zZXJ2aWNlXG4gICAgICAgIGNvbnN0IEN0b3IgPSBiYWNrZW5kUHJvdmlkZXIuZ2V0RW5kUG9pbnQodGhpcy5fbGlzdFNldHRpbmdzLmVuZHBvaW50TmFtZSk7XG4gICAgICAgIGNvbnN0IGxvY2FsRGF0YVByb3ZpZGVyID0gbmV3IEN0b3IoKTtcblxuICAgICAgICB0aGlzLnRvdWNoTG9jYWxEYXRhUHJvdmlkZXIobG9jYWxEYXRhUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vIEluaXQgZGF0YSBwcm92aWRlciBcbiAgICAgICAgbG9jYWxEYXRhUHJvdmlkZXIuc3RhdGUucGFnZVNpemUgPSA0MDtcbiAgICAgICAgbG9jYWxEYXRhUHJvdmlkZXIuc3RhdGUua2V5d29yZCA9IGtleXdvcmQ7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyT3B0aW9ucyA9IGdsb2JhbERhdGFQcm92aWRlciA/IHtcbiAgICAgICAgICAgIGFkZGVkOiB0cnVlLFxuICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICAgIHVwZGF0ZWQ6IGZhbHNlXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgYWRkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlbW92ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGN0b3JPcHRpb25zOiBJRGVmTGlzdEJhc2VNZWRpYXRvckN0b3JPcHRpb25zID0ge1xuICAgICAgICAgICAgZ2xvYmFsUHJvdmlkZXI6IGdsb2JhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIGZpbHRlckZsYWdzOiBmaWx0ZXJPcHRpb25zLFxuICAgICAgICAgICAgZGF0YVByb3ZpZGVyOiBsb2NhbERhdGFQcm92aWRlcixcbiAgICAgICAgICAgIHVzZU1vZGVsOiB0cnVlLFxuICAgICAgICAgICAga2V5d29yZDoga2V5d29yZCxcbiAgICAgICAgICAgIHBhZ2VTaXplOiA0MCxcbiAgICAgICAgICAgIGVuYWJsZUluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlUmVmcmVzaDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yID0gdGhpcy5pbnZva2VNZWRpYXRvckN0b3IoY3Rvck9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zZXRVcCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNoYW5jZSB0byBpbnZva2UgYSBkZXJpdmVkIG1lZGlhdG9yIGluIHRoZSBkZXJpdmVkIGNvbnRyb2xsZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW52b2tlTWVkaWF0b3JDdG9yKG9wdGlvbnM6IElEZWZMaXN0QmFzZU1lZGlhdG9yQ3Rvck9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWZMaXN0QmFzZU1lZGlhdG9yKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGEgY2hhbmNlIHRvIHVwZGF0ZSB0aGUgZnJlc2hseSBnZW5lcmF0ZWQgZGF0YSBwcm92aWRlci5cbiAgICAgKiBFLmcuLCB3ZSBjYW4gdXNlIHRoaXMgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgZW5kcG9pbnQgdXJsLiBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdG91Y2hMb2NhbERhdGFQcm92aWRlcihkYXRhUHJvdmlkZXI6IGFueSkge1xuICAgIH1cblxufVxuIl19