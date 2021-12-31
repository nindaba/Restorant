package com.yadlings.orderservice02.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import static com.yadlings.orderservice02.Models.Constants.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatus {
    private Boolean accepted = false;
    private Boolean cooking  = false;
    private Boolean ready    = false;
    private Boolean served   = false;
    private Boolean payed    = false;
    private String latestStatus = NEW_ORDER;
//    private String changedStatus = NEW_ORDER; TODO store the changed status in order to change the skipped
    private String  cancelMessage = "";

    public void setCooking(Boolean cooking) {
        if(cooking) this.accepted = true;
        this.cooking = cooking;
    }
    public void setReady(Boolean ready) {
        if(ready){
            this.cooking = true;
            this.accepted =true;
        }
        this.ready = ready;
    }

    public void setServed(Boolean served) {
        if(served){
            this.cooking = true;
            this.accepted =true;
            this.ready = true;
        }
        this.served = served;
    }

    public void setPayed(Boolean payed) {
        if(payed){
            this.cooking = true;
            this.accepted =true;
            this.ready = true;
            this.served = true;
        }
        this.payed = payed;
    }
    public String getLatestStatus(){
        return !cancelMessage.equals("") ? CANCELED :
                payed ? PAYED : served ? SERVED : ready ? READY : cooking ? COOKING: accepted ? ACCEPTED : NEW_ORDER;
    }

}
