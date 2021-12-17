export class RestorantApis{
    // private static RESTORANT_GATEWAY1: string ='http://192.168.0.45:5002/';
    private static RESTORANT_GATEWAY: string ='http://restorant.germanywestcentral.azurecontainer.io:4999/';
    public static CATEGORY:string= `${RestorantApis.RESTORANT_GATEWAY}category`;
    public static CATEGORY_UPDATE = (id:string):string=>`${RestorantApis.RESTORANT_GATEWAY}category/${id}`;
    public static CATEGORY_ITEMS = (id:string):string=> `${RestorantApis.RESTORANT_GATEWAY}category/${id}/items`;
    public static ITEM =`${RestorantApis.RESTORANT_GATEWAY}item`;
    public static ITEM_ID = (id:string):string=>`${RestorantApis.RESTORANT_GATEWAY}item/${id}`;
    public static ORDER = `${RestorantApis.RESTORANT_GATEWAY}order`
    /** Note from OrderAPi that only employees have access to all the records */
    public static ORDER_ALL = `${RestorantApis.RESTORANT_GATEWAY}order/all`
    public static USER_LOGIN = `${RestorantApis.RESTORANT_GATEWAY}user/login`
    public static USER = (id:string)=>`${RestorantApis.RESTORANT_GATEWAY}user/${id}`
    public static REGISTER_CLIENT = `${RestorantApis.RESTORANT_GATEWAY}user/client`
    public static REGISTER_EMPLOYEE = `${RestorantApis.RESTORANT_GATEWAY}user/employee`
    public static USER_UPDATE = `${RestorantApis.RESTORANT_GATEWAY}user`  
     
}
