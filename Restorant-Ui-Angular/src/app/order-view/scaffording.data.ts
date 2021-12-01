import { Order } from "../models/order.model";

export let ORDERS: Order[] = [
    {
      orderId:"619e97d5589b17233e01ddc1",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 2,
          price: 100
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:true,
        cooking:true,
        ready:false,
        served:false,
        payed:false,
        cancelMessage:''
      },
      totalPrice: 240,
      timeCreated:1637783507012,
      timeUpdated:1637783509012
    },
    {
      orderId:"619e97d5589b17233e01ddc2",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 4,
          price:30
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:true,
        cooking:false,
        ready:false,
        served:false,
        payed:true,
        cancelMessage:''
      },
      totalPrice: 160,
      timeCreated:1637783509012,
      timeUpdated:1637783509012
    },
    {
      orderId:"619e97d5589b17233e01ddc3",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 2,
          price: 100
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:false,
        cooking:false,
        ready:false,
        served:false,
        payed:false,
        cancelMessage:''
      },
      totalPrice: 34,
      timeCreated:1637783609012,
      timeUpdated:1637783709012
    },
    {
      orderId:"619e97d5589b17233e01ddc4",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 2,
          price: 100
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:false,
        cooking:false,
        ready:false,
        served:false,
        payed:false,
        cancelMessage:'No ingreedients fort this order'
      },
      totalPrice: 60,
      timeCreated:1637783509012,
      timeUpdated:1637783509012
    },
    {
      orderId:"619e97d5589b17233e01ddc6",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 2,
          price: 100
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:true,
        cooking:true,
        ready:true,
        served:true,
        payed:true,
        cancelMessage:''
      },
      totalPrice: 400,
      timeCreated:1637783909012,
      timeUpdated:1637783919012
    },
    {
      orderId:"619e97d5589b17233e01ddca",
      clientId:"619914eac8f16f791f61abb5",
      orderItems:[
        {
          itemId: "6151b07150cca55da3c9305b",
          number: 2,
          price: 100
        },
        {
          itemId: "6153268fe5b7f4670654b8c9",
          number: 4,
          price: 10
        }
      ],
      status:{
        accepted:false,
        cooking:false,
        ready:false,
        served:false,
        payed:false,
        cancelMessage:''
      },
      totalPrice: 500,
      timeCreated:1637783509012,
      timeUpdated:1637793509012
    }
  ]