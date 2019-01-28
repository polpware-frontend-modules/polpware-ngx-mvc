import { IListMediatorCtorOptions } from '@polpware/fe-mvc';
import { INgStoreListMediatorPublic } from '@polpware/fe-mvc';
import { ICollectionItem } from '@polpware/fe-data';
import { ISlidingExpireCache } from '@polpware/fe-data';
import { FullFeatureListPage } from './full-feature-list-page';
export declare abstract class NgStoreBackedListPage<T extends ICollectionItem> extends FullFeatureListPage {
    protected defaultLivePeriod: number;
    protected mediatorCtorOptions: IListMediatorCtorOptions;
    protected mediatorCache: ISlidingExpireCache<INgStoreListMediatorPublic>;
    private _onCacheExpireCallback;
    private _storeSubscription;
    items: T[];
    constructor();
    protected turnOnMediator(fromCache: boolean): void;
    protected turnOffMediator(): void;
    protected buildMediator(dataProvider: any): PromiseLike<void>;
    protected readonly asNgStoreListMeidator: INgStoreListMediatorPublic;
    protected readMediatorFromCache(key: string): INgStoreListMediatorPublic;
    protected writeMediatorIntoCache(key: string, value: INgStoreListMediatorPublic): void;
    protected addOnCacheExpireHandler(key: string): void;
    protected removeOnCacheExpireHandler(key: string): void;
    onNewItemsReady(items: T[]): T[];
}
