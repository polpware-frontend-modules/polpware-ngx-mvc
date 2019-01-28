export interface IMediatorCompatiblePage {
    moreDataCanBeLoaded: boolean;
    callbacks: {
        onRefresh: any;
        onInfinite: any;
    };
    showLoadingIndicator(...args: Array<any>): void;
    hideLoadingIndicator(...args: Array<any>): void;
    showMoreLoading(...args: Array<any>): void;
    hideMoreLoading(...args: Array<any>): void;
    showRefreshingIndicator(...args: Array<any>): void;
    hideRefreshingIndicator(...args: Array<any>): void;
    onNewItemsReady(items: any[]): any[];
    onItemsReady(): void;
}
