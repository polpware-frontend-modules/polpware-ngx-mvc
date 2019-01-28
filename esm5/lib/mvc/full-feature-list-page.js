/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * @abstract
 */
FullFeatureListPage = /** @class */ (function (_super) {
    tslib_1.__extends(FullFeatureListPage, _super);
    function FullFeatureListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.onDocumentReady = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Cache will be provided in its derived class
        this.ensureDataProvider.apply(this, tslib_1.__spread(args));
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.onDocumentDestroy = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        // Cache will be provided in its derived class
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.turnOffMediator();
        this.afterMediatorOff();
    };
    // May be not needed. 
    // May be not needed. 
    /**
     * @protected
     * @param {?} dataProvider
     * @return {?}
     */
    FullFeatureListPage.prototype.onDataProviderReady = 
    // May be not needed. 
    /**
     * @protected
     * @param {?} dataProvider
     * @return {?}
     */
    function (dataProvider) {
        var _this = this;
        this.buildMediator(dataProvider).then(function () {
            _this.turnOnMediator(false);
            _this.afterMediatorOn();
        });
    };
    // Override
    // Override
    /**
     * @protected
     * @return {?}
     */
    FullFeatureListPage.prototype.buildViewInstance = 
    // Override
    /**
     * @protected
     * @return {?}
     */
    function () {
        return adaptAngularToController({
            $scope: this
        });
    };
    /**
     * @return {?}
     */
    FullFeatureListPage.prototype.doRefresh = /**
     * @return {?}
     */
    function () {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    };
    /**
     * @return {?}
     */
    FullFeatureListPage.prototype.doInfinite = /**
     * @return {?}
     */
    function () {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.showLoadingIndicator = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.hideLoadingIndicator = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    FullFeatureListPage.prototype.setLoadingIndicatorDelay = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) { };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.showMoreLoading = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.hideMoreLoading = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.showRefreshingIndicator = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    FullFeatureListPage.prototype.hideRefreshingIndicator = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return FullFeatureListPage;
}(PlatformObliviousListPage));
/**
 * @abstract
 */
