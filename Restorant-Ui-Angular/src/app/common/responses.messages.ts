import { Response,Caller } from "../models/response.module"

const SENDING_ORDER_FAILED:{response: Response}={
    response:{
        message: 'Send Failed',
        success:false,
        from:Caller.SEND_ORDER
        }
}
const SENDING_ORDER_SUCESS:{response: Response}={
    response :{
        message: 'Success',
        success:true,
        from:Caller.SEND_ORDER
        }
}
const LOADING_ORDER_FAILED:{response: Response}={
    response:{
        message: 'loading order Failed',
        success:false,
        from:Caller.LOAD_ORDER
        }
}
const LOADING_ORDER_SUCESS:{response: Response}={
    response :{
        message: 'Success',
        success:true,
        from:Caller.LOAD_ORDER
        }
}
const LOADING_ITEM_FAILED:{response: Response}={
    response:{
        message: 'loading item Failed',
        success:false,
        from:Caller.LOAD_ITEM
        }
}
const LOADING_ITEM_SUCESS:{response: Response}={
    response :{
        message: 'Success',
        success:true,
        from:Caller.LOAD_ITEM
        }
}
const LOGIN_SUCCESS:{response: Response}={
    response :{
        message: 'Success',
        success:true,
        from:Caller.USER_SERVICE
        }
}
const LOGIN_FAILED= (message:string):{response: Response} => ({
    response :{
        message: message,
        success:false,
        from:Caller.USER_SERVICE
        }
})
const REGISTER_SUCCESS:{response: Response}={
    response :{
        message: 'Success',
        success:true,
        from:Caller.USER_SERVICE
        }
}
const REGISTER_FAILED= (message:string):{response: Response} => ({
    response :{
        message: message,
        success:false,
        from:Caller.USER_SERVICE
        }
})
const DELETED = (message:string):{response: Response} => ({
    response :{
        message: message,
        success:true,
        from:Caller.EMPLOYEE
        }
})
export{
    SENDING_ORDER_FAILED,
    SENDING_ORDER_SUCESS,
    LOADING_ORDER_FAILED,
    LOADING_ORDER_SUCESS,
    LOADING_ITEM_FAILED,
    LOADING_ITEM_SUCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    DELETED
}
