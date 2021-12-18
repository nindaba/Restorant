import { OrderStatus } from "../models/order-status.model";
import { INITIAL_STATUS } from "../order-view/store/order.initial";
import { copy, logger } from "./utils";



// function newStatus(status:OrderStatus,message:string):OrderStatus{
//     return INITIAL_STATUS;
// }
/**
   * @param OrderStatus
   * This follows the order of essential status and checks which one is true first,
   * if the last is true and the first is true: of couse it will return the first
   * The Order is as follow and it will return one if true
   * 
   * 0. cancelled
   * 1. payed
   * 2. served
   * 3. ready
   * 4. cooking 
   * 5. accepted
   * 6. New Order
   * 
   * @returns String of status
  */
 const extractLatestStatus = (status:OrderStatus):string => status
 .cancelMessage ? "canceled":
 status.payed ? "Payed": 
 status.served ? "Served":
 status.ready ? "Ready":
 status.cooking ? "Cooking":
 status.accepted ? "Accepted":
 "New Order";
const extractStatusIndex = (status:OrderStatus):number => status
 .cancelMessage ? 5:
 status.payed ? 4: 
 status.served ? 3:
 status.ready ? 2:
 status.cooking ? 1:
 status.accepted ? 0:
 -1;
function newStatus(status:OrderStatus,index : number):OrderStatus;
function newStatus(status:OrderStatus,index : string):OrderStatus;
function newStatus(_status:OrderStatus,index :any):any{
    let status = copy<OrderStatus>(_status);
    switch(index){
            case 0:
            status.accepted = true;
            break;
            case 1:
            status.cooking = true;
            break;
            case 2:
            status.ready = true;
            break;
            case 3:
            status.served = true;
            break;
            case 4:
            status.payed = true;
            break;
            default:
                status.cancelMessage = index;
                    break;

    }
    return status;
}
 /**
   * This takes in timestamp and converts it to JS Date,
   * remove the seconds part of the date 
   * splits the date and time
   * @param timestamp 
   * @returns Object of {date:string,time:string}
   */
  const extractTimestamp = (timestamp:number):{date:string,time:string} =>{
    let dateTime : {date:string,time:string} = {date:'',time:''};
    [dateTime.date,dateTime.time] = new Date(timestamp)
    .toISOString()
    .substring(0,16)
    .split("T");
    return dateTime;
  }
const compare = (a:any,b:any)=> b.timeUpdated-a.timeUpdated
 export{
    newStatus,
    extractLatestStatus,
    extractStatusIndex,
    extractTimestamp,
    compare
 }