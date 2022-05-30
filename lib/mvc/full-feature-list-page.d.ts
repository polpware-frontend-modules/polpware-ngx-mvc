import { IViewInstance } from '@polpware/fe-mvc';
import { IListMediatorPublic } from '@polpware/fe-mvc';
import { PlatformObliviousListPage } from './platform-oblivious-list-page';
export interface IPageLifeCycle {
    onDocumentReady(...args: Array<any>): void;
    onDocumentDestroy(...args: Array<any>): void;
}
export declare abstract class FullFeatureListPage extends PlatformObliviousListPage implements IPageLifeCycle {
    onDocumentReady(...args: Array<any>): void;
    onDocumentDestroy(...args: Array<any>): void;
    protected abstract ensureDataProvider(...args: Array<any>): void;
    protected abstract afterMediatorOn(): void;
    protected abstract afterMediatorOff(): void;
    protected abstract readMediatorFromCache(key: string): IListMediatorPublic;
    protected abstract writeMediatorIntoCache(key: string, value: IListMediatorPublic): void;
    protected abstract addOnCacheExpireHandler(key: string): void;
    protected abstract removeOnCacheExpireHandler(key: string): void;
    protected onDataProviderReady(dataProvider: any): void;
    protected buildViewInstance(): IViewInstance;
    doRefresh(): void;
    doInfinite(): void;
    showLoadingIndicator(...args: any[]): void;
    hideLoadingIndicator(...args: any[]): void;
    setLoadingIndicatorDelay(seconds: number): void;
    showMoreLoading(...args: any[]): void;
    hideMoreLoading(...args: any[]): void;
    showRefreshingIndicator(...args: any[]): void;
    hideRefreshingIndicator(...args: any[]): void;
}
