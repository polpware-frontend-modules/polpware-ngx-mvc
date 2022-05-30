import { RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
export const DefListBaseMediator = RxjsPoweredWritableListMediator.extend({
    /* Properties */
    Properties: 'filter,keyword,pageSize',
    /**
     * Override
     *
     * @param settings
     */
    init: function (settings) {
        const self = this;
        self._super(settings);
        self._filter = '';
        // Init 
        self._keyword = settings.keyword || '';
        self._pageSize = settings.pageSize || 40;
        self._fromCache = false;
    },
    /**
     * Override
     * Render data in
     * @param asyncLoaded
     */
    renderData: function (asyncLoaded) {
        const self = this;
        self._super(asyncLoaded);
    },
    /**
     * Override
     * so that we can reload data even in the case of cache
     * @param {} fromCache
     */
    startService: function (viewInstance, fromCache) {
        const self = this;
        self.attachView(viewInstance);
        if (fromCache === true) {
            self._fromCache = true;
            self.renderData(true);
        }
        else {
            self._fromCache = false;
            // Enforce that keyword is ''
            self.startServiceImpl();
        }
    },
    /**
     * Override
     */
    reComputeDataParams: function () {
        const self = this;
        // target
        const state = self._dataProvider.state;
        state.offset = 0;
        state.keyword = self._keyword || '';
    },
    /**
     * Override
     */
    loadInitData: function () {
        const self = this;
        self.reComputeDataParams();
        return self._super();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5tZWRpYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BvbHB3YXJlL25neC1tdmMvc3JjL2xpYi9wYWdlcy9tZWRpYXRvcnMvZGVmLWxpc3QtYmFzZS5tZWRpYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9HLCtCQUErQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFrRHJLLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLCtCQUErQixDQUFDLE1BQU0sQ0FBQztJQUV0RSxnQkFBZ0I7SUFDaEIsVUFBVSxFQUFFLHlCQUF5QjtJQUVyQzs7OztPQUlHO0lBQ0gsSUFBSSxFQUFFLFVBQVMsUUFBeUM7UUFDcEQsTUFBTSxJQUFJLEdBQTRCLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFFBQVE7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLEVBQUUsVUFBUyxXQUFvQjtRQUNyQyxNQUFNLElBQUksR0FBNEIsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLEVBQUUsVUFBUyxZQUFZLEVBQUUsU0FBa0I7UUFDbkQsTUFBTSxJQUFJLEdBQTRCLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlCLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsRUFBRTtRQUNqQixNQUFNLElBQUksR0FBNEIsSUFBSSxDQUFDO1FBQzNDLFNBQVM7UUFDVCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN2QyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksRUFBRTtRQUNWLE1BQU0sSUFBSSxHQUE0QixJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUVKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElSeGpzUG93ZXJlZERpckNvbnRlbnRNZWRpYXRvckRldiwgSVdyaXRhYmxlTGlzdE1lZGlhdG9yQ3Rvck9wdGlvbnMsIElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYywgUnhqc1Bvd2VyZWRXcml0YWJsZUxpc3RNZWRpYXRvciB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZWZMaXN0QmFzZU1lZGlhdG9yQ3Rvck9wdGlvbnMgZXh0ZW5kcyBJV3JpdGFibGVMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucyB7XG4gICAga2V5d29yZD86IHN0cmluZztcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcbn1cblxuLyoqIFNwZWNpZmllcyB0aGUgaW50ZXJuYWwgaW50ZXJmYWNlIGZvciBhY2Nlc3NpbmcgdGhlIHByb3BlcnRpZXMgXG4gKiBvZiB0aGUgaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYSBtZWRpYXRvci5cbiAqIFxuICogVGhpcyBpbnRlcmZhY2UgaXMgc3VwcG9zZWQgdXNlZCBvbmx5IGluIHRoZSB0cmFkaXRpb25hbCB3YXkgb2YgaW1wbGVtZW50aW5nIGEgXG4gKiBhIGNsYXNzLCBlLmcuLCB0aGUgd2F5IG9mIHh4LmV4dGVuZCh7fSkuIFxuICogXG4gKiBVc2luZyB0aGlzIGludGVyZmFjZSBoZWxwcyB0aGUgZWRpdG9yIHRvIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgcHJvcGVydGllcyBcbiAqIHdoZW4gd2UgaW1wbGVtZW50IHRoZSBtZWRpYXRvci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRGVmTGlzdEJhc2VNZWRpYXRvckRldiBleHRlbmRzIElSeGpzUG93ZXJlZERpckNvbnRlbnRNZWRpYXRvckRldiB7XG4gICAgX2ZpbHRlcjogc3RyaW5nO1xuICAgIF9rZXl3b3JkOiBzdHJpbmc7XG4gICAgX3BhZ2VTaXplOiBudW1iZXI7XG4gICAgX2Zyb21DYWNoZTogYm9vbGVhbjtcblxuICAgIHJlQ29tcHV0ZURhdGFQYXJhbXMoKTtcbn1cblxuLyoqIFNwZWNpZmllcyB0aGUgaW50ZXJmYWNlIHRoYXQgd2UgY2FuIHVzZSBpbiB0aGUgY29udHJvbGxlciBcbiAqIHdoaWNoIHVzZXMgdGhlIG1lZGlhdG9yLlxuICogIFxuICogVGhpcyBpbnRlcmZhY2UgYW5kIHRoZSBhYm92ZSBpbnRlcmZhY2UgZGVzY3JpYmVzIHRoZSBzYW1lIG9iamVjdCBpbiBcbiAqIHR3byBkaXN0aW5jdCBwZXJzcGVjdGl2ZXMuIFRoZSBhYm92ZSBvbmUgZGVmaW5lcyB0aGUgaW50ZXJmYWNlIGZyb20gdGhlIFxuICogcGVyc3BlY3RpdmUgb2YgaW1wbG1lbnRpbmcgYSBtZWRpdGF0b3IuIFRoaXMgb25lIGRlZmluZXMgdGhlIGludGVyZmFjZSBcbiAqIGZyb20gdGhlIHBlcnNwZWN0aXZlIG9mIGEgY2xpZW50LlxuICogXG4gKiBVc2luZyB0aGlzIGludGVyZmFjZSBoZWxwcyB0aGUgZWRpdG9yIHRvIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgbWV0aG9kcyBcbiAqIHdlIG1heSB1c2UgaW4gdGhlIGNvbnRyb2xsZXIgYW5kIGl0cyBzdWItY2xhc3Nlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRGVmTGlzdEJhc2VNZWRpYXRvclB1YmxpYyBleHRlbmRzIElXcml0YWJsZUxpc3RNZWRpYXRvclB1YmxpYyB7XG5cbiAgICAvLyBmaWx0ZXIgaXMgbm90IGV4cG9zZWQgeWV0LCBiZWNhdXNlIHdlIGRvIG5vdCBrbm93IGhvdyB0byB1c2UgaXQgaW4gdGhlIGNvbnRyb2xsZXIgeWV0LlxuXG4gICAgLy8gV2Ugb25seSBtYW5pcHVsYXRlIHBhZ2VTaXplIGludGVybmFsbHksIGFuZCB0aGVuXG4gICAgLy8gaXQgaXMgbm90IG5lY2Vzc2FyeSB0byBleHBvc2UgaXQgdG8gdGhlIGNvbnRyb2xsZXIuXG5cbiAgICBrZXl3b3JkKHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xuXG4gICAgLy8gUmVhZCB0aGUgdmFsdWUgb2YgZm9ybUNhY2hlXG4gICAgX2Zvcm1DYWNoZTogYm9vbGVhbjtcbiAgICBfaXNJbml0OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgRGVmTGlzdEJhc2VNZWRpYXRvciA9IFJ4anNQb3dlcmVkV3JpdGFibGVMaXN0TWVkaWF0b3IuZXh0ZW5kKHtcblxuICAgIC8qIFByb3BlcnRpZXMgKi9cbiAgICBQcm9wZXJ0aWVzOiAnZmlsdGVyLGtleXdvcmQscGFnZVNpemUnLFxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbihzZXR0aW5nczogSURlZkxpc3RCYXNlTWVkaWF0b3JDdG9yT3B0aW9ucykge1xuICAgICAgICBjb25zdCBzZWxmOiBJRGVmTGlzdEJhc2VNZWRpYXRvckRldiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX3N1cGVyKHNldHRpbmdzKTtcblxuICAgICAgICBzZWxmLl9maWx0ZXIgPSAnJztcbiAgICAgICAgLy8gSW5pdCBcbiAgICAgICAgc2VsZi5fa2V5d29yZCA9IHNldHRpbmdzLmtleXdvcmQgfHwgJyc7XG4gICAgICAgIHNlbGYuX3BhZ2VTaXplID0gc2V0dGluZ3MucGFnZVNpemUgfHwgNDA7XG4gICAgICAgIHNlbGYuX2Zyb21DYWNoZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBcbiAgICAgKiBSZW5kZXIgZGF0YSBpbiBcbiAgICAgKiBAcGFyYW0gYXN5bmNMb2FkZWRcbiAgICAgKi9cbiAgICByZW5kZXJEYXRhOiBmdW5jdGlvbihhc3luY0xvYWRlZDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBzZWxmOiBJRGVmTGlzdEJhc2VNZWRpYXRvckRldiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX3N1cGVyKGFzeW5jTG9hZGVkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcmVsb2FkIGRhdGEgZXZlbiBpbiB0aGUgY2FzZSBvZiBjYWNoZVxuICAgICAqIEBwYXJhbSB7fSBmcm9tQ2FjaGVcbiAgICAgKi9cbiAgICBzdGFydFNlcnZpY2U6IGZ1bmN0aW9uKHZpZXdJbnN0YW5jZSwgZnJvbUNhY2hlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHNlbGY6IElEZWZMaXN0QmFzZU1lZGlhdG9yRGV2ID0gdGhpcztcbiAgICAgICAgc2VsZi5hdHRhY2hWaWV3KHZpZXdJbnN0YW5jZSk7XG4gICAgICAgIGlmIChmcm9tQ2FjaGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNlbGYuX2Zyb21DYWNoZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnJlbmRlckRhdGEodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLl9mcm9tQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEVuZm9yY2UgdGhhdCBrZXl3b3JkIGlzICcnXG4gICAgICAgICAgICBzZWxmLnN0YXJ0U2VydmljZUltcGwoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZVxuICAgICAqL1xuICAgIHJlQ29tcHV0ZURhdGFQYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWxmOiBJRGVmTGlzdEJhc2VNZWRpYXRvckRldiA9IHRoaXM7XG4gICAgICAgIC8vIHRhcmdldFxuICAgICAgICBjb25zdCBzdGF0ZSA9IHNlbGYuX2RhdGFQcm92aWRlci5zdGF0ZTtcbiAgICAgICAgc3RhdGUub2Zmc2V0ID0gMDtcbiAgICAgICAgc3RhdGUua2V5d29yZCA9IHNlbGYuX2tleXdvcmQgfHwgJyc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlXG4gICAgICovXG4gICAgbG9hZEluaXREYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZjogSURlZkxpc3RCYXNlTWVkaWF0b3JEZXYgPSB0aGlzO1xuICAgICAgICBzZWxmLnJlQ29tcHV0ZURhdGFQYXJhbXMoKTtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3N1cGVyKCk7XG4gICAgfVxuXG59KTtcbiJdfQ==