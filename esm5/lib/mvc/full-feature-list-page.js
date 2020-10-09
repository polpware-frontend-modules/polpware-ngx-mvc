import { __extends, __read, __spread } from "tslib";
// base
import { PlatformObliviousListPage } from './platform-oblivious-list-page';
import { adaptAngularToController } from './adaptors/angular-to-controller-adaptor';
var FullFeatureListPage = /** @class */ (function (_super) {
    __extends(FullFeatureListPage, _super);
    function FullFeatureListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullFeatureListPage.prototype.onDocumentReady = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Cache will be provided in its derived class
        this.ensureDataProvider.apply(this, __spread(args));
    };
    FullFeatureListPage.prototype.onDocumentDestroy = function () {
        // Cache will be provided in its derived class
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.turnOffMediator();
        this.afterMediatorOff();
    };
    // May be not needed. 
    FullFeatureListPage.prototype.onDataProviderReady = function (dataProvider) {
        var _this = this;
        this.buildMediator(dataProvider).then(function () {
            _this.turnOnMediator(false);
            _this.afterMediatorOn();
        });
    };
    // Override
    FullFeatureListPage.prototype.buildViewInstance = function () {
        return adaptAngularToController({
            $scope: this
        });
    };
    FullFeatureListPage.prototype.doRefresh = function () {
        // Trigger refresh
        if (this.callbacks.onRefresh) {
            this.callbacks.onRefresh();
        }
    };
    FullFeatureListPage.prototype.doInfinite = function () {
        // Trigger loading more
        if (this.callbacks.onInfinite) {
            this.callbacks.onInfinite();
        }
    };
    FullFeatureListPage.prototype.showLoadingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideLoadingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.setLoadingIndicatorDelay = function (seconds) { };
    FullFeatureListPage.prototype.showMoreLoading = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideMoreLoading = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.showRefreshingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FullFeatureListPage.prototype.hideRefreshingIndicator = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return FullFeatureListPage;
}(PlatformObliviousListPage));
export { FullFeatureListPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1mZWF0dXJlLWxpc3QtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtbXZjLyIsInNvdXJjZXMiOlsibGliL212Yy9mdWxsLWZlYXR1cmUtbGlzdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPO0FBQ1AsT0FBTyxFQUNILHlCQUF5QixFQUM1QixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFDSCx3QkFBd0IsRUFDM0IsTUFBTSwwQ0FBMEMsQ0FBQztBQU9sRDtJQUNZLHVDQUF5QjtJQURyQzs7SUFvRUEsQ0FBQztJQWpFRyw2Q0FBZSxHQUFmO1FBQWdCLGNBQW1CO2FBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtZQUFuQix5QkFBbUI7O1FBQy9CLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsa0JBQWtCLE9BQXZCLElBQUksV0FBdUIsSUFBSSxHQUFFO0lBQ3JDLENBQUM7SUFFRCwrQ0FBaUIsR0FBakI7UUFFSSw4Q0FBOEM7UUFGaEMsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFJakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFXRCxzQkFBc0I7SUFDWixpREFBbUIsR0FBN0IsVUFBOEIsWUFBaUI7UUFBL0MsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO0lBQ0QsK0NBQWlCLEdBQTNCO1FBQ0ksT0FBTyx3QkFBd0IsQ0FBQztZQUM1QixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1Q0FBUyxHQUFoQjtRQUNJLGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRU0sd0NBQVUsR0FBakI7UUFDSSx1QkFBdUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVNLGtEQUFvQixHQUEzQjtRQUE0QixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7SUFFeEMsa0RBQW9CLEdBQTNCO1FBQTRCLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O0lBQUksQ0FBQztJQUV4QyxzREFBd0IsR0FBL0IsVUFBZ0MsT0FBZSxJQUFJLENBQUM7SUFFN0MsNkNBQWUsR0FBdEI7UUFBdUIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7SUFBSSxDQUFDO0lBRW5DLDZDQUFlLEdBQXRCO1FBQXVCLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O0lBQUksQ0FBQztJQUVuQyxxREFBdUIsR0FBOUI7UUFBK0IsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7SUFBSSxDQUFDO0lBRTNDLHFEQUF1QixHQUE5QjtRQUErQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztJQUFJLENBQUM7SUFFdEQsMEJBQUM7QUFBRCxDQUFDLEFBcEVELENBQ1kseUJBQXlCLEdBbUVwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWaWV3SW5zdGFuY2UgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcbmltcG9ydCB7IElMaXN0TWVkaWF0b3JQdWJsaWMgfSBmcm9tICdAcG9scHdhcmUvZmUtbXZjJztcbi8vIGJhc2VcbmltcG9ydCB7XG4gICAgUGxhdGZvcm1PYmxpdmlvdXNMaXN0UGFnZVxufSBmcm9tICcuL3BsYXRmb3JtLW9ibGl2aW91cy1saXN0LXBhZ2UnO1xuXG5pbXBvcnQge1xuICAgIGFkYXB0QW5ndWxhclRvQ29udHJvbGxlclxufSBmcm9tICcuL2FkYXB0b3JzL2FuZ3VsYXItdG8tY29udHJvbGxlci1hZGFwdG9yJztcblxuZXhwb3J0IGludGVyZmFjZSBJUGFnZUxpZmVDeWNsZSB7XG4gICAgb25Eb2N1bWVudFJlYWR5KC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIG9uRG9jdW1lbnREZXN0cm95KC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVsbEZlYXR1cmVMaXN0UGFnZVxuICAgIGV4dGVuZHMgUGxhdGZvcm1PYmxpdmlvdXNMaXN0UGFnZSBpbXBsZW1lbnRzIElQYWdlTGlmZUN5Y2xlIHtcblxuICAgIG9uRG9jdW1lbnRSZWFkeSguLi5hcmdzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIC8vIENhY2hlIHdpbGwgYmUgcHJvdmlkZWQgaW4gaXRzIGRlcml2ZWQgY2xhc3NcbiAgICAgICAgdGhpcy5lbnN1cmVEYXRhUHJvdmlkZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudERlc3Ryb3koLi4uYXJnczogQXJyYXk8YW55Pikge1xuXG4gICAgICAgIC8vIENhY2hlIHdpbGwgYmUgcHJvdmlkZWQgaW4gaXRzIGRlcml2ZWQgY2xhc3NcblxuICAgICAgICB0aGlzLnR1cm5PZmZNZWRpYXRvcigpO1xuICAgICAgICB0aGlzLmFmdGVyTWVkaWF0b3JPZmYoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZW5zdXJlRGF0YVByb3ZpZGVyKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlck1lZGlhdG9yT24oKTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJNZWRpYXRvck9mZigpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRNZWRpYXRvckZyb21DYWNoZShrZXk6IHN0cmluZyk6IElMaXN0TWVkaWF0b3JQdWJsaWM7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHdyaXRlTWVkaWF0b3JJbnRvQ2FjaGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBJTGlzdE1lZGlhdG9yUHVibGljKTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWRkT25DYWNoZUV4cGlyZUhhbmRsZXIoa2V5OiBzdHJpbmcpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW1vdmVPbkNhY2hlRXhwaXJlSGFuZGxlcihrZXk6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICAvLyBNYXkgYmUgbm90IG5lZWRlZC4gXG4gICAgcHJvdGVjdGVkIG9uRGF0YVByb3ZpZGVyUmVhZHkoZGF0YVByb3ZpZGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idWlsZE1lZGlhdG9yKGRhdGFQcm92aWRlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cm5Pbk1lZGlhdG9yKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJNZWRpYXRvck9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmlld0luc3RhbmNlKCk6IElWaWV3SW5zdGFuY2Uge1xuICAgICAgICByZXR1cm4gYWRhcHRBbmd1bGFyVG9Db250cm9sbGVyKHtcbiAgICAgICAgICAgICRzY29wZTogdGhpc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9SZWZyZXNoKCkge1xuICAgICAgICAvLyBUcmlnZ2VyIHJlZnJlc2hcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uUmVmcmVzaCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3Mub25SZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZG9JbmZpbml0ZSgpIHtcbiAgICAgICAgLy8gVHJpZ2dlciBsb2FkaW5nIG1vcmVcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uSW5maW5pdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLm9uSW5maW5pdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93TG9hZGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZUxvYWRpbmdJbmRpY2F0b3IoLi4uYXJnczogYW55W10pIHsgfVxuXG4gICAgcHVibGljIHNldExvYWRpbmdJbmRpY2F0b3JEZWxheShzZWNvbmRzOiBudW1iZXIpIHsgfVxuXG4gICAgcHVibGljIHNob3dNb3JlTG9hZGluZyguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZU1vcmVMb2FkaW5nKC4uLmFyZ3M6IGFueVtdKSB7IH1cblxuICAgIHB1YmxpYyBzaG93UmVmcmVzaGluZ0luZGljYXRvciguLi5hcmdzOiBhbnlbXSkgeyB9XG5cbiAgICBwdWJsaWMgaGlkZVJlZnJlc2hpbmdJbmRpY2F0b3IoLi4uYXJnczogYW55W10pIHsgfVxuXG59XG5cbiJdfQ==