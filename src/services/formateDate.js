
export const useFormatDate = (_date)=>{

      const date = new Date(_date)
      return  date.toLocaleDateString('en-GB', { timeZone: "UTC" })
     


}