import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { OrderStatus } from "../models/order-status.model";

/**
 * return logger
 * @param anything but with ttype
 * @returns return the same thisng
 */
function logger<T>(an:T,from?:any):T{
    console.log('[INFO] '+new Date() +' '+from||'')
    console.log(an);
    return an;
}
function TapLogger(an:Observable<any>,from?:any):Observable<any>{
    return an.pipe(
        tap(logger)
    )
}
const copy = <T>(original:any):T => JSON.parse(JSON.stringify(original))
 export{
    copy,
    logger,
    TapLogger
 }