export { FullFeatureListPage };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1mZWF0dXJlLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFDSCx5QkFBeUIsRUFDNUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV4QyxPQUFPLEVBQ0gsd0JBQXdCLEVBQzNCLE1BQU0sMENBQTBDLENBQUM7Ozs7QUFFbEQsb0NBR0M7Ozs7OztJQUZHLCtEQUEyQzs7Ozs7SUFDM0MsaUVBQTZDOzs7OztBQUdqRDs7OztJQUNZLCtDQUF5QjtJQURyQzs7SUFvRUEsQ0FBQzs7Ozs7SUFqRUcsNkNBQWU7Ozs7SUFBZjtRQUFnQixjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUMvQiw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLGtCQUFrQixPQUF2QixJQUFJLG1CQUF1QixJQUFJLEdBQUU7SUFDckMsQ0FBQzs7Ozs7SUFFRCwrQ0FBaUI7Ozs7SUFBakI7UUFFSSw4Q0FBOEM7UUFGaEMsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFJakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFXRCxzQkFBc0I7Ozs7Ozs7SUFDWixpREFBbUI7Ozs7Ozs7SUFBN0IsVUFBOEIsWUFBaUI7UUFBL0MsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXOzs7Ozs7SUFDRCwrQ0FBaUI7Ozs7OztJQUEzQjtRQUNJLE9BQU8sd0JBQXdCLENBQUM7WUFDNUIsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sdUNBQVM7OztJQUFoQjtRQUNJLGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7O0lBRU0sd0NBQVU7OztJQUFqQjtRQUNJLHVCQUF1QjtRQUN2QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7OztJQUVNLGtEQUFvQjs7OztJQUEzQjtRQUE0QixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7Ozs7O0lBRXhDLGtEQUFvQjs7OztJQUEzQjtRQUE0QixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7Ozs7O0lBRXhDLHNEQUF3Qjs7OztJQUEvQixVQUFnQyxPQUFlLElBQUksQ0FBQzs7Ozs7SUFFN0MsNkNBQWU7Ozs7SUFBdEI7UUFBdUIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7SUFBSSxDQUFDOzs7OztJQUVuQyw2Q0FBZTs7OztJQUF0QjtRQUF1QixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7Ozs7O0lBRW5DLHFEQUF1Qjs7OztJQUE5QjtRQUErQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7Ozs7O0lBRTNDLHFEQUF1Qjs7OztJQUE5QjtRQUErQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7SUFFdEQsMEJBQUM7QUFBRCxDQUFDLEFBcEVELENBQ1kseUJBQXlCLEdBbUVwQzs7Ozs7Ozs7Ozs7O0lBcERHLHVFQUFpRTs7Ozs7O0lBQ2pFLGdFQUEyQzs7Ozs7O0lBQzNDLGlFQUE0Qzs7Ozs7OztJQUU1Qyx5RUFBMkU7Ozs7Ozs7O0lBQzNFLGlGQUF5Rjs7Ozs7OztJQUN6RiwyRUFBOEQ7Ozs7Ozs7SUFDOUQsOEVBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVZpZXdJbnN0YW5jZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuaW1wb3J0IHsgSUxpc3RNZWRpYXRvclB1YmxpYyB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1tdmMnO1xuLy8gYmFzZVxuaW1wb3J0IHtcbiAgICBQbGF0Zm9ybU9ibGl2aW91c0xpc3RQYWdlXG59IGZyb20gJy4vcGxhdGZvcm0tb2JsaXZpb3VzLWxpc3QtcGFnZSc7XG5cbmltcG9ydCB7XG4gICAgYWRhcHRBbmd1bGFyVG9Db250cm9sbGVyXG59IGZyb20gJy4vYWRhcHRvcnMvYW5ndWxhci10by1jb250cm9sbGVyLWFkYXB0b3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlTGlmZUN5Y2xlIHtcbiAgICBvbkRvY3VtZW50UmVhZHkoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgb25Eb2N1bWVudERlc3Ryb3koLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdWxsRmVhdHVyZUxpc3RQYWdlXG4gICAgZXh0ZW5kcyBQbGF0Zm9ybU9ibGl2aW91c0xpc3RQYWdlIGltcGxlbWVudHMgSVBhZ2VMaWZlQ3ljbGUge1xuXG4gICAgb25Eb2N1bWVudFJlYWR5KC4uLmFyZ3M6IEFycmF5PGFueT4pIHtcbiAgICAgICAgLy8gQ2FjaGUgd2lsbCBiZSBwcm92aWRlZCBpbiBpdHMgZGVyaXZlZCBjbGFzc1xuICAgICAgICB0aGlzLmVuc3VyZURhdGFQcm92aWRlciguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50RGVzdHJveSguLi5hcmdzOiBBcnJheTxhbnk+KSB7XG5cbiAgICAgICAgLy8gQ2FjaGUgd2lsbCBiZSBwcm92aWRlZCBpbiBpdHMgZGVyaXZlZCBjbGFzc1xuXG4gICAgICAgIHRoaXMudHVybk9mZk1lZGlhdG9yKCk7XG4gICAgICAgIHRoaXMuYWZ0ZXJNZWRpYXRvck9mZigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBlbnN1cmVEYXRhUHJvdmlkZXIoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVyTWVkaWF0b3JPbigpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlck1lZGlhdG9yT2ZmKCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZE1lZGlhdG9yRnJvbUNhY2hlKGtleTogc3RyaW5nKTogSUxpc3RNZWRpYXRvclB1YmxpYztcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd3JpdGVNZWRpYXRvckludG9DYWNoZShrZXk6IHN0cmluZywgdmFsdWU6IElMaXN0TWVkaWF0b3JQdWJsaWMpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZGRPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbW92ZU9uQ2FjaGVFeHBpcmVIYW5kbGVyKGtleTogc3RyaW5nKTogdm9pZDtcblxuICAgIC8vIE1heSBiZSBub3QgbmVlZGVkLiBcbiAgICBwcm90ZWN0ZWQgb25EYXRhUHJvdmlkZXJSZWFkeShkYXRhUHJvdmlkZXI6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1aWxkTWVkaWF0b3IoZGF0YVByb3ZpZGVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHVybk9uTWVkaWF0b3IoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5hZnRlck1lZGlhdG9yT24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgYnVpbGRWaWV3SW5zdGFuY2UoKTogSVZpZXdJbnN0YW5jZSB7XG4gICAgICAgIHJldHVybiBhZGFwdEFuZ3VsYXJUb0NvbnRyb2xsZXIoe1xuICAgICAgICAgICAgJHNjb3BlOiB0aGlzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb1JlZnJlc2goKSB7XG4gICAgICAgIC8vIFRyaWdnZXIgcmVmcmVzaFxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3Mub25SZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5vblJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkb0luZmluaXRlKCkge1xuICAgICAgICAvLyBUcmlnZ2VyIGxvYWRpbmcgbW9yZVxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3Mub25JbmZpbml0ZSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3Mub25JbmZpbml0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dMb2FkaW5nSW5kaWNhdG9yKC4uLmFyZ3M6IGFueVtdKSB7IH1cblxuICAgIHB1YmxpYyBoaWRlTG9hZGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgc2V0TG9hZGluZ0luZGljYXRvckRlbGF5KHNlY29uZHM6IG51bWJlcikgeyB9XG5cbiAgICBwdWJsaWMgc2hvd01vcmVMb2FkaW5nKC4uLmFyZ3M6IGFueVtdKSB7IH1cblxuICAgIHB1YmxpYyBoaWRlTW9yZUxvYWRpbmcoLi4uYXJnczogYW55W10pIHsgfVxuXG4gICAgcHVibGljIHNob3dSZWZyZXNoaW5nSW5kaWNhdG9yKC4uLmFyZ3M6IGFueVtdKSB7IH1cblxuICAgIHB1YmxpYyBoaWRlUmVmcmVzaGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbn1cblxuIl19