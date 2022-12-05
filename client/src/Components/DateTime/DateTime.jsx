import React from "react";

export const DateTime =()=>{
      var showDate=new Date();
      var displaytodaysdate=showDate.getDate()+"/"+(showDate.getMonth()+1)+"/"+showDate.getFullYear();
      var displayTime=showDate.getHours()+":"+showDate.getMinutes();
      return (
        <div>
          <h2 type="text" readOnly="true">{displaytodaysdate}  </h2>
          
        </div>
      )
}
export default DateTime;