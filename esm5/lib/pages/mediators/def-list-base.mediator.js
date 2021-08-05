import { RxjsPoweredWritableListMediator } from '@polpware/fe-mvc';
export var DefListBaseMediator = RxjsPoweredWritableListMediator.extend({
    /* Properties */
    Properties: 'filter,keyword,pageSize',
    /**
     * Override
     *
     * @param settings
     */
    init: function (settings) {
        var self = this;
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
        var self = this;
        self._super(asyncLoaded);
    },
    /**
     * Override
     * so that we can reload data even in the case of cache
     * @param {} fromCache
     */
    startService: function (viewInstance, fromCache) {
        var self = this;
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
        var self = this;
        // target
        var state = self._dataProvider.state;
        state.offset = 0;
        state.keyword = self._keyword || '';
    },
    /**
     * Override
     */
    loadInitData: function () {
        var self = this;
        self.reComputeDataParams();
        return self._super();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5tZWRpYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL3BhZ2VzL21lZGlhdG9ycy9kZWYtbGlzdC1iYXNlLm1lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0csK0JBQStCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWtEckssTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUFDO0lBRXRFLGdCQUFnQjtJQUNoQixVQUFVLEVBQUUseUJBQXlCO0lBRXJDOzs7O09BSUc7SUFDSCxJQUFJLEVBQUUsVUFBUyxRQUF5QztRQUNwRCxJQUFNLElBQUksR0FBNEIsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsUUFBUTtRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsRUFBRSxVQUFTLFdBQW9CO1FBQ3JDLElBQU0sSUFBSSxHQUE0QixJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksRUFBRSxVQUFTLFlBQVksRUFBRSxTQUFrQjtRQUNuRCxJQUFNLElBQUksR0FBNEIsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQixFQUFFO1FBQ2pCLElBQU0sSUFBSSxHQUE0QixJQUFJLENBQUM7UUFDM0MsU0FBUztRQUNULElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWSxFQUFFO1FBQ1YsSUFBTSxJQUFJLEdBQTRCLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBRUosQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJ4anNQb3dlcmVkRGlyQ29udGVudE1lZGlhdG9yRGV2LCBJV3JpdGFibGVMaXN0TWVkaWF0b3JDdG9yT3B0aW9ucywgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljLCBSeGpzUG93ZXJlZFdyaXRhYmxlTGlzdE1lZGlhdG9yIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURlZkxpc3RCYXNlTWVkaWF0b3JDdG9yT3B0aW9ucyBleHRlbmRzIElXcml0YWJsZUxpc3RNZWRpYXRvckN0b3JPcHRpb25zIHtcbiAgICBrZXl3b3JkPzogc3RyaW5nO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xufVxuXG4vKiogU3BlY2lmaWVzIHRoZSBpbnRlcm5hbCBpbnRlcmZhY2UgZm9yIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBcbiAqIG9mIHRoZSBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIG1lZGlhdG9yLlxuICogXG4gKiBUaGlzIGludGVyZmFjZSBpcyBzdXBwb3NlZCB1c2VkIG9ubHkgaW4gdGhlIHRyYWRpdGlvbmFsIHdheSBvZiBpbXBsZW1lbnRpbmcgYSBcbiAqIGEgY2xhc3MsIGUuZy4sIHRoZSB3YXkgb2YgeHguZXh0ZW5kKHt9KS4gXG4gKiBcbiAqIFVzaW5nIHRoaXMgaW50ZXJmYWNlIGhlbHBzIHRoZSBlZGl0b3IgdG8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzIFxuICogd2hlbiB3ZSBpbXBsZW1lbnQgdGhlIG1lZGlhdG9yLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElEZWZMaXN0QmFzZU1lZGlhdG9yRGV2IGV4dGVuZHMgSVJ4anNQb3dlcmVkRGlyQ29udGVudE1lZGlhdG9yRGV2IHtcbiAgICBfZmlsdGVyOiBzdHJpbmc7XG4gICAgX2tleXdvcmQ6IHN0cmluZztcbiAgICBfcGFnZVNpemU6IG51bWJlcjtcbiAgICBfZnJvbUNhY2hlOiBib29sZWFuO1xuXG4gICAgcmVDb21wdXRlRGF0YVBhcmFtcygpO1xufVxuXG4vKiogU3BlY2lmaWVzIHRoZSBpbnRlcmZhY2UgdGhhdCB3ZSBjYW4gdXNlIGluIHRoZSBjb250cm9sbGVyIFxuICogd2hpY2ggdXNlcyB0aGUgbWVkaWF0b3IuXG4gKiAgXG4gKiBUaGlzIGludGVyZmFjZSBhbmQgdGhlIGFib3ZlIGludGVyZmFjZSBkZXNjcmliZXMgdGhlIHNhbWUgb2JqZWN0IGluIFxuICogdHdvIGRpc3RpbmN0IHBlcnNwZWN0aXZlcy4gVGhlIGFib3ZlIG9uZSBkZWZpbmVzIHRoZSBpbnRlcmZhY2UgZnJvbSB0aGUgXG4gKiBwZXJzcGVjdGl2ZSBvZiBpbXBsbWVudGluZyBhIG1lZGl0YXRvci4gVGhpcyBvbmUgZGVmaW5lcyB0aGUgaW50ZXJmYWNlIFxuICogZnJvbSB0aGUgcGVyc3BlY3RpdmUgb2YgYSBjbGllbnQuXG4gKiBcbiAqIFVzaW5nIHRoaXMgaW50ZXJmYWNlIGhlbHBzIHRoZSBlZGl0b3IgdG8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBtZXRob2RzIFxuICogd2UgbWF5IHVzZSBpbiB0aGUgY29udHJvbGxlciBhbmQgaXRzIHN1Yi1jbGFzc2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElEZWZMaXN0QmFzZU1lZGlhdG9yUHVibGljIGV4dGVuZHMgSVdyaXRhYmxlTGlzdE1lZGlhdG9yUHVibGljIHtcblxuICAgIC8vIGZpbHRlciBpcyBub3QgZXhwb3NlZCB5ZXQsIGJlY2F1c2Ugd2UgZG8gbm90IGtub3cgaG93IHRvIHVzZSBpdCBpbiB0aGUgY29udHJvbGxlciB5ZXQuXG5cbiAgICAvLyBXZSBvbmx5IG1hbmlwdWxhdGUgcGFnZVNpemUgaW50ZXJuYWxseSwgYW5kIHRoZW5cbiAgICAvLyBpdCBpcyBub3QgbmVjZXNzYXJ5IHRvIGV4cG9zZSBpdCB0byB0aGUgY29udHJvbGxlci5cblxuICAgIGtleXdvcmQodmFsdWU/OiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgICAvLyBSZWFkIHRoZSB2YWx1ZSBvZiBmb3JtQ2FjaGVcbiAgICBfZm9ybUNhY2hlOiBib29sZWFuO1xuICAgIF9pc0luaXQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBEZWZMaXN0QmFzZU1lZGlhdG9yID0gUnhqc1Bvd2VyZWRXcml0YWJsZUxpc3RNZWRpYXRvci5leHRlbmQoe1xuXG4gICAgLyogUHJvcGVydGllcyAqL1xuICAgIFByb3BlcnRpZXM6ICdmaWx0ZXIsa2V5d29yZCxwYWdlU2l6ZScsXG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZVxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKHNldHRpbmdzOiBJRGVmTGlzdEJhc2VNZWRpYXRvckN0b3JPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHNlbGY6IElEZWZMaXN0QmFzZU1lZGlhdG9yRGV2ID0gdGhpcztcbiAgICAgICAgc2VsZi5fc3VwZXIoc2V0dGluZ3MpO1xuXG4gICAgICAgIHNlbGYuX2ZpbHRlciA9ICcnO1xuICAgICAgICAvLyBJbml0IFxuICAgICAgICBzZWxmLl9rZXl3b3JkID0gc2V0dGluZ3Mua2V5d29yZCB8fCAnJztcbiAgICAgICAgc2VsZi5fcGFnZVNpemUgPSBzZXR0aW5ncy5wYWdlU2l6ZSB8fCA0MDtcbiAgICAgICAgc2VsZi5fZnJvbUNhY2hlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIFxuICAgICAqIFJlbmRlciBkYXRhIGluIFxuICAgICAqIEBwYXJhbSBhc3luY0xvYWRlZFxuICAgICAqL1xuICAgIHJlbmRlckRhdGE6IGZ1bmN0aW9uKGFzeW5jTG9hZGVkOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHNlbGY6IElEZWZMaXN0QmFzZU1lZGlhdG9yRGV2ID0gdGhpcztcbiAgICAgICAgc2VsZi5fc3VwZXIoYXN5bmNMb2FkZWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiByZWxvYWQgZGF0YSBldmVuIGluIHRoZSBjYXNlIG9mIGNhY2hlXG4gICAgICogQHBhcmFtIHt9IGZyb21DYWNoZVxuICAgICAqL1xuICAgIHN0YXJ0U2VydmljZTogZnVuY3Rpb24odmlld0luc3RhbmNlLCBmcm9tQ2FjaGU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3Qgc2VsZjogSURlZkxpc3RCYXNlTWVkaWF0b3JEZXYgPSB0aGlzO1xuICAgICAgICBzZWxmLmF0dGFjaFZpZXcodmlld0luc3RhbmNlKTtcbiAgICAgICAgaWYgKGZyb21DYWNoZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2VsZi5fZnJvbUNhY2hlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucmVuZGVyRGF0YSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX2Zyb21DYWNoZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gRW5mb3JjZSB0aGF0IGtleXdvcmQgaXMgJydcbiAgICAgICAgICAgIHNlbGYuc3RhcnRTZXJ2aWNlSW1wbCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlXG4gICAgICovXG4gICAgcmVDb21wdXRlRGF0YVBhcmFtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNlbGY6IElEZWZMaXN0QmFzZU1lZGlhdG9yRGV2ID0gdGhpcztcbiAgICAgICAgLy8gdGFyZ2V0XG4gICAgICAgIGNvbnN0IHN0YXRlID0gc2VsZi5fZGF0YVByb3ZpZGVyLnN0YXRlO1xuICAgICAgICBzdGF0ZS5vZmZzZXQgPSAwO1xuICAgICAgICBzdGF0ZS5rZXl3b3JkID0gc2VsZi5fa2V5d29yZCB8fCAnJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVcbiAgICAgKi9cbiAgICBsb2FkSW5pdERhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWxmOiBJRGVmTGlzdEJhc2VNZWRpYXRvckRldiA9IHRoaXM7XG4gICAgICAgIHNlbGYucmVDb21wdXRlRGF0YVBhcmFtcygpO1xuICAgICAgICByZXR1cm4gc2VsZi5fc3VwZXIoKTtcbiAgICB9XG5cbn0pO1xuIl19