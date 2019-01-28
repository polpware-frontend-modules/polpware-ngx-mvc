/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @fileOverview
 * This abstract class defines a base class for implementing
 * a page with such features as refreshing, loading more, and
 * listening to changes from a global database and inserting
 * or deleting elements accordingly.
 *
 * This class does not depend on any features that a specific
 * platform may provide, such as ionViewDidload and ...unload.
 *
 * @name PlatformAgosticFullFeatureListPage.ts
 * @author Xiaolong Tang <xxlongtang@gmail.com>
 * @license Copyright @me
 */
// By default, we do not listen to any change ..
import * as hInterface from '@polpware/fe-dependencies';
/** @type {?} */
const _ = hInterface.underscore;
/**
 * @abstract
 */
export class PlatformObliviousListPage {
    constructor() {
        this.moreDataCanBeLoaded = false;
        this.callbacks = {
            onRefresh: null,
            onInfinite: null
        };
    }
    /**
     * @protected
     * @param {?} fromCache
     * @param {...?} rest
     * @return {?}
     */
    turnOnMediator(fromCache, ...rest) {
        /** @type {?} */
        const viewInstance = this.buildViewInstance();
        this.listMediator.startService(viewInstance, fromCache);
    }
    /**
     * @protected
     * @return {?}
     */
    turnOffMediator() {
        this.listMediator.stopService();
    }
}
if (false) {
    /** @type {?} */
    PlatformObliviousListPage.prototype.moreDataCanBeLoaded;
    /** @type {?} */
    PlatformObliviousListPage.prototype.callbacks;
    /**
     * @type {?}
     * @protected
     */
    PlatformObliviousListPage.prototype.listMediator;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    PlatformObliviousListPage.prototype.buildViewInstance = function () { };
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.buildMediator = function (args) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.showLoadingIndicator = function (args) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.hideLoadingIndicator = function (args) { };
    /**
     * @abstract
     * @param {?} seconds
     * @return {?}
     */
    PlatformObliviousListPage.prototype.setLoadingIndicatorDelay = function (seconds) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.showMoreLoading = function (args) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.hideMoreLoading = function (args) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.showRefreshingIndicator = function (args) { };
    /**
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    PlatformObliviousListPage.prototype.hideRefreshingIndicator = function (args) { };
    /**
     * @abstract
     * @param {?} items
     * @return {?}
     */
    PlatformObliviousListPage.prototype.onNewItemsReady = function (items) { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformObliviousListPage.prototype.onItemsReady = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tb2JsaXZpb3VzLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9wbGF0Zm9ybS1vYmxpdmlvdXMtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsT0FBTyxLQUFLLFVBQVUsTUFBTSwyQkFBMkIsQ0FBQzs7TUFhbEQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVOzs7O0FBRS9CLE1BQU0sT0FBZ0IseUJBQXlCO0lBYzNDO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUNuQixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQU1TLGNBQWMsQ0FBQyxTQUFrQixFQUFFLEdBQUcsSUFBVzs7Y0FDakQsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7SUFFUyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztDQWlCSjs7O0lBNUNHLHdEQUFvQzs7SUFDcEMsOENBR0U7Ozs7O0lBRUYsaURBQTRDOzs7Ozs7SUFVNUMsd0VBQXNEOzs7Ozs7O0lBRXRELHdFQUFvRTs7Ozs7O0lBV3BFLCtFQUFnRTs7Ozs7O0lBQ2hFLCtFQUFnRTs7Ozs7O0lBQ2hFLHNGQUFnRTs7Ozs7O0lBRWhFLDBFQUEyRDs7Ozs7O0lBQzNELDBFQUEyRDs7Ozs7O0lBRTNELGtGQUFtRTs7Ozs7O0lBQ25FLGtGQUFtRTs7Ozs7O0lBSW5FLDJFQUErRDs7Ozs7SUFFL0QsbUVBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBUaGlzIGFic3RyYWN0IGNsYXNzIGRlZmluZXMgYSBiYXNlIGNsYXNzIGZvciBpbXBsZW1lbnRpbmdcbiAqIGEgcGFnZSB3aXRoIHN1Y2ggZmVhdHVyZXMgYXMgcmVmcmVzaGluZywgbG9hZGluZyBtb3JlLCBhbmRcbiAqIGxpc3RlbmluZyB0byBjaGFuZ2VzIGZyb20gYSBnbG9iYWwgZGF0YWJhc2UgYW5kIGluc2VydGluZ1xuICogb3IgZGVsZXRpbmcgZWxlbWVudHMgYWNjb3JkaW5nbHkuXG4gKlxuICogVGhpcyBjbGFzcyBkb2VzIG5vdCBkZXBlbmQgb24gYW55IGZlYXR1cmVzIHRoYXQgYSBzcGVjaWZpY1xuICogcGxhdGZvcm0gbWF5IHByb3ZpZGUsIHN1Y2ggYXMgaW9uVmlld0RpZGxvYWQgYW5kIC4uLnVubG9hZC5cbiAqXG4gKiBAbmFtZSBQbGF0Zm9ybUFnb3N0aWNGdWxsRmVhdHVyZUxpc3RQYWdlLnRzXG4gKiBAYXV0aG9yIFhpYW9sb25nIFRhbmcgPHh4bG9uZ3RhbmdAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IEBtZVxuICovXG5cbi8vIEJ5IGRlZmF1bHQsIHdlIGRvIG5vdCBsaXN0ZW4gdG8gYW55IGNoYW5nZSAuLlxuXG5pbXBvcnQgKiBhcyBoSW50ZXJmYWNlIGZyb20gJ0Bwb2xwd2FyZS9mZS1kZXBlbmRlbmNpZXMnO1xuXG5pbXBvcnQgeyBJVmlld0luc3RhbmNlIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5cbmltcG9ydCB7IElMaXN0TWVkaWF0b3JQdWJsaWMgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcbmltcG9ydCB7IElNZWRpYXRvckNvbXBhdGlibGVQYWdlIH0gZnJvbSAnLi9tZWRpYXRvci1jb21wYXRpYmxlLXBhZ2UuaW50ZXJmYWNlJztcblxuaW1wb3J0IHtcbiAgICBJTG9hZGluZ0luZGljYXRvcixcbiAgICBJUmVmcmVzaGluZ0luZGljYXRvcixcbiAgICBJTG9hZGluZ01vcmVJbmRpY2F0b3Jcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbmRpY2F0b3JzLmludGVyZmFjZSc7XG5cbmNvbnN0IF8gPSBoSW50ZXJmYWNlLnVuZGVyc2NvcmU7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF0Zm9ybU9ibGl2aW91c0xpc3RQYWdlXG4gICAgaW1wbGVtZW50cyBJTWVkaWF0b3JDb21wYXRpYmxlUGFnZSxcbiAgICBJTG9hZGluZ0luZGljYXRvcixcbiAgICBJUmVmcmVzaGluZ0luZGljYXRvcixcbiAgICBJTG9hZGluZ01vcmVJbmRpY2F0b3Ige1xuXG4gICAgcHVibGljIG1vcmVEYXRhQ2FuQmVMb2FkZWQ6IGJvb2xlYW47XG4gICAgcHVibGljIGNhbGxiYWNrczoge1xuICAgICAgICBvblJlZnJlc2g6IGFueSxcbiAgICAgICAgb25JbmZpbml0ZTogYW55XG4gICAgfTtcblxuICAgIHByb3RlY3RlZCBsaXN0TWVkaWF0b3I6IElMaXN0TWVkaWF0b3JQdWJsaWM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb3JlRGF0YUNhbkJlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgICAgICAgb25SZWZyZXNoOiBudWxsLFxuICAgICAgICAgICAgb25JbmZpbml0ZTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBidWlsZFZpZXdJbnN0YW5jZSgpOiBJVmlld0luc3RhbmNlO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGJ1aWxkTWVkaWF0b3IoLi4uYXJnczogYW55W10pOiBQcm9taXNlTGlrZTx2b2lkPjtcblxuICAgIHByb3RlY3RlZCB0dXJuT25NZWRpYXRvcihmcm9tQ2FjaGU6IGJvb2xlYW4sIC4uLnJlc3Q6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHZpZXdJbnN0YW5jZSA9IHRoaXMuYnVpbGRWaWV3SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc3RhcnRTZXJ2aWNlKHZpZXdJbnN0YW5jZSwgZnJvbUNhY2hlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdHVybk9mZk1lZGlhdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3RNZWRpYXRvci5zdG9wU2VydmljZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzaG93TG9hZGluZ0luZGljYXRvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZDtcbiAgICBwdWJsaWMgYWJzdHJhY3QgaGlkZUxvYWRpbmdJbmRpY2F0b3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgcHVibGljIGFic3RyYWN0IHNldExvYWRpbmdJbmRpY2F0b3JEZWxheShzZWNvbmRzOiBudW1iZXIpOiB2b2lkO1xuXG4gICAgcHVibGljIGFic3RyYWN0IHNob3dNb3JlTG9hZGluZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZDtcbiAgICBwdWJsaWMgYWJzdHJhY3QgaGlkZU1vcmVMb2FkaW5nKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuXG4gICAgcHVibGljIGFic3RyYWN0IHNob3dSZWZyZXNoaW5nSW5kaWNhdG9yKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBoaWRlUmVmcmVzaGluZ0luZGljYXRvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZDtcblxuICAgIC8vIFdpbGwgYmUgaW52b2tlZCBmcm9tIHRoZSBhZGFwdG9yIGFuZCB0aGVyZWZvcmVcbiAgICAvLyBtdXN0IGJlIHB1YmxpY1xuICAgIHB1YmxpYyBhYnN0cmFjdCBvbk5ld0l0ZW1zUmVhZHkoaXRlbXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+O1xuXG4gICAgcHVibGljIGFic3RyYWN0IG9uSXRlbXNSZWFkeSgpOiB2b2lkO1xufVxuXG4iXX0=