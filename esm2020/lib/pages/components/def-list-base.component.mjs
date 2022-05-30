import { EventEmitter, Input, Output, ViewChild, Directive } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmLWxpc3QtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wb2xwd2FyZS9uZ3gtbXZjL3NyYy9saWIvcGFnZXMvY29tcG9uZW50cy9kZWYtbGlzdC1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQyxNQUFNLHlDQUF5QyxDQUFDOzs7QUFjaEgsTUFBTSxPQUFnQixvQkFBZ0QsU0FBUSxxQkFBd0I7SUFxRWxHLFlBQVksWUFBMkMsRUFDaEMsUUFBc0IsRUFDdEIsT0FBaUI7UUFDcEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRkQsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFVO1FBckUvQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUU1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQStEcEMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELG1FQUFtRTtJQUNuRSxpREFBaUQ7SUFDakQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUN4RSxDQUFDO0lBRUQseURBQXlEO0lBQ3pELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDeEUsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQVEsSUFBSSxDQUFDLGFBQStDLENBQUMsV0FBVyxDQUFDO0lBQzdFLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsa0VBQWtFO0lBQ2xFLGdGQUFnRjtJQUdoRjs7Ozs7OztPQU9HO0lBQ08sY0FBYyxDQUFDLFNBQWtCLEVBQUUsT0FBZTtRQUN4RCxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6Qyw4Q0FBOEM7UUFFOUMsNEJBQTRCO1FBQzVCLHFEQUFxRDtRQUNyRCw0REFBNEQ7UUFDNUQscUJBQXFCO1FBQ3JCLDJDQUEyQztRQUMzQyxpREFBaUQ7UUFDakQsK0JBQStCO1FBQy9CLGNBQWM7UUFDZCxRQUFRO1FBQ1IsSUFBSTtJQUNSLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsYUFBYTtJQUNiLGdGQUFnRjtJQUVoRixXQUFXO0lBQ0osb0JBQW9CO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLG9CQUFvQjtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFdBQVc7SUFDSixlQUFlO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFdBQVc7SUFDSixlQUFlO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsV0FBVztJQUNKLHVCQUF1QjtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXO0lBQ0osdUJBQXVCO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNwQyxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQzNDLFNBQVMsRUFBRTtZQUNYLFdBQVcsRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsdUJBQXVCO0lBQ3ZCLGdGQUFnRjtJQUVoRiw0Q0FBNEM7SUFDbEMseUJBQXlCO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLEVBQUU7SUFDRixHQUFHO0lBQ08sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5ELElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztZQUMvQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBRWpDLHVEQUF1RDtZQUN2RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QixJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDakMsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQzthQUNOO1NBRUo7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFFOUIsdURBQXVEO1lBQ3ZELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLElBQUksR0FBRyxFQUFFO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFFTCxDQUFDO0lBRUQsc0NBQXNDO0lBQ3RDLDBDQUEwQztJQUMxQyxHQUFHO0lBQ0ksa0JBQWtCO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFN0Isd0RBQXdEO1FBQ3hELDBEQUEwRDtRQUMxRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osaUJBQWlCO1lBQ2pCLGlDQUFpQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsdUNBQXVDO0lBQ3ZDLEVBQUU7SUFDRixxREFBcUQ7SUFDOUMsa0JBQWtCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxtQkFBbUI7SUFDbkIsRUFBRTtJQUNGLDZDQUE2QztJQUN0QyxvQkFBb0I7UUFDdkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCwrQkFBK0I7SUFDL0IsRUFBRTtJQUNGLDZDQUE2QztJQUN0QyxhQUFhO1FBQ2hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ25DLG1DQUFtQztRQUVuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLGNBQWMsRUFBRTtZQUN0QixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsT0FBTztTQUNWO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBR0QsV0FBVztJQUNYLEVBQUU7SUFDRixrRUFBa0U7SUFDbEUsMkJBQTJCO0lBQ3BCLFlBQVk7UUFDZixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVEOzs7UUFHSTtJQUNKLFVBQVUsQ0FBQyxJQUFPO1FBQ2QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVMsQ0FBQyxFQUFVO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7OztzR0F2VWlCLG9CQUFvQjs7Ozs7O3VGQUFwQixvQkFBb0I7Y0FEekMsU0FBUzttR0FHRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBRUksUUFBUTtrQkFBakIsTUFBTTtZQUdQLGlCQUFpQjtrQkFEaEIsU0FBUzttQkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJQ29sbGVjdGlvbkl0ZW0gfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcbmltcG9ydCB7IElOZ3hOb3R5IH0gZnJvbSAnQHBvbHB3YXJlL25neC1ub3R5JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlZkxpc3RCYXNlQ29udHJvbGxlciwgSURlZkxpc3RCYXNlQ29udHJvbGxlclNldHRpbmdzIH0gZnJvbSAnLi4vY29udHJvbGxlcnMvZGVmLWxpc3QtYmFzZS5jb250cm9sbGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlZkxpc3RCYXNlQ29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBJRGVmTGlzdEJhc2VDb250cm9sbGVyU2V0dGluZ3Mge1xyXG4gICAgc3Bpbm5lck5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3Bpbm5lckxpa2Uge1xyXG4gICAgc2hvdyguLi5hcmdzOiBhbnlbXSk7XHJcbiAgICBoaWRlKC4uLmFyZ3M6IGFueVtdKTtcclxuICAgIHN0YXJ0VG9MaXN0ZW5TcGlubmVyKC4uLmFyZ3M6IGFueVtdKTtcclxuICAgIHN0b3BMaXN0ZW5lciguLi5hcmdzOiBhbnlbXSk7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZkxpc3RCYXNlQ29tcG9uZW50PFQgZXh0ZW5kcyBJQ29sbGVjdGlvbkl0ZW0+IGV4dGVuZHMgRGVmTGlzdEJhc2VDb250cm9sbGVyPFQ+IHtcclxuXHJcbiAgICBASW5wdXQoKSBib3R0b21PZmZzZXQgPSAwO1xyXG4gICAgQElucHV0KCkgbWluSGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIGZpeGVkSGVpZ2h0ID0gMDtcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodCA9IDA7XHJcbiAgICBASW5wdXQoKSB0b3BPZmZzZXQgPSAwO1xyXG4gICAgQElucHV0KCkgY29udGFpbmVyQ2xhc3MgPSAnJztcclxuICAgIEBJbnB1dCgpIGluaXRIaWdobGlnaHRJZDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaENvbnRyb2xFbGVtJylcclxuICAgIHNlYXJjaENvbnRyb2xFbGVtOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBzdGF0ZXMgZm9yIHRoZSBzZWFyY2ggc3RhdGUgbWFjaGluZVxyXG4gICAgLy8gICB3YWl0Rm9ySW5wdXQgLS0+IHR5cGVLZXl3b3JkU3RhdGVcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBzZWFyY2hFbmFibGVkOiBib29sZWFuO1xyXG4gICAgLy8gXHJcbiAgICAvLyBUaGlzIGZsYWcgRGVjaWRlcyBpZiB3ZSBjYW4gZGlzcGxheSBhIGNvbnRyb2xcclxuICAgIC8vIHdoaWNoIGZ1cnRoZXIgZGVjaWRlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2VhcmNoIGlucHV0IGNvbnRyb2wuXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGlzIHVzZWQgd2hlbiB3ZSBoYXZlIGFub3RoZXIgbGV2ZWwgb2ZcclxuICAgIC8vIGNvbnRyb2xsaW5nIHdoZXRoZXIgdGhlIHNlYXJjaCBpbnB1dCBzaG91bGQgYmUgdmlzaWJsZSBvciBub3QuXHJcbiAgICAvLyBFLmcuLCBXaGVuIHRoZSBzcGFjZSBpcyBsaW1pdGVkLCB3ZSBtYXkgZGlzcGxheSBhIGNvbnRyb2wgZmxhZ1xyXG4gICAgLy8gdG8gdHVybiBvbiB0aGUgdmlzaWJsaXR5IG9mIHRoZSByZWFsIHNlYXJjaCBpbnB1dCwgYW5kXHJcbiAgICAvLyBieSBkZWZhdWx0IG9ubHkgc2hvd3MgdGhlIGNvbnRyb2wgZmxhZy5cclxuICAgIC8vIFxyXG4gICAgcHVibGljIHdhaXRGb3JJbnB1dFN0YXRlOiBib29sZWFuO1xyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgZmxhZyBkZWNpZGVzIGlmIHRoZSBzZWFyY2ggaW5wdXQgY29udHJvbCBzaG91bGQgYmUgdmlzaWJsZVxyXG4gICAgLy8gb3Igbm90LiBcclxuICAgIC8vIFxyXG4gICAgcHVibGljIHR5cGVLZXl3b3JkU3RhdGU6IGJvb2xlYW47XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBwcm9wZXJ0eSB0cmFja3MgdGhlIGN1cnJlbnQgZWZmZWN0aXZlIGtleXdvcmQuIFxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMga2V5d29yZEluRWZmZWN0OiBzdHJpbmc7XHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBmbGFnIGRlY2lkZXMgaWYgYW55IGtleXdvcmQgaXMgaW4gZWZmY3RpdmUuXHJcbiAgICAvL1xyXG4gICAgLy8gSXQgaXMgdXNlZCB3aGVuIGdlbmVyYXRpbmcgdGhlIHN0YXRlIG9mIHRoZSBzZWFyY2ggcmVzdWx0LlxyXG4gICAgLy8gXHJcbiAgICBwdWJsaWMga2V5d29yZEluRWZmZWN0U3RhdGU6IGJvb2xlYW47XHJcbiAgICAvLyBTZWFyY2ggY29udHJvbCBpbnB1dFxyXG4gICAgcHVibGljIHNlYXJjaENvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIHByb3BlcnR5IHRyYWNrcyBpZiB0aGVyZSBpcyBhbnkga2V5d29yZCBcclxuICAgIC8vIHdoaWNoIG1heSBiZSBhcHBsaWVkIGluIHRoZSBmdXR1cmUuXHJcbiAgICAvLyBFLmcuLCB0aG91Z2ggdGhlcmUgaXMgYSBrZXl3b3JkIGluIGVmZmVjdCxcclxuICAgIC8vIGEgdXNlciBtYXkgZW50ZXIgbmV3IGtleXdvcmQgaW4gdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sXHJcbiAgICAvLyBhbmQgdGhlIG5ldyB2YWx1ZSBpcyBub3QgZXF1YWwgdG8gdGhlIGN1cnJlbnQgZWZmZWN0aXZlXHJcbiAgICAvLyBrZXl3b3JkLiBJbiB0aGlzIGNhc2UsIGFueUZ1dHVyZUtleXdvcmQgdGVsbHMgdGhlIG5ldyB2YWx1ZS4gXHJcbiAgICBwdWJsaWMgYW55RnV0dXJlS2V5d29yZDogc3RyaW5nO1xyXG5cclxuICAgIC8vXHJcbiAgICAvLyBUcmFja3MgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gV2UgZGVjaWRlIG5vdCB0byBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBpdGVtLlxyXG4gICAgLy8gSW5zdGVhZCwgZWFjaCBjb250cm9sbGVyIG1heSBoYXZlIGl0cyBvd24gc2VsZWN0ZWQgaXRlbS5cclxuICAgIC8vIERvaW5nIHNvLCB0aGVyZSBpcyBubyBpbnRlcmZlcmVuY2UgYW1vbmcgZGlmZmVyZW50IGNvbnRyb2xsZXJzLFxyXG4gICAgLy8gZXZlbiB0aG91Z2ggdGhleSBzaGFyZSB0aGUgc2FtZSB1bmRlcmx5aW5nIGRhdGEuIFxyXG4gICAgcHVibGljIHNlbGVjdGVkOiBUO1xyXG5cclxuICAgIHByaXZhdGUgX3NlYXJjaEtleXdvcmRTdWJyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IobGlzdFNldHRpbmdzOiBJRGVmTGlzdEJhc2VDb21wb25lbnRTZXR0aW5ncyxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NwaW5uZXI6IElTcGlubmVyTGlrZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RvYXN0cjogSU5neE5vdHkpIHtcclxuICAgICAgICBzdXBlcihsaXN0U2V0dGluZ3MpO1xyXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHNlYXJjaCBpcyBlbmFibGVkXHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbXB1dGUgdGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzIGZyb20gdGhlIHVuZGVybHlpbmcgbWVkaWF0b3JcclxuICAgIC8vIGFuZCBmdXJ0aGVyIHRoZSBkYXRhIHByb3ZpZGVyIG9mIHRoZSBtZWRpYXRvci5cclxuICAgIGdldCB0b3RhbENvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5kYXRhUHJvdmlkZXIoKS5zdGF0ZS50b3RhbFJlY29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXMgYWJvdmUsIGNvbXB1dGUgdGhlIGxvYWRlZCBudW1iZXIgb2YgcmVjb3JkcyBzbyBmYXIuXHJcbiAgICBnZXQgb2Zmc2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5kYXRhUHJvdmlkZXIoKS5zdGF0ZS50b3RhbFJlY29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNwaW5uZXJOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fbGlzdFNldHRpbmdzIGFzIElEZWZMaXN0QmFzZUNvbXBvbmVudFNldHRpbmdzKS5zcGlubmVyTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnN0YXJ0VG9MaXN0ZW5TcGlubmVyKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRG9jdW1lbnRSZWFkeSgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRPYnNlcnZlU2VhcmNoS2V5d29yZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc3RvcExpc3RlbmVyKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRG9jdW1lbnREZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5zdG9wT2JzZXJ2ZVNlYXJjaEtleXdvcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gT3ZlcnJpZGVzIHRvIHR3ZWFrIHRoZSBiZWhhdmlvcnMgb2YgdGhlIGxvYWRpbmcvdW5sb2FkaW5nIGxvZ2ljXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvbGxvd2luZyBidWlsZGluZyBhIG1lZGlhdG9yIG9yIHJldHJpZXZpbmcgYSBtZWRpYXRvciBmcm9tIGNhY2hlLCBcclxuICAgICAqIHRoaXMgbWV0aG9kIHR1cm5zIG9uIHRoZSBtZWRpYXRvciB0byB0cmlnZ2VyIG5ldHdvcmsgcmVxdWVzdC4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBmcm9tQ2FjaGVcclxuICAgICAqIEBwYXJhbSBrZXl3b3JkIFRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIHNlY29uZCBvbmUgYXJlIHBhc3NlZCBhbGwgdGhlIHdheSBmcm9tIHRoZSBcclxuICAgICAqIG9uRG9jdW1lbnRSZWFkeSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0dXJuT25NZWRpYXRvcihmcm9tQ2FjaGU6IGJvb2xlYW4sIGtleXdvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLnR1cm5Pbk1lZGlhdG9yKGZyb21DYWNoZSwga2V5d29yZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGlmIHdlIG5lZWQgdGhlIGZvbGxvd2luZyBsb2dpYz9cclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc2VhcmNoRW5hYmxlZCkge1xyXG4gICAgICAgIC8vICAgICAvLyBTeW5jaHJvbml6aW5nIHRoZSBVSSBhbmQgdGhlIGludGVybmFsIHN0YXRlXHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGtleXdvcmQgPSB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKCk7XHJcbiAgICAgICAgLy8gICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBrZXl3b3JkID0ga2V5d29yZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKGtleXdvcmQsIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gSW5kaWNhdG9yc1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIHNob3dMb2FkaW5nSW5kaWNhdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc2hvdygnTG9hZGluZyAuLi4nLCB0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUxvYWRpbmdJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lci5oaWRlKHRoaXMuc3Bpbm5lck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICBwdWJsaWMgc2hvd01vcmVMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwaW5uZXIuc2hvdygnTG9hZGluZyAuLi4nLCB0aGlzLnNwaW5uZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZVxyXG4gICAgcHVibGljIGhpZGVNb3JlTG9hZGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLmhpZGUodGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBzaG93UmVmcmVzaGluZ0luZGljYXRvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLnNob3coJ0xvYWRpbmcgLi4uJywgdGhpcy5zcGlubmVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcnJpZGVcclxuICAgIHB1YmxpYyBoaWRlUmVmcmVzaGluZ0luZGljYXRvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyLmhpZGUodGhpcy5zcGlubmVyTmFtZSlcclxuICAgICAgICAvLyBSZWxlYXNlIGEgbWVzc2FnZSBcclxuICAgICAgICB0aGlzLl90b2FzdHIuc3VjY2VzcyhgTGlzdCB3YXMganVzdCByZWZyZXNoZWQuYCxcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MnLCB7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBTZWFyY2ggc3RhdGUgbWFjaGluZVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyBTdGFydCB0byBsaXN0ZW4gZm9yIHNlYXJjaCBrZXl3b3JkIGNoYW5nZVxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0T2JzZXJ2ZVNlYXJjaEtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2VhcmNoS2V5d29yZFN1YnIgPSB0aGlzLnNlYXJjaENvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShhID0+IHtcclxuICAgICAgICAgICAgYSA9IChhIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAoYSAmJiBhICE9PSB0aGlzLmtleXdvcmRJbkVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gYTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW55RnV0dXJlS2V5d29yZCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0b3BPYnNlcnZlU2VhcmNoS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLl9zZWFyY2hLZXl3b3JkU3ViciAmJiB0aGlzLl9zZWFyY2hLZXl3b3JkU3Vici51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlY29tcHV0ZXMgdGhlIHNlYXJjaCBzdGF0ZVxyXG4gICAgLy9cclxuICAgIC8vIFxyXG4gICAgcHJvdGVjdGVkIGNvbXB1dGVTZWFyY2hTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFueUZ1dHVyZUtleXdvcmQgPSAnJztcclxuICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50eXBlS2V5d29yZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YWl0Rm9ySW5wdXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBrZXl3b3JkID0gdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZCgpO1xyXG5cclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBrZXl3b3JkID0ga2V5d29yZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmRJbkVmZmVjdCA9IGtleXdvcmQ7XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0U3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHNlYXJjaCBpbnB1dCBoYXMgdGhlIGxhdGVzdCB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgcmhzID0gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlIHx8ICcnO1xyXG4gICAgICAgICAgICByaHMgPSByaHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKHJocyAhPT0ga2V5d29yZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKGtleXdvcmQsIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRGb3JJbnB1dFN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBzZWFyY2ggaW5wdXQgaGFzIHRoZSBsYXRlc3QgdmFsdWVcclxuICAgICAgICAgICAgbGV0IHJocyA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZSB8fCAnJztcclxuICAgICAgICAgICAgcmhzID0gcmhzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChyaHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbC5zZXRWYWx1ZSgnJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBTd3RpY2hlcyB0byB0aGUgc3RhdGUgZm9yIHByb3ZpZGluZ1xyXG4gICAgLy8gdGhlIHNlYXJjaCBpbnB1dCBjb250cm9sIGZvciBlbmQgdXNlcnMuXHJcbiAgICAvLyBcclxuICAgIHB1YmxpYyBzdGFydFRvVHlwZUtleXdvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5hbnlGdXR1cmVLZXl3b3JkID0gJyc7XHJcbiAgICAgICAgdGhpcy53YWl0Rm9ySW5wdXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2V5d29yZEluRWZmZWN0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnR5cGVLZXl3b3JkU3RhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBTY2hlZHVsZSBmb2N1cyBiZWhhdmlvciBpbiBuZXh0IHJvdW5kIG9mIFVJIHVwZGF0aW5nLFxyXG4gICAgICAgIC8vIGluIG9yZGVyIHRoYXQgdGhlIGFib3ZlIHNldHRpbmdzIGFyZSBhbHJlYWR5IGluIGVmZmVjdC5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gVE9ETzogRml4IHRoaXNcclxuICAgICAgICAgICAgLy8gdGhpcy5mb2N1c0ZvbGRlclNlYXJjaElucHV0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FuY2VsIHR5cGVkIGtleXdvcmQgYW5kXHJcbiAgICAvLyByZXNldCB0byB3aGF0ZXZlciB0aGUgcHJldmlvdXMgc3RhdGVcclxuICAgIC8vXHJcbiAgICAvLyBUaGlzIG9wZXJhdGlvbiBkb2VzIG5vdCBjYXVzZSBuZXcgbmV0d29yayByZXF1ZXN0LlxyXG4gICAgcHVibGljIGNhbmNlbFR5cGVkS2V5d29yZCgpIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVTZWFyY2hTdGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBBdXRvIGZvY3VzIHRoZSBzZWFyY2ggaW5wdXRcclxuICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2xFbGVtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbGVhciB1cCBrZXl3b3JkXHJcbiAgICAvL1xyXG4gICAgLy8gVGhpcyBvcGVyYXRpb24gY2F1c2VzIG5ldyBuZXR3b3JrIHJlcXVlc3QuXHJcbiAgICBwdWJsaWMgY2xlYXJLZXl3b3JkSW5FZmZlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3Iua2V5d29yZCgnJyk7XHJcbiAgICAgICAgdGhpcy5hc0RlZkxpc3RCYXNlTWVkaWF0b3IucmVmcmVzaCh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gQXV0byBmb2N1cyB0aGUgc2VhcmNoIGlucHV0XHJcbiAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sRWxlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhcnRzIGEgbmV3IHJvdW5kIG9mIHNlYXJjaFxyXG4gICAgLy9cclxuICAgIC8vIFRoaXMgb3BlcmF0aW9uIGNhdXNlcyBuZXcgbmV0d29yayByZXF1ZXN0LlxyXG4gICAgcHVibGljIGtpY2tPZmZTZWFyY2goKSB7XHJcbiAgICAgICAgY29uc3QgayA9IHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZTtcclxuICAgICAgICAvLyBUT0RPOiBOb3JtYWxpemUgaW50byBsb3dlcmNhc2UgP1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50S2V5d29yZCA9IHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLmtleXdvcmQ7XHJcbiAgICAgICAgaWYgKGsgPT09IGN1cnJlbnRLZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgdG8gZG87XHJcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZVNlYXJjaFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgbW92ZSBmb3J3YXJkIHRvIHNlYXJjaCBcclxuICAgICAgICB0aGlzLmFzRGVmTGlzdEJhc2VNZWRpYXRvci5rZXl3b3JkKGspO1xyXG4gICAgICAgIHRoaXMuYXNEZWZMaXN0QmFzZU1lZGlhdG9yLnJlZnJlc2godHJ1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE92ZXJyaWRlXHJcbiAgICAvL1xyXG4gICAgLy8gVGhlIGV4dHJhIG9wZXJhdGlvbiBhbGxvd3MgZm9yIHN5bmNocm9uaXppbmcgdGhlIGludGVybmFsIHN0YXRlXHJcbiAgICAvLyB3aXRoIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgIHB1YmxpYyBvbkl0ZW1zUmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25JdGVtc1JlYWR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcHV0ZVNlYXJjaFN0YXRlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRIaWdobGlnaHRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmluaXRIaWdobGlnaHRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFNlbmRzIGEgbm90aWZpY2F0aW9uIGJhY2sgdG8gaXRzIHBhcmVudCBvciBjbGllbnQuXHJcbiAgICAgICogQHBhcmFtIGl0ZW0gQSBkYXRhIGVudGl0eS5cclxuICAgICAgKi9cclxuICAgIHNlbGVjdEl0ZW0oaXRlbTogVCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEhpZ2hsaWdodElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gaXRlbTtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgdGhlIGNsaWVudCB0byBoaWdobGlnaHQgYW4gaXRlbSBieSBJZC5cclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICovXHJcbiAgICBoaWdobGlnaHQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoYSA9PiBhLmlkID09IGlkKTtcclxuICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLnNlbGVjdGVkICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19