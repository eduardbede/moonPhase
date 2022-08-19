import { Moon } from "lunarphase-js"

export default function MoonPercentage(){
return Moon.lunarAgePercent().toFixed(3)
      
}