import {Request, Response} from 'express';

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;


// import {createVideoController} from './createVideoController'
// import {findVideoController} from './findVideoController'
// import {deleteVideoController} from './deleteVideoController'

// ...
export type ParamType = {
    id: string;
};

export type BodyType = {
    id: number;
    title: string;
    // ...
};

export type QueryType = {
    search?: string;
};

export const someController = (
    req: Request<ParamType, any, BodyType, QueryType>,
    res: Response<void | OutputErrorsType>,
) => {};
type OutputErrorsType = {}
// ...
// import {OutputErrorsType} from '../input-output-models/output-errors-type'
