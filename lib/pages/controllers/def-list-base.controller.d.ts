import { ICollectionItem } from '@polpware/fe-data';
import { BackboneBackedListPage } from '../../mvc/backbone-backed-list-page';
import { IDefListBaseMediatorCtorOptions, IDefListBaseMediatorPublic } from '../mediators/def-list-base.mediator';
export interface IDefListBaseControllerSettings {
    endpointName: string;
    tableName: string;
    cacheKey: string;
}
export declare abstract class DefListBaseController<T extends ICollectionItem> extends BackboneBackedListPage<T> {
    protected readonly _listSettings: IDefListBaseControllerSettings;
    constructor(_listSettings: IDefListBaseControllerSettings);
    get asDefListBaseMediator(): IDefListBaseMediatorPublic;
    /**
     * Indicates whether the underlying medicator is built from the previous
     * cache or not.
     */
    get fromCache(): boolean;
    /**
     * Indicates whether the underlying medicator is still in the init stage,
     * I.e., the underlying mediator has not conducted any request or not.
     */
    get inInitState(): boolean;
    protected getCacheKey(): string;
    protected abstract getBackendService(): any;
    protected abstract getGlobalCache(): any;
    protected abstract getRelationalDB(): any;
    /**
     * Builds the underlying mediator
     * @param keyword The parameter is passed all the way from the
     * onDocumentReady method.
     */
    protected buildMediator(keyword: string): PromiseLike<void>;
    /**
     * Provides a chance to invoke a derived mediator in the derived controller.
     * @param options
     */
    protected invokeMediatorCtor(options: IDefListBaseMediatorCtorOptions): any;
    /**
     * Provides a chance to update the freshly generated data provider.
     * E.g., we can use this method to update the endpoint url.
     */
    protected touchLocalDataProvider(dataProvider: any): void;
}
