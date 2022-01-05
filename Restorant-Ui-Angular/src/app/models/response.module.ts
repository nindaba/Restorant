export enum Caller {
    SEND_ORDER = 'send_order',
    LOAD_ORDER = "LOAD_ORDER",
    LOAD_ITEM = "LOAD_ITEM",
    USER_SERVICE = 'user_service',
    EMPLOYEE = "EMPLOYEE"
}
export interface Response{
    message: string;
    success:Boolean;
    from: Caller;
}
