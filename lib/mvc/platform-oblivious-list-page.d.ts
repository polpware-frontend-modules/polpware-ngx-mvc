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
import { IViewInstance } from '@polpware/fe-mvc';
import { IListMediatorPublic } from '@polpware/fe-mvc';
import { IMediatorCompatiblePage } from './mediator-compatible-page.interface';
import { ILoadingIndicator, IRefreshingIndicator, ILoadingMoreIndicator } from '../interfaces/indicators.interface';
export declare abstract class PlatformObliviousListPage implements IMediatorCompatiblePage, ILoadingIndicator, IRefreshingIndicator, ILoadingMoreIndicator {
    moreDataCanBeLoaded: boolean;
    callbacks: {
        onRefresh: any;
        onInfinite: any;
    };
    protected listMediator: IListMediatorPublic;
    constructor();
    protected abstract buildViewInstance(): IViewInstance;
    protected abstract buildMediator(...args: any[]): PromiseLike<void>;
    protected turnOnMediator(fromCache: boolean, ...rest: any[]): void;
    protected turnOffMediator(): void;
    abstract showLoadingIndicator(...args: Array<any>): void;
    abstract hideLoadingIndicator(...args: Array<any>): void;
    abstract setLoadingIndicatorDelay(seconds: number): void;
    abstract showMoreLoading(...args: Array<any>): void;
    abstract hideMoreLoading(...args: Array<any>): void;
    abstract showRefreshingIndicator(...args: Array<any>): void;
    abstract hideRefreshingIndicator(...args: Array<any>): void;
    abstract onNewItemsReady(items: Array<any>): Array<any>;
    abstract onItemsReady(): void;
}
