export enum ProductActionsTypes{
    GET_ALL_PRODUCTS="[P] Get All products",
    GET_SELECTED_PRODUCTS="[P] Get Selected products",
    GET_AVAILABLE_PRODUCTS="[P] Get Available products",
    SEARCH_PRODUCTS="[P] Search products",
    NEW_PRODUCT="[P] New product",
    SELECT_PRODUCT="[P] Select product",
    EDIT_PRODUCT="[P] Edit product",
    DELETE_PRODUCT="[P] Delete product",
    PRODUCT_ADDED="[P] product added",
    PRODUCT_UPDATED="[P] product updated",
}
export interface ActionEvent{
    type:ProductActionsTypes,
    payload?:any
}
export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T>{
 dataState?:DataStateEnum,
 data?:T,
 errorMessage?:string
}