import { IWritableListMediatorPublic } from '@polpware/fe-mvc';
import { ICollectionItem } from '@polpware/fe-data';
import { ISlidingExpireCache } from '@polpware/fe-data';
import { FullFeatureListPage } from './full-feature-list-page';
export declare abstract class BackboneBackedListPage<T extends ICollectionItem> extends FullFeatureListPage {
    protected defaultLivePeriod: number;
    protected mediatorCache: ISlidingExpireCache<IWritableListMediatorPublic>;
    private _onCacheExpireCallback;
    items: T[];
    constructor();
    protected abstract getCacheKey(...args: any[]): string;
    protected get asWritableListMediator(): IWritableListMediatorPublic;
    protected useMediatorWithOnlyLocalDataProvider(localDataProvider: any, localOptions?: object): void;
    protected useMediatorWithGlobalDataProvider(localDataProvider: any, globalDataProvider: any, localOptions?: object, globalOptions?: object): void;
    protected postUseFreshMediator(...args: any[]): void;
    protected postUseCachedMediator(...args: any[]): void;
    protected ensureDataProvider(...args: any[]): void;
    protected afterMediatorOn(): void;
    protected afterMediatorOff(): void;
    onNewItemsReady(items: Array<any>): Array<any>;
    onItemsReady(): void;
    protected readMediatorFromCache(key: string): IWritableListMediatorPublic;
    protected writeMediatorIntoCache(key: string, mediator: IWritableListMediatorPublic): void;
    protected addOnCacheExpireHandler(key: string): void;
    protected removeOnCacheExpireHandler(key: string): void;
}
