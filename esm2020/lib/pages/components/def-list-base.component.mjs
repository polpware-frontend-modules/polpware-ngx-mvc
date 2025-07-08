import { EventEmitter, Input, Output, ViewChild, Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DefListBaseController } from '../controllers/def-list-base.controller';
import * as i0 from "@angular/core";
const _c0 = ["searchControlElem"];
export class DefListBaseComponent extends DefListBaseController {
    constructor(listSettings, _spinner, _toastr) {
        super(listSettings);
        this._spinner = _spinner;
        this._toastr = _toastr;
        this.bottomOffset = 0;
        this.minHeight = 0;
        this.fixedHeight = 0;
        this.maxHeight = 0;
        this.topOffset = 0;
        this.containerClass = '';
        this.initHighlightId = '';
        this.onSelect = new EventEmitter();
        // By default, search is enabled
        this.searchEnabled = true;
        this.searchControl = new UntypedFormControl('');
    }
    // Compute the total number of records from the underlying mediator
    // and further the data provider of the mediator.
    get totalCount() {
        return this.asDefListBaseMediator.dataProvider().state.totalRecords;
    }
    // As above, compute the loaded number of records so far.
    get offset() {
        return this.asDefListBaseMediator.dataProvider().state.totalRecords;
    }
    get spinnerName() {
        return this._listSettings.spinnerName;
    }
    ngOnInit() {
        this._spinner.startToListenSpinner(this.spinnerName);
        this.onDocumentReady();
        this.startObserveSearchKeyword();
    }
    ngOnDestroy() {
        this._spinner.stopListener(this.spinnerName);
        this.onDocumentDestroy();
        this.stopObserveSearchKeyword();
    }
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
    turnOnMediator(fromCache, keyword) {
        super.turnOnMediator(fromCache, keyword);
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
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Indicators
    ////////////////////////////////////////////////////////////////////////////////
    // Override
    showLoadingIndicator() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    hideLoadingIndicator() {
        this._spinner.hide(this.spinnerName);
    }
    // Override
    showMoreLoading() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    // Override
    hideMoreLoading() {
        this._spinner.hide(this.spinnerName);
    }
    // Override
    showRefreshingIndicator() {
        this._spinner.show('Loading ...', this.spinnerName);
    }
    // Override
    hideRefreshingIndicator() {
        this._spinner.hide(this.spinnerName);
        // Release a message 
        this._toastr.success(`List was just refreshed.`, 'Success', {
            closeButton: true
        });
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Search state machine
    ////////////////////////////////////////////////////////////////////////////////
    // Start to listen for search keyword change
    startObserveSearchKeyword() {
        this._searchKeywordSubr = this.searchControl.valueChanges.subscribe(a => {
            a = (a || '').toLowerCase();
            if (a && a !== this.keywordInEffect) {
                this.anyFutureKeyword = a;
            }
            else {
                this.anyFutureKeyword = '';
            }
        });
    }
    stopObserveSearchKeyword() {
        this._searchKeywordSubr && this._searchKeywordSubr.unsubscribe();
    }
    // Recomputes the search state
    //
    // 
    computeSearchState() {
        this.anyFutureKeyword = '';
        this.keywordInEffectState = false;
        this.typeKeywordState = false;
        this.waitForInputState = false;
        let keyword = this.asDefListBaseMediator.keyword();
        if (keyword) {
            keyword = keyword.toLowerCase();
            this.keywordInEffect = keyword;
            this.keywordInEffectState = true;
            // Make sure that the search input has the latest value
            let rhs = this.searchControl.value || '';
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
            let rhs = this.searchControl.value || '';
            rhs = rhs.toLowerCase();
            if (rhs) {
                this.searchControl.setValue('', {
                    emitEvent: false
                });
            }
        }
    }
    // Swtiches to the state for providing
    // the search input control for end users.
    // 
    startToTypeKeyword() {
        this.anyFutureKeyword = '';
        this.waitForInputState = false;
        this.keywordInEffectState = false;
        this.typeKeywordState = true;
        // Schedule focus behavior in next round of UI updating,
        // in order that the above settings are already in effect.
        setTimeout(() => {
            // TODO: Fix this
            // this.focusFolderSearchInput();
        });
    }
    // Cancel typed keyword and
    // reset to whatever the previous state
    //
    // This operation does not cause new network request.
    cancelTypedKeyword() {
        this.computeSearchState();
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    }
    // Clear up keyword
    //
    // This operation causes new network request.
    clearKeywordInEffect() {
        this.asDefListBaseMediator.keyword('');
        this.asDefListBaseMediator.refresh(true);
        // Auto focus the search input
        this.searchControlElem.nativeElement.focus();
    }
    // Starts a new round of search
    //
    // This operation causes new network request.
    kickOffSearch() {
        const k = this.searchControl.value;
        // TODO: Normalize into lowercase ?
        const currentKeyword = this.asDefListBaseMediator.keyword;
        if (k === currentKeyword) {
            // Nothing to do;
            this.computeSearchState();
            return;
        }
        // Otherwise, move forward to search 
        this.asDefListBaseMediator.keyword(k);
        this.asDefListBaseMediator.refresh(true);
    }
    // Override
    //
    // The extra operation allows for synchronizing the internal state
    // with the user interface.
    onItemsReady() {
        super.onItemsReady();
        this.computeSearchState();
        if (this.initHighlightId) {
            this.highlight(this.initHighlightId);
        }
    }
    /**
      * Sends a notification back to its parent or client.
      * @param item A data entity.
      */
    selectItem(item) {
        this.initHighlightId = null;
        this.selected = item;
        this.onSelect.emit(item);
    }
    /**
     * Allows the client to highlight an item by Id.
     * @param id
     */
    highlight(id) {
        const item = this.items.find(a => a.id == id);
        if (item && this.selected !== item) {
            this.selected = item;
        }
    }
}
/** @nocollapse */ DefListBaseComponent.ɵfac = function DefListBaseComponent_Factory(t) { i0.ɵɵinvalidFactory(); };
/** @nocollapse */ DefListBaseComponent.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: DefListBaseComponent, viewQuery: function DefListBaseComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchControlElem = _t.first);
    } }, inputs: { bottomOffset: "bottomOffset", minHeight: "minHeight", fixedHeight: "fixedHeight", maxHeight: "maxHeight", topOffset: "topOffset", containerClass: "containerClass", initHighlightId: "initHighlightId" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DefListBaseComponent, [{
        type: Directive
    }], function () { return [{ type: undefined }, { type: undefined }, { type: undefined }]; }, { bottomOffset: [{
            type: Input
        }], minHeight: [{
            type: Input
        }], fixedHeight: [{
            type: Input
        }], maxHeight: [{
            type: Input
        }], topOffset: [{
            type: Input
        }], containerClass: [{
            type: Input
        }], initHighlightId: [{
            type: Input
        }], onSelect: [{
            type: Output
        }], searchControlElem: [{
            type: ViewChild,
            args: ['searchControlElem']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wb2xwd2FyZS9uZ3gtbXZjL3NyYy9saWIvcGFnZXMvY29tcG9uZW50cy9kZWYtbGlzdC1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlwRCxPQUFPLEVBQUUscUJBQXFCLEVBQWtDLE1BQU0seUNBQXlDLENBQUM7OztBQWNoSCxNQUFNLE9BQWdCLG9CQUFnRCxTQUFRLHFCQUF3QjtJQXFFbEcsWUFBWSxZQUEyQyxFQUNoQyxRQUFzQixFQUN0QixPQUFpQjtRQUNwQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGRCxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFyRS9CLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBK0RwQyxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxtRUFBbUU7SUFDbkUsaURBQWlEO0lB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LElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7c0dBdlVpQixvQkFBb0I7Ozs7Ozt1RkFBcEIsb0JBQW9CO2NBRHpDLFNBQVM7bUdBR0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0csZUFBZTtrQkFBdkIsS0FBSztZQUVJLFFBQVE7a0JBQWpCLE1BQU07WUFHUCxpQkFBaUI7a0JBRGhCLFNBQVM7bUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IElDb2xsZWN0aW9uSXRlbSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcclxuaW1wb3J0IHsgSU5neE5vdHkgfSBmcm9tICdAcG9scHdhcmUvbmd4LW5vdHknO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGVmTGlzdEJhc2VDb250cm9sbGVyLCBJRGVmTGlzdEJhc2VDb250cm9sbGVyU2V0dGluZ3MgfSBmcm9tICcuLi9jb250cm9sbGVycy9kZWYtbGlzdC1iYXNlLmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIElEZWZMaXN0QmFzZUNvbnRyb2xsZXJTZXR0aW5ncyB7XHJcbiAgICBzcGlubmVyTmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcGlubmVyTGlrZSB7XHJcbiAgICBzaG93KC4uLmFyZ3M6IGFueVtdKTtcclxuICAgIGhpZGUoLi4uYXJnczogYW55W10pO1xyXG4gICAgc3RhcnRUb0xpc3RlblNwaW5uZXIoLi4uYXJnczogYW55W10pO1xyXG4gICAgc3RvcExpc3RlbmVyKC4uLmFyZ3M6IGFueVtdKTtcclxufVxyXG5cclxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmTGlzdEJhc2VDb21wb25lbnQ8VCBleHRlbmRzIElDb2xsZWN0aW9uSXRlbT4gZXh0ZW5kcyBEZWZMaXN0QmFzZUNvbnRyb2xsZXI8VD4ge1xyXG5cclxuICAgIEBJbnB1dCgpIGJvdHRvbU9mZnNldCA9IDA7XHJcbiAgICBASW5wdXQoKSBtaW5IZWlnaHQgPSAwO1xyXG4gICAgQElucHV0KCkgZml4ZWRIZWlnaHQgPSAwO1xyXG4gICAgQElucHV0KCkgbWF4SGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIHRvcE9mZnNldCA9IDA7XHJcbiAgICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xyXG4gICAgQElucHV0KCkgaW5pdEhpZ2hsaWdodElkOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoQ29udHJvbEVsZW0nKVxyXG4gICAgc2VhcmNoQ29udHJvbEVsZW06IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIERlZmluZXMgdGhlIHN0YXRlcyBmb3IgdGhlIHNlYXJjaCBzdGF0ZSBtYWNoaW5lXHJcbiAgICAvLyAgIHdhaXRGb3JJbnB1dCAtLT4gdHlwZUtleXdvcmRTdGF0ZVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIFxyXG4gICAgcHVibGljIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAvLyBcclxuICAgIC8vIFRoaXMgZmxhZyBEZWNpZGVzIGlmIHdlIGNhbiBkaXNwbGF5IGEgY29udHJvbFxyXG4gICAgLy8gd2hpY2ggZnVydGhlciBkZWNpZGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzZWFyY2ggaW5wdXQgY29udHJvbC5cclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIGZsYWcgaXMgdXNlZCB3aGVuIHdlIGhhdmUgYW5vdGhlciBsZXZlbCBvZlxyXG4gICAgLy8gY29udHJvbGxpbmcgd2hldGhlciB0aGUgc2VhcmNoIGlucHV0IHNob3VsZCBiZSB2aXNpYmxlIG9yIG5vdC5cclxuICAgIC8vIEUuZy4sIFdoZW4gdGhlIHNwYWNlIGlzIGxpbWl0ZWQsIHdlIG1heSBkaXNwbGF5IGEgY29udHJvbCBmbGFnXHJcbiAgICAvLyB0byB0dXJuIG9uIHRoZSB2aXNpYmxpdHkgb2YgdGhlIHJlYWwgc2VhcmNoIGlucHV0LCBhbmRcclxuICAgIC8vIGJ5IGRlZmF1bHQgb25seSBzaG93cyB0aGUgY29udHJvbCBmbGFnLlxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMgd2FpdEZvcklucHV0U3RhdGU6IGJvb2xlYW47XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGRlY2lkZXMgaWYgdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sIHNob3VsZCBiZSB2aXNpYmxlXHJcbiAgICAvLyBvciBub3QuIFxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMgdHlwZUtleXdvcmRTdGF0ZTogYm9vbGVhbjtcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIHByb3BlcnR5IHRyYWNrcyB0aGUgY3VycmVudCBlZmZlY3RpdmUga2V5d29yZC4gXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBrZXl3b3JkSW5FZmZlY3Q6IHN0cmluZztcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIGZsYWcgZGVjaWRlcyBpZiBhbnkga2V5d29yZCBpcyBpbiBlZmZjdGl2ZS5cclxuICAgIC8vXHJcbiAgICAvLyBJdCBpcyB1c2VkIHdoZW4gZ2VuZXJhdGluZyB0aGUgc3RhdGUgb2YgdGhlIHNlYXJjaCByZXN1bHQuXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBrZXl3b3JkSW5FZmZlY3RTdGF0ZTogYm9vbGVhbjtcclxuICAgIC8vIFNlYXJjaCBjb250cm9sIGlucHV0XHJcbiAgICBwdWJsaWMgc2VhcmNoQ29udHJvbDogVW50eXBlZEZvcm1Db250cm9sO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIHByb3BlcnR5IHRyYWNrcyBpZiB0aGVyZSBpcyBhbnkga2V5d29yZCBcclxuICAgIC8vIHdoaWNoIG1heSBiZSBhcHBsaWVkIGluIHRoZSBmdXR1cmUuXHJcbiAgICAvLyBFLmcuLCB0aG91Z2ggdGhlcmUgaXMgYSBrZXl3b3JkIGluIGVmZmVjdCxcclxuICAgIC8vIGEgdXNlciBtYXkgZW50ZXIgbmV3IGtleXdvcmQgaW4gdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sXHJcbiAgICAvLyBhbmQgdGhlIG5ldyB2YWx1ZSBpcyBub3QgZXF1YWwgdG8gdGhlIGN1cnJlbnQgZWZmZWN0aXZlXHJcbiAgICAvLyBrZXl3b3JkLiBJbiB0aGlzIGNhc2UsIGFueUZ1dHVyZUtleXdvcmQgdGVsbHMgdGhlIG5ldyB2YWx1ZS4gXHJcbiAgICBwdWJsaWMgYW55RnV0dXJlS2V5d29yZDogc3RyaW5nO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUcmFja3MgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gV2UgZGVjaWRlIG5vdCB0byBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gSW5zdGVhZCwgZWFjaCBjb250cm9sbGVyIG1heSBoYXZlIGl0cyBvd24gc2VsZWN0ZWQgaXRlbS5cclxuICAgIC8vIERvaW5nIHNvLCB0aGVyZSBpcyBubyBpbnRlcmZlcmVuY2UgYW1vbmcgZGlmZmVyZW50IGNvbnRyb2xsZXJzLFxyXG4gICAgLy8gZXZlbiB0aG91Z2ggdGhleSBzaGFyZSB0aGUgc2FtZSB1bmRlcmx5aW5nIGRhdGEuIFxyXG4gICAgcHVibGljIHNlbGVjdGVkOiBUO1xyXG5cclxuICAgIHByaXZhdGUgX3NlYXJjaEtleXdvcmRTdWJyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IobGlzdFNldHRpbmdzOiBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncyxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NwaW5uZXI6IElTcGlubmVyTGlrZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RvYXN0cjogSU5neE5vdHkpIHtcclxuICAgICAgICBzdXBlcihsaXN0U2V0dGluZ3MpO1xyXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHNlYXJjaCBpcyBlbmFibGVkXHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wdXRlIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVjb3JkcyBmcm9tIHRoZSB1bmRlcmx5aW5nIG1lZGlhdG9yXHJcbiAgICAvLyBhbmQgZnVydGhlciB0aGUgZGF0YSBwcm92aWRlciBvZiB0aGUgbWVkaWF0b3IuXHJcbiAgICBnZXQgdG90YWxDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IuZGF0YVByb3ZpZGVyKCkuc3RhdGUudG90YWxSZWNvcmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzIGFib3ZlLCBjb21wdXRlIHRoZSBsb2FkZWQgbnVtYmVyIG9mIHJlY29yZHMgc28gZmFyLlxyXG4gICAgZ2V0IG9mZnNldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IuZGF0YVByb3ZpZGVyKCkuc3RhdGUudG90YWxSZWNvcmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcGlubmVyTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2xpc3RTZXR0aW5ncyBhcyBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncykuc3Bpbm5lck5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5zdGFydFRvTGlzdGVuU3Bpbm5lcih0aGlzLnNwaW5uZXJOYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkRvY3VtZW50UmVhZHkoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0T2JzZXJ2ZVNlYXJjaEtleXdvcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnN0b3BMaXN0ZW5lcih0aGlzLnNwaW5uZXJOYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkRvY3VtZW50RGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuc3RvcE9ic2VydmVTZWFyY2hLZXl3b3JkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIE92ZXJyaWRlcyB0byB0d2VhayB0aGUgYmVoYXZpb3JzIG9mIHRoZSBsb2FkaW5nL3VubG9hZGluZyBsb2dpY1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb2xsb3dpbmcgYnVpbGRpbmcgYSBtZWRpYXRvciBvciByZXRyaWV2aW5nIGEgbWVkaWF0b3IgZnJvbSBjYWNoZSwgXHJcbiAgICAgKiB0aGlzIG1ldGhvZCB0dXJucyBvbiB0aGUgbWVkaWF0b3IgdG8gdHJpZ2dlciBuZXR3b3JrIHJlcXVlc3QuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZnJvbUNhY2hlXHJcbiAgICAgKiBAcGFyYW0ga2V5d29yZCBUaGUgcGFyYW1ldGVycyBmcm9tIHRoZSBzZWNvbmQgb25lIGFyZSBwYXNzZWQgYWxsIHRoZSB3YXkgZnJvbSB0aGUgXHJcbiAgICAgKiBvbkRvY3VtZW50UmVhZHkgbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdHVybk9uTWVkaWF0b3IoZnJvbUNhY2hlOiBib29sZWFuLCBrZXl3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci50dXJuT25NZWRpYXRvcihmcm9tQ2FjaGUsIGtleXdvcmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBDaGVjayBpZiB3ZSBuZWVkIHRoZSBmb2xsb3dpbmcgbG9naWM/XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLnNlYXJjaEVuYWJsZWQpIHtcclxuICAgICAgICAvLyAgICAgLy8gU3luY2hyb25pemluZyB0aGUgVUkgYW5kIHRoZSBpbnRlcm5hbCBzdGF0ZVxyXG4gICAgICAgIC8vICAgICBjb25zdCBrZXl3b3JkID0gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZCgpO1xyXG4gICAgICAgIC8vICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgIC8vICAgICAgICAga2V5d29yZCA9IGtleXdvcmQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbC5zZXRWYWx1ZShrZXl3b3JkLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIEluZGljYXRvcnNcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBzaG93TG9hZGluZ0luZGljYXRvcigpIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnNob3coJ0xvYWRpbmcgLi4uJywgdGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVMb2FkaW5nSW5kaWNhdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuaGlkZSh0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIHNob3dNb3JlTG9hZGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnNob3coJ0xvYWRpbmcgLi4uJywgdGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBoaWRlTW9yZUxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5oaWRlKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgc2hvd1JlZnJlc2hpbmdJbmRpY2F0b3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5zaG93KCdMb2FkaW5nIC4uLicsIHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgaGlkZVJlZnJlc2hpbmdJbmRpY2F0b3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5oaWRlKHRoaXMuc3Bpbm5lck5hbWUpXHJcbiAgICAgICAgLy8gUmVsZWFzZSBhIG1lc3NhZ2UgXHJcbiAgICAgICAgdGhpcy5fdG9hc3RyLnN1Y2Nlc3MoYExpc3Qgd2FzIGp1c3QgcmVmcmVzaGVkLmAsXHJcbiAgICAgICAgICAgICdTdWNjZXNzJywge1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gU2VhcmNoIHN0YXRlIG1hY2hpbmVcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLy8gU3RhcnQgdG8gbGlzdGVuIGZvciBzZWFyY2gga2V5d29yZCBjaGFuZ2VcclxuICAgIHByb3RlY3RlZCBzdGFydE9ic2VydmVTZWFyY2hLZXl3b3JkKCkge1xyXG4gICAgICAgIHRoaXMuX3NlYXJjaEtleXdvcmRTdWJyID0gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoYSA9PiB7XHJcbiAgICAgICAgICAgIGEgPSAoYSB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKGEgJiYgYSAhPT0gdGhpcy5rZXl3b3JkSW5FZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW55RnV0dXJlS2V5d29yZCA9IGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFueUZ1dHVyZUtleXdvcmQgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdG9wT2JzZXJ2ZVNlYXJjaEtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2VhcmNoS2V5d29yZFN1YnIgJiYgdGhpcy5fc2VhcmNoS2V5d29yZFN1YnIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZWNvbXB1dGVzIHRoZSBzZWFyY2ggc3RhdGVcclxuICAgIC8vXHJcbiAgICAvLyBcclxuICAgIHByb3RlY3RlZCBjb21wdXRlU2VhcmNoU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gJyc7XHJcbiAgICAgICAgdGhpcy5rZXl3b3JkSW5FZmZlY3RTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHlwZUtleXdvcmRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2FpdEZvcklucHV0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQga2V5d29yZCA9IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQoKTtcclxuXHJcbiAgICAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICAgICAga2V5d29yZCA9IGtleXdvcmQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5rZXl3b3JkSW5FZmZlY3QgPSBrZXl3b3JkO1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdFN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBzZWFyY2ggaW5wdXQgaGFzIHRoZSBsYXRlc3QgdmFsdWVcclxuICAgICAgICAgICAgbGV0IHJocyA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZSB8fCAnJztcclxuICAgICAgICAgICAgcmhzID0gcmhzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChyaHMgIT09IGtleXdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbC5zZXRWYWx1ZShrZXl3b3JkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0Rm9ySW5wdXRTdGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgc2VhcmNoIGlucHV0IGhhcyB0aGUgbGF0ZXN0IHZhbHVlXHJcbiAgICAgICAgICAgIGxldCByaHMgPSB0aGlzLnNlYXJjaENvbnRyb2wudmFsdWUgfHwgJyc7XHJcbiAgICAgICAgICAgIHJocyA9IHJocy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAocmhzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wuc2V0VmFsdWUoJycsIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3d0aWNoZXMgdG8gdGhlIHN0YXRlIGZvciBwcm92aWRpbmdcclxuICAgIC8vIHRoZSBzZWFyY2ggaW5wdXQgY29udHJvbCBmb3IgZW5kIHVzZXJzLlxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMgc3RhcnRUb1R5cGVLZXl3b3JkKCkge1xyXG4gICAgICAgIHRoaXMuYW55RnV0dXJlS2V5d29yZCA9ICcnO1xyXG4gICAgICAgIHRoaXMud2FpdEZvcklucHV0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50eXBlS2V5d29yZFN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gU2NoZWR1bGUgZm9jdXMgYmVoYXZpb3IgaW4gbmV4dCByb3VuZCBvZiBVSSB1cGRhdGluZyxcclxuICAgICAgICAvLyBpbiBvcmRlciB0aGF0IHRoZSBhYm92ZSBzZXR0aW5ncyBhcmUgYWxyZWFkeSBpbiBlZmZlY3QuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEZpeCB0aGlzXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZm9jdXNGb2xkZXJTZWFyY2hJbnB1dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbmNlbCB0eXBlZCBrZXl3b3JkIGFuZFxyXG4gICAgLy8gcmVzZXQgdG8gd2hhdGV2ZXIgdGhlIHByZXZpb3VzIHN0YXRlXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBvcGVyYXRpb24gZG9lcyBub3QgY2F1c2UgbmV3IG5ldHdvcmsgcmVxdWVzdC5cclxuICAgIHB1YmxpYyBjYW5jZWxUeXBlZEtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlU2VhcmNoU3RhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gQXV0byBmb2N1cyB0aGUgc2VhcmNoIGlucHV0XHJcbiAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sRWxlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xlYXIgdXAga2V5d29yZFxyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgb3BlcmF0aW9uIGNhdXNlcyBuZXcgbmV0d29yayByZXF1ZXN0LlxyXG4gICAgcHVibGljIGNsZWFyS2V5d29yZEluRWZmZWN0KCkge1xyXG4gICAgICAgIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQoJycpO1xyXG4gICAgICAgIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLnJlZnJlc2godHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gZm9jdXMgdGhlIHNlYXJjaCBpbnB1dFxyXG4gICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbEVsZW0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXJ0cyBhIG5ldyByb3VuZCBvZiBzZWFyY2hcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIG9wZXJhdGlvbiBjYXVzZXMgbmV3IG5ldHdvcmsgcmVxdWVzdC5cclxuICAgIHB1YmxpYyBraWNrT2ZmU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLnNlYXJjaENvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgLy8gVE9ETzogTm9ybWFsaXplIGludG8gbG93ZXJjYXNlID9cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudEtleXdvcmQgPSB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkO1xyXG4gICAgICAgIGlmIChrID09PSBjdXJyZW50S2V5d29yZCkge1xyXG4gICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGRvO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVTZWFyY2hTdGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPdGhlcndpc2UsIG1vdmUgZm9yd2FyZCB0byBzZWFyY2ggXHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZChrKTtcclxuICAgICAgICB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5yZWZyZXNoKHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgLy9cclxuICAgIC8vIFRoZSBleHRyYSBvcGVyYXRpb24gYWxsb3dzIGZvciBzeW5jaHJvbml6aW5nIHRoZSBpbnRlcm5hbCBzdGF0ZVxyXG4gICAgLy8gd2l0aCB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICBwdWJsaWMgb25JdGVtc1JlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uSXRlbXNSZWFkeSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXB1dGVTZWFyY2hTdGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pbml0SGlnaGxpZ2h0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQodGhpcy5pbml0SGlnaGxpZ2h0SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBTZW5kcyBhIG5vdGlmaWNhdGlvbiBiYWNrIHRvIGl0cyBwYXJlbnQgb3IgY2xpZW50LlxyXG4gICAgICAqIEBwYXJhbSBpdGVtIEEgZGF0YSBlbnRpdHkuXHJcbiAgICAgICovXHJcbiAgICBzZWxlY3RJdGVtKGl0ZW06IFQpIHtcclxuICAgICAgICB0aGlzLmluaXRIaWdobGlnaHRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHRoZSBjbGllbnQgdG8gaGlnaGxpZ2h0IGFuIGl0ZW0gYnkgSWQuXHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqL1xyXG4gICAgaGlnaGxpZ2h0KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtcy5maW5kKGEgPT4gYS5pZCA9PSBpZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgdGhpcy5zZWxlY3RlZCAhPT0gaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==