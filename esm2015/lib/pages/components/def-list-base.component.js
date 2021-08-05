import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
        this.searchControl = new FormControl('');
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
/** @nocollapse */ DefListBaseComponent.ɵdir = i0.ɵɵdefineDirective({ type: DefListBaseComponent, viewQuery: function DefListBaseComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchControlElem = _t.first);
    } }, inputs: { bottomOffset: "bottomOffset", minHeight: "minHeight", fixedHeight: "fixedHeight", maxHeight: "maxHeight", topOffset: "topOffset", containerClass: "containerClass", initHighlightId: "initHighlightId" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵInheritDefinitionFeature] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW12Yy8iLCJzb3VyY2VzIjpbImxpYi9wYWdlcy9jb21wb25lbnRzL2RlZi1saXN0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEVBQUUscUJBQXFCLEVBQWtDLE1BQU0seUNBQXlDLENBQUM7OztBQWFoSCxNQUFNLE9BQWdCLG9CQUFnRCxTQUFRLHFCQUF3QjtJQXFFbEcsWUFBWSxZQUEyQyxFQUNoQyxRQUFzQixFQUN0QixPQUFpQjtRQUNwQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGRCxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFyRS9CLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBK0RwQyxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLGlEQUFpRDtJQUNqRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FB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QUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7OzRFQXZVaUIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IElDb2xsZWN0aW9uSXRlbSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcclxuaW1wb3J0IHsgSU5neE5vdHkgfSBmcm9tICdAcG9scHdhcmUvbmd4LW5vdHknO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGVmTGlzdEJhc2VDb250cm9sbGVyLCBJRGVmTGlzdEJhc2VDb250cm9sbGVyU2V0dGluZ3MgfSBmcm9tICcuLi9jb250cm9sbGVycy9kZWYtbGlzdC1iYXNlLmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIElEZWZMaXN0QmFzZUNvbnRyb2xsZXJTZXR0aW5ncyB7XHJcbiAgICBzcGlubmVyTmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcGlubmVyTGlrZSB7XHJcbiAgICBzaG93KC4uLmFyZ3M6IGFueVtdKTtcclxuICAgIGhpZGUoLi4uYXJnczogYW55W10pO1xyXG4gICAgc3RhcnRUb0xpc3RlblNwaW5uZXIoLi4uYXJnczogYW55W10pO1xyXG4gICAgc3RvcExpc3RlbmVyKC4uLmFyZ3M6IGFueVtdKTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZkxpc3RCYXNlQ29tcG9uZW50PFQgZXh0ZW5kcyBJQ29sbGVjdGlvbkl0ZW0+IGV4dGVuZHMgRGVmTGlzdEJhc2VDb250cm9sbGVyPFQ+IHtcclxuXHJcbiAgICBASW5wdXQoKSBib3R0b21PZmZzZXQgPSAwO1xyXG4gICAgQElucHV0KCkgbWluSGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIGZpeGVkSGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodCA9IDA7XHJcbiAgICBASW5wdXQoKSB0b3BPZmZzZXQgPSAwO1xyXG4gICAgQElucHV0KCkgY29udGFpbmVyQ2xhc3MgPSAnJztcclxuICAgIEBJbnB1dCgpIGluaXRIaWdobGlnaHRJZDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaENvbnRyb2xFbGVtJylcclxuICAgIHNlYXJjaENvbnRyb2xFbGVtOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBzdGF0ZXMgZm9yIHRoZSBzZWFyY2ggc3RhdGUgbWFjaGluZVxyXG4gICAgLy8gICB3YWl0Rm9ySW5wdXQgLS0+IHR5cGVLZXl3b3JkU3RhdGVcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBzZWFyY2hFbmFibGVkOiBib29sZWFuO1xyXG4gICAgLy8gXHJcbiAgICAvLyBUaGlzIGZsYWcgRGVjaWRlcyBpZiB3ZSBjYW4gZGlzcGxheSBhIGNvbnRyb2xcclxuICAgIC8vIHdoaWNoIGZ1cnRoZXIgZGVjaWRlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2VhcmNoIGlucHV0IGNvbnRyb2wuXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGlzIHVzZWQgd2hlbiB3ZSBoYXZlIGFub3RoZXIgbGV2ZWwgb2ZcclxuICAgIC8vIGNvbnRyb2xsaW5nIHdoZXRoZXIgdGhlIHNlYXJjaCBpbnB1dCBzaG91bGQgYmUgdmlzaWJsZSBvciBub3QuXHJcbiAgICAvLyBFLmcuLCBXaGVuIHRoZSBzcGFjZSBpcyBsaW1pdGVkLCB3ZSBtYXkgZGlzcGxheSBhIGNvbnRyb2wgZmxhZ1xyXG4gICAgLy8gdG8gdHVybiBvbiB0aGUgdmlzaWJsaXR5IG9mIHRoZSByZWFsIHNlYXJjaCBpbnB1dCwgYW5kXHJcbiAgICAvLyBieSBkZWZhdWx0IG9ubHkgc2hvd3MgdGhlIGNvbnRyb2wgZmxhZy5cclxuICAgIC8vIFxyXG4gICAgcHVibGljIHdhaXRGb3JJbnB1dFN0YXRlOiBib29sZWFuO1xyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgZmxhZyBkZWNpZGVzIGlmIHRoZSBzZWFyY2ggaW5wdXQgY29udHJvbCBzaG91bGQgYmUgdmlzaWJsZVxyXG4gICAgLy8gb3Igbm90LiBcclxuICAgIC8vIFxyXG4gICAgcHVibGljIHR5cGVLZXl3b3JkU3RhdGU6IGJvb2xlYW47XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBwcm9wZXJ0eSB0cmFja3MgdGhlIGN1cnJlbnQgZWZmZWN0aXZlIGtleXdvcmQuIFxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMga2V5d29yZEluRWZmZWN0OiBzdHJpbmc7XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGRlY2lkZXMgaWYgYW55IGtleXdvcmQgaXMgaW4gZWZmY3RpdmUuXHJcbiAgICAvL1xyXG4gICAgLy8gSXQgaXMgdXNlZCB3aGVuIGdlbmVyYXRpbmcgdGhlIHN0YXRlIG9mIHRoZSBzZWFyY2ggcmVzdWx0LlxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMga2V5d29yZEluRWZmZWN0U3RhdGU6IGJvb2xlYW47XHJcbiAgICAvLyBTZWFyY2ggY29udHJvbCBpbnB1dFxyXG4gICAgcHVibGljIHNlYXJjaENvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIHByb3BlcnR5IHRyYWNrcyBpZiB0aGVyZSBpcyBhbnkga2V5d29yZCBcclxuICAgIC8vIHdoaWNoIG1heSBiZSBhcHBsaWVkIGluIHRoZSBmdXR1cmUuXHJcbiAgICAvLyBFLmcuLCB0aG91Z2ggdGhlcmUgaXMgYSBrZXl3b3JkIGluIGVmZmVjdCxcclxuICAgIC8vIGEgdXNlciBtYXkgZW50ZXIgbmV3IGtleXdvcmQgaW4gdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sXHJcbiAgICAvLyBhbmQgdGhlIG5ldyB2YWx1ZSBpcyBub3QgZXF1YWwgdG8gdGhlIGN1cnJlbnQgZWZmZWN0aXZlXHJcbiAgICAvLyBrZXl3b3JkLiBJbiB0aGlzIGNhc2UsIGFueUZ1dHVyZUtleXdvcmQgdGVsbHMgdGhlIG5ldyB2YWx1ZS4gXHJcbiAgICBwdWJsaWMgYW55RnV0dXJlS2V5d29yZDogc3RyaW5nO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUcmFja3MgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gV2UgZGVjaWRlIG5vdCB0byBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gSW5zdGVhZCwgZWFjaCBjb250cm9sbGVyIG1heSBoYXZlIGl0cyBvd24gc2VsZWN0ZWQgaXRlbS5cclxuICAgIC8vIERvaW5nIHNvLCB0aGVyZSBpcyBubyBpbnRlcmZlcmVuY2UgYW1vbmcgZGlmZmVyZW50IGNvbnRyb2xsZXJzLFxyXG4gICAgLy8gZXZlbiB0aG91Z2ggdGhleSBzaGFyZSB0aGUgc2FtZSB1bmRlcmx5aW5nIGRhdGEuIFxyXG4gICAgcHVibGljIHNlbGVjdGVkOiBUO1xyXG5cclxuICAgIHByaXZhdGUgX3NlYXJjaEtleXdvcmRTdWJyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IobGlzdFNldHRpbmdzOiBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncyxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NwaW5uZXI6IElTcGlubmVyTGlrZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RvYXN0cjogSU5neE5vdHkpIHtcclxuICAgICAgICBzdXBlcihsaXN0U2V0dGluZ3MpO1xyXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHNlYXJjaCBpcyBlbmFibGVkXHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbXB1dGUgdGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzIGZyb20gdGhlIHVuZGVybHlpbmcgbWVkaWF0b3JcclxuICAgIC8vIGFuZCBmdXJ0aGVyIHRoZSBkYXRhIHByb3ZpZGVyIG9mIHRoZSBtZWRpYXRvci5cclxuICAgIGdldCB0b3RhbENvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5kYXRhUHJvdmlkZXIoKS5zdGF0ZS50b3RhbFJlY29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXMgYWJvdmUsIGNvbXB1dGUgdGhlIGxvYWRlZCBudW1iZXIgb2YgcmVjb3JkcyBzbyBmYXIuXHJcbiAgICBnZXQgb2Zmc2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5kYXRhUHJvdmlkZXIoKS5zdGF0ZS50b3RhbFJlY29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNwaW5uZXJOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fbGlzdFNldHRpbmdzIGFzIElEZWZMaXN0QmFzZUNvbXBvbmVudFNldHRpbmdzKS5zcGlubmVyTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnN0YXJ0VG9MaXN0ZW5TcGlubmVyKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRG9jdW1lbnRSZWFkeSgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRPYnNlcnZlU2VhcmNoS2V5d29yZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc3RvcExpc3RlbmVyKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRG9jdW1lbnREZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5zdG9wT2JzZXJ2ZVNlYXJjaEtleXdvcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gT3ZlcnJpZGVzIHRvIHR3ZWFrIHRoZSBiZWhhdmlvcnMgb2YgdGhlIGxvYWRpbmcvdW5sb2FkaW5nIGxvZ2ljXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvbGxvd2luZyBidWlsZGluZyBhIG1lZGlhdG9yIG9yIHJldHJpZXZpbmcgYSBtZWRpYXRvciBmcm9tIGNhY2hlLCBcclxuICAgICAqIHRoaXMgbWV0aG9kIHR1cm5zIG9uIHRoZSBtZWRpYXRvciB0byB0cmlnZ2VyIG5ldHdvcmsgcmVxdWVzdC4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBmcm9tQ2FjaGVcclxuICAgICAqIEBwYXJhbSBrZXl3b3JkIFRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIHNlY29uZCBvbmUgYXJlIHBhc3NlZCBhbGwgdGhlIHdheSBmcm9tIHRoZSBcclxuICAgICAqIG9uRG9jdW1lbnRSZWFkeSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0dXJuT25NZWRpYXRvcihmcm9tQ2FjaGU6IGJvb2xlYW4sIGtleXdvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLnR1cm5Pbk1lZGlhdG9yKGZyb21DYWNoZSwga2V5d29yZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGlmIHdlIG5lZWQgdGhlIGZvbGxvd2luZyBsb2dpYz9cclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc2VhcmNoRW5hYmxlZCkge1xyXG4gICAgICAgIC8vICAgICAvLyBTeW5jaHJvbml6aW5nIHRoZSBVSSBhbmQgdGhlIGludGVybmFsIHN0YXRlXHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGtleXdvcmQgPSB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKCk7XHJcbiAgICAgICAgLy8gICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBrZXl3b3JkID0ga2V5d29yZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKGtleXdvcmQsIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gSW5kaWNhdG9yc1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIHNob3dMb2FkaW5nSW5kaWNhdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc2hvdygnTG9hZGluZyAuLi4nLCB0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUxvYWRpbmdJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5oaWRlKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgc2hvd01vcmVMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc2hvdygnTG9hZGluZyAuLi4nLCB0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIGhpZGVNb3JlTG9hZGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLmhpZGUodGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBzaG93UmVmcmVzaGluZ0luZGljYXRvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnNob3coJ0xvYWRpbmcgLi4uJywgdGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBoaWRlUmVmcmVzaGluZ0luZGljYXRvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLmhpZGUodGhpcy5zcGlubmVyTmFtZSlcclxuICAgICAgICAvLyBSZWxlYXNlIGEgbWVzc2FnZSBcclxuICAgICAgICB0aGlzLl90b2FzdHIuc3VjY2VzcyhgTGlzdCB3YXMganVzdCByZWZyZXNoZWQuYCxcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MnLCB7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBTZWFyY2ggc3RhdGUgbWFjaGluZVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyBTdGFydCB0byBsaXN0ZW4gZm9yIHNlYXJjaCBrZXl3b3JkIGNoYW5nZVxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0T2JzZXJ2ZVNlYXJjaEtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2VhcmNoS2V5d29yZFN1YnIgPSB0aGlzLnNlYXJjaENvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShhID0+IHtcclxuICAgICAgICAgICAgYSA9IChhIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAoYSAmJiBhICE9PSB0aGlzLmtleXdvcmRJbkVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gYTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW55RnV0dXJlS2V5d29yZCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0b3BPYnNlcnZlU2VhcmNoS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLl9zZWFyY2hLZXl3b3JkU3ViciAmJiB0aGlzLl9zZWFyY2hLZXl3b3JkU3Vici51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlY29tcHV0ZXMgdGhlIHNlYXJjaCBzdGF0ZVxyXG4gICAgLy9cclxuICAgIC8vIFxyXG4gICAgcHJvdGVjdGVkIGNvbXB1dGVTZWFyY2hTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFueUZ1dHVyZUtleXdvcmQgPSAnJztcclxuICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50eXBlS2V5d29yZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YWl0Rm9ySW5wdXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBrZXl3b3JkID0gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZCgpO1xyXG5cclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBrZXl3b3JkID0ga2V5d29yZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdCA9IGtleXdvcmQ7XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0U3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHNlYXJjaCBpbnB1dCBoYXMgdGhlIGxhdGVzdCB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgcmhzID0gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlIHx8ICcnO1xyXG4gICAgICAgICAgICByaHMgPSByaHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKHJocyAhPT0ga2V5d29yZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKGtleXdvcmQsIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRGb3JJbnB1dFN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBzZWFyY2ggaW5wdXQgaGFzIHRoZSBsYXRlc3QgdmFsdWVcclxuICAgICAgICAgICAgbGV0IHJocyA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZSB8fCAnJztcclxuICAgICAgICAgICAgcmhzID0gcmhzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChyaHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbC5zZXRWYWx1ZSgnJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBTd3RpY2hlcyB0byB0aGUgc3RhdGUgZm9yIHByb3ZpZGluZ1xyXG4gICAgLy8gdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sIGZvciBlbmQgdXNlcnMuXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBzdGFydFRvVHlwZUtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gJyc7XHJcbiAgICAgICAgdGhpcy53YWl0Rm9ySW5wdXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnR5cGVLZXl3b3JkU3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBTY2hlZHVsZSBmb2N1cyBiZWhhdmlvciBpbiBuZXh0IHJvdW5kIG9mIFVJIHVwZGF0aW5nLFxyXG4gICAgICAgIC8vIGluIG9yZGVyIHRoYXQgdGhlIGFib3ZlIHNldHRpbmdzIGFyZSBhbHJlYWR5IGluIGVmZmVjdC5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gVE9ETzogRml4IHRoaXNcclxuICAgICAgICAgICAgLy8gdGhpcy5mb2N1c0ZvbGRlclNlYXJjaElucHV0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FuY2VsIHR5cGVkIGtleXdvcmQgYW5kXHJcbiAgICAvLyByZXNldCB0byB3aGF0ZXZlciB0aGUgcHJldmlvdXMgc3RhdGVcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIG9wZXJhdGlvbiBkb2VzIG5vdCBjYXVzZSBuZXcgbmV0d29yayByZXF1ZXN0LlxyXG4gICAgcHVibGljIGNhbmNlbFR5cGVkS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVTZWFyY2hTdGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBBdXRvIGZvY3VzIHRoZSBzZWFyY2ggaW5wdXRcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2xFbGVtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbGVhciB1cCBrZXl3b3JkXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBvcGVyYXRpb24gY2F1c2VzIG5ldyBuZXR3b3JrIHJlcXVlc3QuXHJcbiAgICBwdWJsaWMgY2xlYXJLZXl3b3JkSW5FZmZlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZCgnJyk7XHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IucmVmcmVzaCh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gQXV0byBmb2N1cyB0aGUgc2VhcmNoIGlucHV0XHJcbiAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sRWxlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhcnRzIGEgbmV3IHJvdW5kIG9mIHNlYXJjaFxyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgb3BlcmF0aW9uIGNhdXNlcyBuZXcgbmV0d29yayByZXF1ZXN0LlxyXG4gICAgcHVibGljIGtpY2tPZmZTZWFyY2goKSB7XHJcbiAgICAgICAgY29uc3QgayA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZTtcclxuICAgICAgICAvLyBUT0RPOiBOb3JtYWxpemUgaW50byBsb3dlcmNhc2UgP1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50S2V5d29yZCA9IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQ7XHJcbiAgICAgICAgaWYgKGsgPT09IGN1cnJlbnRLZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgdG8gZG87XHJcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZVNlYXJjaFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgbW92ZSBmb3J3YXJkIHRvIHNlYXJjaCBcclxuICAgICAgICB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKGspO1xyXG4gICAgICAgIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLnJlZnJlc2godHJ1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICAvL1xyXG4gICAgLy8gVGhlIGV4dHJhIG9wZXJhdGlvbiBhbGxvd3MgZm9yIHN5bmNocm9uaXppbmcgdGhlIGludGVybmFsIHN0YXRlXHJcbiAgICAvLyB3aXRoIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgIHB1YmxpYyBvbkl0ZW1zUmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25JdGVtc1JlYWR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcHV0ZVNlYXJjaFN0YXRlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRIaWdobGlnaHRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmluaXRIaWdobGlnaHRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFNlbmRzIGEgbm90aWZpY2F0aW9uIGJhY2sgdG8gaXRzIHBhcmVudCBvciBjbGllbnQuXHJcbiAgICAgICogQHBhcmFtIGl0ZW0gQSBkYXRhIGVudGl0eS5cclxuICAgICAgKi9cclxuICAgIHNlbGVjdEl0ZW0oaXRlbTogVCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEhpZ2hsaWdodElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gaXRlbTtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgdGhlIGNsaWVudCB0byBoaWdobGlnaHQgYW4gaXRlbSBieSBJZC5cclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICovXHJcbiAgICBoaWdobGlnaHQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoYSA9PiBhLmlkID09IGlkKTtcclxuICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLnNlbGVjdGVkICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19