import { IRxjsPoweredDirContentMediatorDev, IWritableListMediatorCtorOptions, IWritableListMediatorPublic } from '@polpware/fe-mvc';
export interface IDefListBaseMediatorCtorOptions extends IWritableListMediatorCtorOptions {
    keyword?: string;
    pageSize?: number;
}
/** Specifies the internal interface for accessing the properties
 * of the internal implementation of a mediator.
 *
 * This interface is supposed used only in the traditional way of implementing a
 * a class, e.g., the way of xx.extend({}).
 *
 * Using this interface helps the editor to figure out the correct properties
 * when we implement the mediator.
 */
export interface IDefListBaseMediatorDev extends IRxjsPoweredDirContentMediatorDev {
    _filter: string;
    _keyword: string;
    _pageSize: number;
    _fromCache: boolean;
    reComputeDataParams(): any;
}
/** Specifies the interface that we can use in the controller
 * which uses the mediator.
 *
 * This interface and the above interface describes the same object in
 * two distinct perspectives. The above one defines the interface from the
 * perspective of implmenting a meditator. This one defines the interface
 * from the perspective of a client.
 *
 * Using this interface helps the editor to figure out the correct methods
 * we may use in the controller and its sub-classes.
 */
export interface IDefListBaseMediatorPublic extends IWritableListMediatorPublic {
    keyword(value?: string): string;
    _formCache: boolean;
    _isInit: boolean;
}
export declare const DefListBaseMediator: any;
