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
var _ = hInterface.underscore;
/**
 * @abstract
 */
var /**
 * @abstract
 */
PlatformObliviousListPage = /** @class */ (function () {
    function PlatformObliviousListPage() {
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
    PlatformObliviousListPage.prototype.turnOnMediator = /**
     * @protected
     * @param {?} fromCache
     * @param {...?} rest
     * @return {?}
     */
    function (fromCache) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var viewInstance = this.buildViewInstance();
        this.listMediator.startService(viewInstance, fromCache);
    };
    /**
     * @protected
     * @return {?}
     */
    PlatformObliviousListPage.prototype.turnOffMediator = /**
     * @protected
     * @return {?}
     */
    function () {
        this.listMediator.stopService();
    };
    return PlatformObliviousListPage;
}());
/**
 * @abstract
 */
export { PlatformObliviousListPage };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tb2JsaXZpb3VzLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9wbGF0Zm9ybS1vYmxpdmlvdXMtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsT0FBTyxLQUFLLFVBQVUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFhbEQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVOzs7O0FBRS9COzs7O0lBY0k7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUM7SUFDTixDQUFDOzs7Ozs7O0lBTVMsa0RBQWM7Ozs7OztJQUF4QixVQUF5QixTQUFrQjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7OztZQUNqRCxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7OztJQUVTLG1EQUFlOzs7O0lBQXpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBaUJMLGdDQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQzs7Ozs7OztJQTVDRyx3REFBb0M7O0lBQ3BDLDhDQUdFOzs7OztJQUVGLGlEQUE0Qzs7Ozs7O0lBVTVDLHdFQUFzRDs7Ozs7OztJQUV0RCx3RUFBb0U7Ozs7OztJQVdwRSwrRUFBZ0U7Ozs7OztJQUNoRSwrRUFBZ0U7Ozs7OztJQUNoRSxzRkFBZ0U7Ozs7OztJQUVoRSwwRUFBMkQ7Ozs7OztJQUMzRCwwRUFBMkQ7Ozs7OztJQUUzRCxrRkFBbUU7Ozs7OztJQUNuRSxrRkFBbUU7Ozs7OztJQUluRSwyRUFBK0Q7Ozs7O0lBRS9ELG1FQUFxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBkZWZpbmVzIGEgYmFzZSBjbGFzcyBmb3IgaW1wbGVtZW50aW5nXG4gKiBhIHBhZ2Ugd2l0aCBzdWNoIGZlYXR1cmVzIGFzIHJlZnJlc2hpbmcsIGxvYWRpbmcgbW9yZSwgYW5kXG4gKiBsaXN0ZW5pbmcgdG8gY2hhbmdlcyBmcm9tIGEgZ2xvYmFsIGRhdGFiYXNlIGFuZCBpbnNlcnRpbmdcbiAqIG9yIGRlbGV0aW5nIGVsZW1lbnRzIGFjY29yZGluZ2x5LlxuICpcbiAqIFRoaXMgY2xhc3MgZG9lcyBub3QgZGVwZW5kIG9uIGFueSBmZWF0dXJlcyB0aGF0IGEgc3BlY2lmaWNcbiAqIHBsYXRmb3JtIG1heSBwcm92aWRlLCBzdWNoIGFzIGlvblZpZXdEaWRsb2FkIGFuZCAuLi51bmxvYWQuXG4gKlxuICogQG5hbWUgUGxhdGZvcm1BZ29zdGljRnVsbEZlYXR1cmVMaXN0UGFnZS50c1xuICogQGF1dGhvciBYaWFvbG9uZyBUYW5nIDx4eGxvbmd0YW5nQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIENvcHlyaWdodCBAbWVcbiAqL1xuXG4vLyBCeSBkZWZhdWx0LCB3ZSBkbyBub3QgbGlzdGVuIHRvIGFueSBjaGFuZ2UgLi5cblxuaW1wb3J0ICogYXMgaEludGVyZmFjZSBmcm9tICdAcG9scHdhcmUvZmUtZGVwZW5kZW5jaWVzJztcblxuaW1wb3J0IHsgSVZpZXdJbnN0YW5jZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuXG5pbXBvcnQgeyBJTGlzdE1lZGlhdG9yUHVibGljIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLW12Yyc7XG5pbXBvcnQgeyBJTWVkaWF0b3JDb21wYXRpYmxlUGFnZSB9IGZyb20gJy4vbWVkaWF0b3ItY29tcGF0aWJsZS1wYWdlLmludGVyZmFjZSc7XG5cbmltcG9ydCB7XG4gICAgSUxvYWRpbmdJbmRpY2F0b3IsXG4gICAgSVJlZnJlc2hpbmdJbmRpY2F0b3IsXG4gICAgSUxvYWRpbmdNb3JlSW5kaWNhdG9yXG59IGZyb20gJy4uL2ludGVyZmFjZXMvaW5kaWNhdG9ycy5pbnRlcmZhY2UnO1xuXG5jb25zdCBfID0gaEludGVyZmFjZS51bmRlcnNjb3JlO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxhdGZvcm1PYmxpdmlvdXNMaXN0UGFnZVxuICAgIGltcGxlbWVudHMgSU1lZGlhdG9yQ29tcGF0aWJsZVBhZ2UsXG4gICAgSUxvYWRpbmdJbmRpY2F0b3IsXG4gICAgSVJlZnJlc2hpbmdJbmRpY2F0b3IsXG4gICAgSUxvYWRpbmdNb3JlSW5kaWNhdG9yIHtcblxuICAgIHB1YmxpYyBtb3JlRGF0YUNhbkJlTG9hZGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBjYWxsYmFja3M6IHtcbiAgICAgICAgb25SZWZyZXNoOiBhbnksXG4gICAgICAgIG9uSW5maW5pdGU6IGFueVxuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgbGlzdE1lZGlhdG9yOiBJTGlzdE1lZGlhdG9yUHVibGljO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubW9yZURhdGFDYW5CZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgICAgICAgIG9uUmVmcmVzaDogbnVsbCxcbiAgICAgICAgICAgIG9uSW5maW5pdGU6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYnVpbGRWaWV3SW5zdGFuY2UoKTogSVZpZXdJbnN0YW5jZTtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBidWlsZE1lZGlhdG9yKC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZUxpa2U8dm9pZD47XG5cbiAgICBwcm90ZWN0ZWQgdHVybk9uTWVkaWF0b3IoZnJvbUNhY2hlOiBib29sZWFuLCAuLi5yZXN0OiBhbnlbXSkge1xuICAgICAgICBjb25zdCB2aWV3SW5zdGFuY2UgPSB0aGlzLmJ1aWxkVmlld0luc3RhbmNlKCk7XG4gICAgICAgIHRoaXMubGlzdE1lZGlhdG9yLnN0YXJ0U2VydmljZSh2aWV3SW5zdGFuY2UsIGZyb21DYWNoZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHR1cm5PZmZNZWRpYXRvcigpIHtcbiAgICAgICAgdGhpcy5saXN0TWVkaWF0b3Iuc3RvcFNlcnZpY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2hvd0xvYWRpbmdJbmRpY2F0b3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgcHVibGljIGFic3RyYWN0IGhpZGVMb2FkaW5nSW5kaWNhdG9yKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXRMb2FkaW5nSW5kaWNhdG9yRGVsYXkoc2Vjb25kczogbnVtYmVyKTogdm9pZDtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzaG93TW9yZUxvYWRpbmcoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgcHVibGljIGFic3RyYWN0IGhpZGVNb3JlTG9hZGluZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZDtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzaG93UmVmcmVzaGluZ0luZGljYXRvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZDtcbiAgICBwdWJsaWMgYWJzdHJhY3QgaGlkZVJlZnJlc2hpbmdJbmRpY2F0b3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG5cbiAgICAvLyBXaWxsIGJlIGludm9rZWQgZnJvbSB0aGUgYWRhcHRvciBhbmQgdGhlcmVmb3JlXG4gICAgLy8gbXVzdCBiZSBwdWJsaWNcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25OZXdJdGVtc1JlYWR5KGl0ZW1zOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PjtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkl0ZW1zUmVhZHkoKTogdm9pZDtcbn1cblxuIl19