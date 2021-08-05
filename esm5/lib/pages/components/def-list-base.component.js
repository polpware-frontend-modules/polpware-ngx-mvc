import { __extends } from "tslib";
import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefListBaseController } from '../controllers/def-list-base.controller';
import * as i0 from "@angular/core";
var _c0 = ["searchControlElem"];
var DefListBaseComponent = /** @class */ (function (_super) {
    __extends(DefListBaseComponent, _super);
    function DefListBaseComponent(listSettings, _spinner, _toastr) {
        var _this = _super.call(this, listSettings) || this;
        _this._spinner = _spinner;
        _this._toastr = _toastr;
        _this.bottomOffset = 0;
        _this.minHeight = 0;
        _this.fixedHeight = 0;
        _this.maxHeight = 0;
        _this.topOffset = 0;
        _this.containerClass = '';
        _this.initHighlightId = '';
        _this.onSelect = new EventEmitter();
        // By default, search is enabled
        _this.searchEnabled = true;
        _this.searchControl = new FormControl('');
        return _this;
    }
    Object.defineProperty(DefListBaseComponent.prototype, "totalCount", {
        // Compute the total number of records from the underlying mediator
        // and further the data provider of the mediator.
        get: function () {
            return this.asDefListBaseMediator.dataProvider().state.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseComponent.prototype, "offset", {
        // As above, compute the loaded number of records so far.
        get: function () {
            return this.asDefListBaseMediator.dataProvider().state.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefListBaseComponent.prototype, "spinnerName", {
        get: function () {
            return this._listSettings.spinnerName;
        },
        enumerable: true,
        configurable: true
    });
    DefListBaseComponent.prototype.ngOnInit = function () {
        this._spinner.startToListenSpinner(this.spinnerName);
        this.onDocumentReady();
        this.startObserveSearchKeyword();
    };
    DefListBaseComponent.prototype.ngOnDestroy = function () {
        this._spinner.stopListener(this.spinnerName);
        this.onDocumentDestroy();
        this.stopObserveSearchKeyword();
    };
    ////////////////////////////////////////////////////////////////////////////////
    // Overrides to tweak the behaviors of the loading/unloading logic
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * Following building a mediator or retrieving a mediator from cache,
     * this method turns on the mediator to trigger network request.
     *
     * @param fromCache
     * @param keyword The parameters from the second one are passed all the way from the
     * onDocumentReady method.
     */
    DefListBaseComponent.prototype.turnOnMediator = function (fromCache, keyword) {
        _super.prototype.turnOnMediator.call(this, fromCache, keyword);
        // TODO: Check if we need the following logic?
        // if (this.searchEnabled) {
        //     // Synchronizing the UI and the internal state
        //     const keyword = this.asDefListBaseMediator.keyword();
        //     if (keyword) {
        //         keyword = keyword.toLowerCase();
        //         this.searchControl.setValue(keyword, {
        //             emitEvent: false
        //         });
        //     }
        // }
    };
    ////////////////////////////////////////////////////////////////////////////////
    // Indicators
    ////////////////////////////////////////////////////////////////////////////////
    // Override
    DefListBaseComponent.prototype.showLoadingIndicator = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    DefListBaseComponent.prototype.hideLoadingIndicator = function () {
        this._spinner.hide(this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.showMoreLoading = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.hideMoreLoading = function () {
        this._spinner.hide(this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.showRefreshingIndicator = function () {
        this._spinner.show('Loading ...', this.spinnerName);
    };
    // Override
    DefListBaseComponent.prototype.hideRefreshingIndicator = function () {
        this._spinner.hide(this.spinnerName);
        // Release a message 
        this._toastr.success("List was just refreshed.", 'Success', {
            closeButton: true
        });
    };
    ////////////////////////////////////////////////////////////////////////////////
    // Search state machine
    ////////////////////////////////////////////////////////////////////////////////
    // Start to listen for search keyword change
    DefListBaseComponent.prototype.startObserveSearchKeyword = function () {
        var _this = this;
        this._searchKeywordSubr = this.searchControl.valueChanges.subscribe(function (a) {
            a = (a || '').toLowerCase();
            if (a && a !== _this.keywordInEffect) {
                _this.anyFutureKeyword = a;
            }
            else {
                _this.anyFutureKeyword = '';
            }
        });
    };
    DefListBaseComponent.prototype.stopObserveSearchKeyword = function () {
        this._searchKeywordSubr && this._searchKeywordSubr.unsubscribe();
    };
    // Recomputes the search state
    //
    // 
    DefListBaseComponent.prototype.computeSearchState = function () {
        this.anyFutureKeyword = '';
        this.keywordInEffectState = false;
        this.typeKeywordState = false;
        this.waitForInputState = false;
        var keyword = this.asDefListBaseMediator.keyword();
        if (keyword) {
            keyword = keyword.toLowerCase();
            this.keywordInEffect = keyword;
            this.keywordInEffectState = true;
            // Make sure that the search input has the latest value
            var rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs !== keyword) {
                this.searchControl.setValue(keyword, {
                    emitEvent: false
                });
            }
        }
        else {
            this.waitForInputState = true;
            // Make sure that the search input has the latest value
            var rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs) {
                this.searchControl.setValue('', {
                    emitEvent: false
                });
            }
        }
    };
    // Swtiches to the state for providing
    // the search input control for end users.
    // 
    DefListBaseComponent.prototype.startToTypeKeyword = function () {
        this.anyFutureKeyword = '';
        this.waitForInputState = false;
        this.keywordInEffectState = false;
        this.typeKeywordState = true;
        // Schedule focus behavior in next round of UI updating,
        // in order that the above settings are already in effect.
        setTimeout(function () {
            // TODO: Fix this
            // this.focusFolderSearchInput();
        });
    };
    // Cancel typed keyword and
    // reset to whatever the previous state
    //
    // This operation does not cause new network request.
    DefListBaseComponent.prototype.cancelTypedKeyword = function () {
        this.computeSearchState();
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    };
    // Clear up keyword
    //
    // This operation causes new network request.
    DefListBaseComponent.prototype.clearKeywordInEffect = function () {
        this.asDefListBaseMediator.keyword('');
        this.asDefListBaseMediator.refresh(true);
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    };
    // Starts a new round of search
    //
    // This operation causes new network request.
    DefListBaseComponent.prototype.kickOffSearch = function () {
        var k = this.searchControl.value;
        // TODO: Normalize into lowercase ?
        var currentKeyword = this.asDefListBaseMediator.keyword;
        if (k === currentKeyword) {
            // Nothing to do;
            this.computeSearchState();
            return;
        }
        // Otherwise, move forward to search 
        this.asDefListBaseMediator.keyword(k);
        this.asDefListBaseMediator.refresh(true);
    };
    // Override
    //
    // The extra operation allows for synchronizing the internal state
    // with the user interface.
    DefListBaseComponent.prototype.onItemsReady = function () {
        _super.prototype.onItemsReady.call(this);
        this.computeSearchState();
        if (this.initHighlightId) {
            this.highlight(this.initHighlightId);
        }
    };
    /**
      * Sends a notification back to its parent or client.
      * @param item A data entity.
      */
    DefListBaseComponent.prototype.selectItem = function (item) {
        this.initHighlightId = null;
        this.selected = item;
        this.onSelect.emit(item);
    };
    /**
     * Allows the client to highlight an item by Id.
     * @param id
     */
    DefListBaseComponent.prototype.highlight = function (id) {
        var item = this.items.find(function (a) { return a.id == id; });
        if (item && this.selected !== item) {
            this.selected = item;
        }
    };
    /** @nocollapse */ DefListBaseComponent.ɵfac = function DefListBaseComponent_Factory(t) { i0.ɵɵinvalidFactory(); };
    /** @nocollapse */ DefListBaseComponent.ɵdir = i0.ɵɵdefineDirective({ type: DefListBaseComponent, viewQuery: function DefListBaseComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchControlElem = _t.first);
        } }, inputs: { bottomOffset: "bottomOffset", minHeight: "minHeight", fixedHeight: "fixedHeight", maxHeight: "maxHeight", topOffset: "topOffset", containerClass: "containerClass", initHighlightId: "initHighlightId" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵInheritDefinitionFeature] });
    return DefListBaseComponent;
}(DefListBaseController));
export { DefListBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW12Yy8iLCJzb3VyY2VzIjpbImxpYi9wYWdlcy9jb21wb25lbnRzL2RlZi1saXN0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQyxNQUFNLHlDQUF5QyxDQUFDOzs7QUFhaEg7SUFBOEUsd0NBQXdCO0lBcUVsRyw4QkFBWSxZQUEyQyxFQUNoQyxRQUFzQixFQUN0QixPQUFpQjtRQUZ4QyxZQUdJLGtCQUFNLFlBQVksQ0FBQyxTQUl0QjtRQU5zQixjQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3RCLGFBQU8sR0FBUCxPQUFPLENBQVU7UUFyRS9CLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLHFCQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTVCLGNBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBK0RwQyxnQ0FBZ0M7UUFDaEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7SUFDN0MsQ0FBQztJQUlELHNCQUFJLDRDQUFVO1FBRmQsbUVBQW1FO1FBQ25FLGlEQUFpRDthQUNqRDtZQUNJLE9BQU8sSUFBSSxDQUFDLHFC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Q0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0NBQVMsR0FBVCxVQUFVLEVBQVU7UUFDaEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7O2dGQXZVaUIsb0JBQW9COzs7Ozs7K0JBbEIxQztDQTJWQyxBQXpVRCxDQUE4RSxxQkFBcUIsR0F5VWxHO1NBelVxQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSUNvbGxlY3Rpb25JdGVtIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xyXG5pbXBvcnQgeyBJTmd4Tm90eSB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtbm90eSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEZWZMaXN0QmFzZUNvbnRyb2xsZXIsIElEZWZMaXN0QmFzZUNvbnRyb2xsZXJTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2RlZi1saXN0LWJhc2UuY29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZWZMaXN0QmFzZUNvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgSURlZkxpc3RCYXNlQ29udHJvbGxlclNldHRpbmdzIHtcclxuICAgIHNwaW5uZXJOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNwaW5uZXJMaWtlIHtcclxuICAgIHNob3coLi4uYXJnczogYW55W10pO1xyXG4gICAgaGlkZSguLi5hcmdzOiBhbnlbXSk7XHJcbiAgICBzdGFydFRvTGlzdGVuU3Bpbm5lciguLi5hcmdzOiBhbnlbXSk7XHJcbiAgICBzdG9wTGlzdGVuZXIoLi4uYXJnczogYW55W10pO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmTGlzdEJhc2VDb21wb25lbnQ8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT4gZXh0ZW5kcyBEZWZMaXN0QmFzZUNvbnRyb2xsZXI8VD4ge1xyXG5cclxuICAgIEBJbnB1dCgpIGJvdHRvbU9mZnNldCA9IDA7XHJcbiAgICBASW5wdXQoKSBtaW5IZWlnaHQgPSAwO1xyXG4gICAgQElucHV0KCkgZml4ZWRIZWlnaHQgPSAwO1xyXG4gICAgQElucHV0KCkgbWF4SGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIHRvcE9mZnNldCA9IDA7XHJcbiAgICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xyXG4gICAgQElucHV0KCkgaW5pdEhpZ2hsaWdodElkOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoQ29udHJvbEVsZW0nKVxyXG4gICAgc2VhcmNoQ29udHJvbEVsZW06IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIERlZmluZXMgdGhlIHN0YXRlcyBmb3IgdGhlIHNlYXJjaCBzdGF0ZSBtYWNoaW5lXHJcbiAgICAvLyAgIHdhaXRGb3JJbnB1dCAtLT4gdHlwZUtleXdvcmRTdGF0ZVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIFxyXG4gICAgcHVibGljIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAvLyBcclxuICAgIC8vIFRoaXMgZmxhZyBEZWNpZGVzIGlmIHdlIGNhbiBkaXNwbGF5IGEgY29udHJvbFxyXG4gICAgLy8gd2hpY2ggZnVydGhlciBkZWNpZGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzZWFyY2ggaW5wdXQgY29udHJvbC5cclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIGZsYWcgaXMgdXNlZCB3aGVuIHdlIGhhdmUgYW5vdGhlciBsZXZlbCBvZlxyXG4gICAgLy8gY29udHJvbGxpbmcgd2hldGhlciB0aGUgc2VhcmNoIGlucHV0IHNob3VsZCBiZSB2aXNpYmxlIG9yIG5vdC5cclxuICAgIC8vIEUuZy4sIFdoZW4gdGhlIHNwYWNlIGlzIGxpbWl0ZWQsIHdlIG1heSBkaXNwbGF5IGEgY29udHJvbCBmbGFnXHJcbiAgICAvLyB0byB0dXJuIG9uIHRoZSB2aXNpYmxpdHkgb2YgdGhlIHJlYWwgc2VhcmNoIGlucHV0LCBhbmRcclxuICAgIC8vIGJ5IGRlZmF1bHQgb25seSBzaG93cyB0aGUgY29udHJvbCBmbGFnLlxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMgd2FpdEZvcklucHV0U3RhdGU6IGJvb2xlYW47XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGRlY2lkZXMgaWYgdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sIHNob3VsZCBiZSB2aXNpYmxlXHJcbiAgICAvLyBvciBub3QuIFxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMgdHlwZUtleXdvcmRTdGF0ZTogYm9vbGVhbjtcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIHByb3BlcnR5IHRyYWNrcyB0aGUgY3VycmVudCBlZmZlY3RpdmUga2V5d29yZC4gXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBrZXl3b3JkSW5FZmZlY3Q6IHN0cmluZztcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIGZsYWcgZGVjaWRlcyBpZiBhbnkga2V5d29yZCBpcyBpbiBlZmZjdGl2ZS5cclxuICAgIC8vXHJcbiAgICAvLyBJdCBpcyB1c2VkIHdoZW4gZ2VuZXJhdGluZyB0aGUgc3RhdGUgb2YgdGhlIHNlYXJjaCByZXN1bHQuXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBrZXl3b3JkSW5FZmZlY3RTdGF0ZTogYm9vbGVhbjtcclxuICAgIC8vIFNlYXJjaCBjb250cm9sIGlucHV0XHJcbiAgICBwdWJsaWMgc2VhcmNoQ29udHJvbDogRm9ybUNvbnRyb2w7XHJcblxyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgcHJvcGVydHkgdHJhY2tzIGlmIHRoZXJlIGlzIGFueSBrZXl3b3JkIFxyXG4gICAgLy8gd2hpY2ggbWF5IGJlIGFwcGxpZWQgaW4gdGhlIGZ1dHVyZS5cclxuICAgIC8vIEUuZy4sIHRob3VnaCB0aGVyZSBpcyBhIGtleXdvcmQgaW4gZWZmZWN0LFxyXG4gICAgLy8gYSB1c2VyIG1heSBlbnRlciBuZXcga2V5d29yZCBpbiB0aGUgc2VhcmNoIGlucHV0IGNvbnRyb2xcclxuICAgIC8vIGFuZCB0aGUgbmV3IHZhbHVlIGlzIG5vdCBlcXVhbCB0byB0aGUgY3VycmVudCBlZmZlY3RpdmVcclxuICAgIC8vIGtleXdvcmQuIEluIHRoaXMgY2FzZSwgYW55RnV0dXJlS2V5d29yZCB0ZWxscyB0aGUgbmV3IHZhbHVlLiBcclxuICAgIHB1YmxpYyBhbnlGdXR1cmVLZXl3b3JkOiBzdHJpbmc7XHJcblxyXG4gICAgLy9cclxuICAgIC8vIFRyYWNrcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0uXHJcbiAgICAvLyBXZSBkZWNpZGUgbm90IHRvIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIGl0ZW0uXHJcbiAgICAvLyBJbnN0ZWFkLCBlYWNoIGNvbnRyb2xsZXIgbWF5IGhhdmUgaXRzIG93biBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gRG9pbmcgc28sIHRoZXJlIGlzIG5vIGludGVyZmVyZW5jZSBhbW9uZyBkaWZmZXJlbnQgY29udHJvbGxlcnMsXHJcbiAgICAvLyBldmVuIHRob3VnaCB0aGV5IHNoYXJlIHRoZSBzYW1lIHVuZGVybHlpbmcgZGF0YS4gXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQ6IFQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VhcmNoS2V5d29yZFN1YnI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsaXN0U2V0dGluZ3M6IElEZWZMaXN0QmFzZUNvbXBvbmVudFNldHRpbmdzLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBfc3Bpbm5lcjogSVNwaW5uZXJMaWtlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBfdG9hc3RyOiBJTmd4Tm90eSkge1xyXG4gICAgICAgIHN1cGVyKGxpc3RTZXR0aW5ncyk7XHJcbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgc2VhcmNoIGlzIGVuYWJsZWRcclxuICAgICAgICB0aGlzLnNlYXJjaEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcHV0ZSB0aGUgdG90YWwgbnVtYmVyIG9mIHJlY29yZHMgZnJvbSB0aGUgdW5kZXJseWluZyBtZWRpYXRvclxyXG4gICAgLy8gYW5kIGZ1cnRoZXIgdGhlIGRhdGEgcHJvdmlkZXIgb2YgdGhlIG1lZGlhdG9yLlxyXG4gICAgZ2V0IHRvdGFsQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmRhdGFQcm92aWRlcigpLnN0YXRlLnRvdGFsUmVjb3JkcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBBcyBhYm92ZSwgY29tcHV0ZSB0aGUgbG9hZGVkIG51bWJlciBvZiByZWNvcmRzIHNvIGZhci5cclxuICAgIGdldCBvZmZzZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmRhdGFQcm92aWRlcigpLnN0YXRlLnRvdGFsUmVjb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3Bpbm5lck5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9saXN0U2V0dGluZ3MgYXMgSURlZkxpc3RCYXNlQ29tcG9uZW50U2V0dGluZ3MpLnNwaW5uZXJOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc3RhcnRUb0xpc3RlblNwaW5uZXIodGhpcy5zcGlubmVyTmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMub25Eb2N1bWVudFJlYWR5KCk7XHJcbiAgICAgICAgdGhpcy5zdGFydE9ic2VydmVTZWFyY2hLZXl3b3JkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5zdG9wTGlzdGVuZXIodGhpcy5zcGlubmVyTmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMub25Eb2N1bWVudERlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLnN0b3BPYnNlcnZlU2VhcmNoS2V5d29yZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBPdmVycmlkZXMgdG8gdHdlYWsgdGhlIGJlaGF2aW9ycyBvZiB0aGUgbG9hZGluZy91bmxvYWRpbmcgbG9naWNcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9sbG93aW5nIGJ1aWxkaW5nIGEgbWVkaWF0b3Igb3IgcmV0cmlldmluZyBhIG1lZGlhdG9yIGZyb20gY2FjaGUsIFxyXG4gICAgICogdGhpcyBtZXRob2QgdHVybnMgb24gdGhlIG1lZGlhdG9yIHRvIHRyaWdnZXIgbmV0d29yayByZXF1ZXN0LiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGZyb21DYWNoZVxyXG4gICAgICogQHBhcmFtIGtleXdvcmQgVGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgc2Vjb25kIG9uZSBhcmUgcGFzc2VkIGFsbCB0aGUgd2F5IGZyb20gdGhlIFxyXG4gICAgICogb25Eb2N1bWVudFJlYWR5IG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHR1cm5Pbk1lZGlhdG9yKGZyb21DYWNoZTogYm9vbGVhbiwga2V5d29yZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIudHVybk9uTWVkaWF0b3IoZnJvbUNhY2hlLCBrZXl3b3JkKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgd2UgbmVlZCB0aGUgZm9sbG93aW5nIGxvZ2ljP1xyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5zZWFyY2hFbmFibGVkKSB7XHJcbiAgICAgICAgLy8gICAgIC8vIFN5bmNocm9uaXppbmcgdGhlIFVJIGFuZCB0aGUgaW50ZXJuYWwgc3RhdGVcclxuICAgICAgICAvLyAgICAgY29uc3Qga2V5d29yZCA9IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQoKTtcclxuICAgICAgICAvLyAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGtleXdvcmQgPSBrZXl3b3JkLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wuc2V0VmFsdWUoa2V5d29yZCwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBJbmRpY2F0b3JzXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgc2hvd0xvYWRpbmdJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5zaG93KCdMb2FkaW5nIC4uLicsIHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlTG9hZGluZ0luZGljYXRvcigpIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLmhpZGUodGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBzaG93TW9yZUxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5zaG93KCdMb2FkaW5nIC4uLicsIHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgaGlkZU1vcmVMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuaGlkZSh0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIHNob3dSZWZyZXNoaW5nSW5kaWNhdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc2hvdygnTG9hZGluZyAuLi4nLCB0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIGhpZGVSZWZyZXNoaW5nSW5kaWNhdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuaGlkZSh0aGlzLnNwaW5uZXJOYW1lKVxyXG4gICAgICAgIC8vIFJlbGVhc2UgYSBtZXNzYWdlIFxyXG4gICAgICAgIHRoaXMuX3RvYXN0ci5zdWNjZXNzKGBMaXN0IHdhcyBqdXN0IHJlZnJlc2hlZC5gLFxyXG4gICAgICAgICAgICAnU3VjY2VzcycsIHtcclxuICAgICAgICAgICAgY2xvc2VCdXR0b246IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIFNlYXJjaCBzdGF0ZSBtYWNoaW5lXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8vIFN0YXJ0IHRvIGxpc3RlbiBmb3Igc2VhcmNoIGtleXdvcmQgY2hhbmdlXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnRPYnNlcnZlU2VhcmNoS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLl9zZWFyY2hLZXl3b3JkU3ViciA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGEgPT4ge1xyXG4gICAgICAgICAgICBhID0gKGEgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChhICYmIGEgIT09IHRoaXMua2V5d29yZEluRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFueUZ1dHVyZUtleXdvcmQgPSBhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RvcE9ic2VydmVTZWFyY2hLZXl3b3JkKCkge1xyXG4gICAgICAgIHRoaXMuX3NlYXJjaEtleXdvcmRTdWJyICYmIHRoaXMuX3NlYXJjaEtleXdvcmRTdWJyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVjb21wdXRlcyB0aGUgc2VhcmNoIHN0YXRlXHJcbiAgICAvL1xyXG4gICAgLy8gXHJcbiAgICBwcm90ZWN0ZWQgY29tcHV0ZVNlYXJjaFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuYW55RnV0dXJlS2V5d29yZCA9ICcnO1xyXG4gICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnR5cGVLZXl3b3JkU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndhaXRGb3JJbnB1dFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGtleXdvcmQgPSB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKCk7XHJcblxyXG4gICAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIGtleXdvcmQgPSBrZXl3b3JkLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0ID0ga2V5d29yZDtcclxuICAgICAgICAgICAgdGhpcy5rZXl3b3JkSW5FZmZlY3RTdGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgc2VhcmNoIGlucHV0IGhhcyB0aGUgbGF0ZXN0IHZhbHVlXHJcbiAgICAgICAgICAgIGxldCByaHMgPSB0aGlzLnNlYXJjaENvbnRyb2wudmFsdWUgfHwgJyc7XHJcbiAgICAgICAgICAgIHJocyA9IHJocy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAocmhzICE9PSBrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wuc2V0VmFsdWUoa2V5d29yZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdEZvcklucHV0U3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHNlYXJjaCBpbnB1dCBoYXMgdGhlIGxhdGVzdCB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgcmhzID0gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlIHx8ICcnO1xyXG4gICAgICAgICAgICByaHMgPSByaHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKHJocykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKCcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFN3dGljaGVzIHRvIHRoZSBzdGF0ZSBmb3IgcHJvdmlkaW5nXHJcbiAgICAvLyB0aGUgc2VhcmNoIGlucHV0IGNvbnRyb2wgZm9yIGVuZCB1c2Vycy5cclxuICAgIC8vIFxyXG4gICAgcHVibGljIHN0YXJ0VG9UeXBlS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLmFueUZ1dHVyZUtleXdvcmQgPSAnJztcclxuICAgICAgICB0aGlzLndhaXRGb3JJbnB1dFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5rZXl3b3JkSW5FZmZlY3RTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHlwZUtleXdvcmRTdGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFNjaGVkdWxlIGZvY3VzIGJlaGF2aW9yIGluIG5leHQgcm91bmQgb2YgVUkgdXBkYXRpbmcsXHJcbiAgICAgICAgLy8gaW4gb3JkZXIgdGhhdCB0aGUgYWJvdmUgc2V0dGluZ3MgYXJlIGFscmVhZHkgaW4gZWZmZWN0LlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBGaXggdGhpc1xyXG4gICAgICAgICAgICAvLyB0aGlzLmZvY3VzRm9sZGVyU2VhcmNoSW5wdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYW5jZWwgdHlwZWQga2V5d29yZCBhbmRcclxuICAgIC8vIHJlc2V0IHRvIHdoYXRldmVyIHRoZSBwcmV2aW91cyBzdGF0ZVxyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgb3BlcmF0aW9uIGRvZXMgbm90IGNhdXNlIG5ldyBuZXR3b3JrIHJlcXVlc3QuXHJcbiAgICBwdWJsaWMgY2FuY2VsVHlwZWRLZXl3b3JkKCkge1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZVNlYXJjaFN0YXRlKCk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gZm9jdXMgdGhlIHNlYXJjaCBpbnB1dFxyXG4gICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbEVsZW0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsZWFyIHVwIGtleXdvcmRcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIG9wZXJhdGlvbiBjYXVzZXMgbmV3IG5ldHdvcmsgcmVxdWVzdC5cclxuICAgIHB1YmxpYyBjbGVhcktleXdvcmRJbkVmZmVjdCgpIHtcclxuICAgICAgICB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKCcnKTtcclxuICAgICAgICB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5yZWZyZXNoKHRydWUpO1xyXG5cclxuICAgICAgICAvLyBBdXRvIGZvY3VzIHRoZSBzZWFyY2ggaW5wdXRcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2xFbGVtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGFydHMgYSBuZXcgcm91bmQgb2Ygc2VhcmNoXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBvcGVyYXRpb24gY2F1c2VzIG5ldyBuZXR3b3JrIHJlcXVlc3QuXHJcbiAgICBwdWJsaWMga2lja09mZlNlYXJjaCgpIHtcclxuICAgICAgICBjb25zdCBrID0gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlO1xyXG4gICAgICAgIC8vIFRPRE86IE5vcm1hbGl6ZSBpbnRvIGxvd2VyY2FzZSA/XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRLZXl3b3JkID0gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZDtcclxuICAgICAgICBpZiAoayA9PT0gY3VycmVudEtleXdvcmQpIHtcclxuICAgICAgICAgICAgLy8gTm90aGluZyB0byBkbztcclxuICAgICAgICAgICAgdGhpcy5jb21wdXRlU2VhcmNoU3RhdGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBtb3ZlIGZvcndhcmQgdG8gc2VhcmNoIFxyXG4gICAgICAgIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQoayk7XHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IucmVmcmVzaCh0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIC8vXHJcbiAgICAvLyBUaGUgZXh0cmEgb3BlcmF0aW9uIGFsbG93cyBmb3Igc3luY2hyb25pemluZyB0aGUgaW50ZXJuYWwgc3RhdGVcclxuICAgIC8vIHdpdGggdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAgcHVibGljIG9uSXRlbXNSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkl0ZW1zUmVhZHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wdXRlU2VhcmNoU3RhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdEhpZ2hsaWdodElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuaW5pdEhpZ2hsaWdodElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogU2VuZHMgYSBub3RpZmljYXRpb24gYmFjayB0byBpdHMgcGFyZW50IG9yIGNsaWVudC5cclxuICAgICAgKiBAcGFyYW0gaXRlbSBBIGRhdGEgZW50aXR5LlxyXG4gICAgICAqL1xyXG4gICAgc2VsZWN0SXRlbShpdGVtOiBUKSB7XHJcbiAgICAgICAgdGhpcy5pbml0SGlnaGxpZ2h0SWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB0aGUgY2xpZW50IHRvIGhpZ2hsaWdodCBhbiBpdGVtIGJ5IElkLlxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKi9cclxuICAgIGhpZ2hsaWdodChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZChhID0+IGEuaWQgPT0gaWQpO1xyXG4gICAgICAgIGlmIChpdGVtICYmIHRoaXMuc2VsZWN0ZWQgIT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=