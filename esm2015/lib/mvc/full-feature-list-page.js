/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// base
import { PlatformObliviousListPage } from './platform-oblivious-list-page';
import { adaptAngularToController } from './adaptors/angular-to-controller-adaptor';
/**
 * @record
 */
export function IPageLifeCycle() { }
if (false) {
    /**
     * @param {...?} args
     * @return {?}
     */
    IPageLifeCycle.prototype.onDocumentReady = function (args) { };
    /**
     * @param {...?} args
     * @return {?}
     */
    IPageLifeCycle.prototype.onDocumentDestroy = function (args) { };
}
/**
 * @abstract
 */
export class FullFeatureListPage extends PlatformObliviousListPage {
    /**
     * @param {...?} args
     * @return {?}
     */
    onDocumentReady(...args) {
        // Cache will be provided in its derived class
        this.ensureDataProvider(...args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    onDocumentDestroy(...args) {
        // Cache will be provided in its derived class
        this.turnOffMediator();
        this.afterMediatorOff();
    }
    // May be not needed. 
    /**
     * @protected
     * @param {?} dataProvider
     * @return {?}
     */
    onDataProviderReady(dataProvider) {
        this.buildMediator(dataProvider).then(() => {
            this.turnOnMediator(false);
            this.afterMediatorOn();
        });
    }
    // Override
    /**
     * @protected
     * @return {?}
     */
    buildViewInstance() {
        return adaptAngularToController({
            $scope: this
        });
    }
    /**
     * @return {?}
     */
    doRefresh() {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    }
    /**
     * @return {?}
     */
    doInfinite() {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    showLoadingIndicator(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideLoadingIndicator(...args) { }
    /**
     * @param {?} seconds
     * @return {?}
     */
    setLoadingIndicatorDelay(seconds) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    showMoreLoading(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideMoreLoading(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    showRefreshingIndicator(...args) { }
    /**
     * @param {...?} args
     * @return {?}
     */
    hideRefreshingIndicator(...args) { }
}
if (false) {
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.ensureDataProvider = function (args) { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    FullFeatureListPage.prototype.afterMediatorOn = function () { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    FullFeatureListPage.prototype.afterMediatorOff = function () { };
    /**
     * @abstract
     * @protected
     * @param {?} key
     * @return {?}
     */
    FullFeatureListPage.prototype.readMediatorFromCache = function (key) { };
    /**
     * @abstract
     * @protected
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    FullFeatureListPage.prototype.writeMediatorIntoCache = function (key, value) { };
    /**
     * @abstract
     * @protected
     * @param {?} key
     * @return {?}
     */
    FullFeatureListPage.prototype.addOnCacheExpireHandler = function (key) { };
    /**
     * @abstract
     * @protected
     * @param {?} key
     * @return {?}
     */
    FullFeatureListPage.prototype.removeOnCacheExpireHandler = function (key) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1mZWF0dXJlLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUNILHlCQUF5QixFQUM1QixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFDSCx3QkFBd0IsRUFDM0IsTUFBTSwwQ0FBMEMsQ0FBQzs7OztBQUVsRCxvQ0FHQzs7Ozs7O0lBRkcsK0RBQTJDOzs7OztJQUMzQyxpRUFBNkM7Ozs7O0FBR2pELE1BQU0sT0FBZ0IsbUJBQ2xCLFNBQVEseUJBQXlCOzs7OztJQUVqQyxlQUFlLENBQUMsR0FBRyxJQUFnQjtRQUMvQiw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxHQUFHLElBQWdCO1FBRWpDLDhDQUE4QztRQUU5QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7OztJQVlTLG1CQUFtQixDQUFDLFlBQWlCO1FBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUdTLGlCQUFpQjtRQUN2QixPQUFPLHdCQUF3QixDQUFDO1lBQzVCLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVNLFNBQVM7UUFDWixrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQzs7OztJQUVNLFVBQVU7UUFDYix1QkFBdUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxvQkFBb0IsQ0FBQyxHQUFHLElBQVcsSUFBSSxDQUFDOzs7OztJQUV4QyxvQkFBb0IsQ0FBQyxHQUFHLElBQVcsSUFBSSxDQUFDOzs7OztJQUV4Qyx3QkFBd0IsQ0FBQyxPQUFlLElBQUksQ0FBQzs7Ozs7SUFFN0MsZUFBZSxDQUFDLEdBQUcsSUFBVyxJQUFJLENBQUM7Ozs7O0lBRW5DLGVBQWUsQ0FBQyxHQUFHLElBQVcsSUFBSSxDQUFDOzs7OztJQUVuQyx1QkFBdUIsQ0FBQyxHQUFHLElBQVcsSUFBSSxDQUFDOzs7OztJQUUzQyx1QkFBdUIsQ0FBQyxHQUFHLElBQVcsSUFBSSxDQUFDO0NBRXJEOzs7Ozs7OztJQXBERyx1RUFBaUU7Ozs7OztJQUNqRSxnRUFBMkM7Ozs7OztJQUMzQyxpRUFBNEM7Ozs7Ozs7SUFFNUMseUVBQTJFOzs7Ozs7OztJQUMzRSxpRkFBeUY7Ozs7Ozs7SUFDekYsMkVBQThEOzs7Ozs7O0lBQzlELDhFQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWaWV3SW5zdGFuY2UgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcbmltcG9ydCB7IElMaXN0TWVkaWF0b3JQdWJsaWMgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcbi8vIGJhc2VcbmltcG9ydCB7XG4gICAgUGxhdGZvcm1PYmxpdmlvdXNMaXN0UGFnZVxufSBmcm9tICcuL3BsYXRmb3JtLW9ibGl2aW91cy1saXN0LXBhZ2UnO1xuXG5pbXBvcnQge1xuICAgIGFkYXB0QW5ndWxhclRvQ29udHJvbGxlclxufSBmcm9tICcuL2FkYXB0b3JzL2FuZ3VsYXItdG8tY29udHJvbGxlci1hZGFwdG9yJztcblxuZXhwb3J0IGludGVyZmFjZSBJUGFnZUxpZmVDeWNsZSB7XG4gICAgb25Eb2N1bWVudFJlYWR5KC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIG9uRG9jdW1lbnREZXN0cm95KC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVsbEZlYXR1cmVMaXN0UGFnZVxuICAgIGV4dGVuZHMgUGxhdGZvcm1PYmxpdmlvdXNMaXN0UGFnZSBpbXBsZW1lbnRzIElQYWdlTGlmZUN5Y2xlIHtcblxuICAgIG9uRG9jdW1lbnRSZWFkeSguLi5hcmdzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIC8vIENhY2hlIHdpbGwgYmUgcHJvdmlkZWQgaW4gaXRzIGRlcml2ZWQgY2xhc3NcbiAgICAgICAgdGhpcy5lbnN1cmVEYXRhUHJvdmlkZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudERlc3Ryb3koLi4uYXJnczogQXJyYXk8YW55Pikge1xuXG4gICAgICAgIC8vIENhY2hlIHdpbGwgYmUgcHJvdmlkZWQgaW4gaXRzIGRlcml2ZWQgY2xhc3NcblxuICAgICAgICB0aGlzLnR1cm5PZmZNZWRpYXRvcigpO1xuICAgICAgICB0aGlzLmFmdGVyTWVkaWF0b3JPZmYoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZW5zdXJlRGF0YVByb3ZpZGVyKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlck1lZGlhdG9yT24oKTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJNZWRpYXRvck9mZigpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRNZWRpYXRvckZyb21DYWNoZShrZXk6IHN0cmluZyk6IElMaXN0TWVkaWF0b3JQdWJsaWM7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHdyaXRlTWVkaWF0b3JJbnRvQ2FjaGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBJTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWRkT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW1vdmVPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICAvLyBNYXkgYmUgbm90IG5lZWRlZC4gXG4gICAgcHJvdGVjdGVkIG9uRGF0YVByb3ZpZGVyUmVhZHkoZGF0YVByb3ZpZGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idWlsZE1lZGlhdG9yKGRhdGFQcm92aWRlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cm5Pbk1lZGlhdG9yKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJNZWRpYXRvck9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmlld0luc3RhbmNlKCk6IElWaWV3SW5zdGFuY2Uge1xuICAgICAgICByZXR1cm4gYWRhcHRBbmd1bGFyVG9Db250cm9sbGVyKHtcbiAgICAgICAgICAgICRzY29wZTogdGhpc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9SZWZyZXNoKCkge1xuICAgICAgICAvLyBUcmlnZ2VyIHJlZnJlc2hcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uUmVmcmVzaCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3Mub25SZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZG9JbmZpbml0ZSgpIHtcbiAgICAgICAgLy8gVHJpZ2dlciBsb2FkaW5nIG1vcmVcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uSW5maW5pdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLm9uSW5maW5pdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93TG9hZGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZUxvYWRpbmdJbmRpY2F0b3IoLi4uYXJnczogYW55W10pIHsgfVxuXG4gICAgcHVibGljIHNldExvYWRpbmdJbmRpY2F0b3JEZWxheShzZWNvbmRzOiBudW1iZXIpIHsgfVxuXG4gICAgcHVibGljIHNob3dNb3JlTG9hZGluZyguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZU1vcmVMb2FkaW5nKC4uLmFyZ3M6IGFueVtdKSB7IH1cblxuICAgIHB1YmxpYyBzaG93UmVmcmVzaGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZVJlZnJlc2hpbmdJbmRpY2F0b3IoLi4uYXJnczogYW55W10pIHsgfVxuXG59XG5cbiJdfQ==