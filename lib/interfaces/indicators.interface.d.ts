export interface ILoadingIndicator {
    showLoadingIndicator(...args: any[]): void;
    hideLoadingIndicator(...args: any[]): void;
    setLoadingIndicatorDelay(seconds: number): any;
}
export interface IRefreshingIndicator {
    showRefreshingIndicator(...args: any[]): void;
    hideRefreshingIndicator(...args: any[]): void;
}
export interface ILoadingMoreIndicator {
    showMoreLoading(...args: any[]): void;
    hideMoreLoading(...args: any[]): void;
}
