import { useState } from 'react';
import { DateTime } from 'luxon';
import Moon from 'react-moon';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';

function MoonCalendar({width}){
    const{year, month, day} = DateTime.now()
    const [startDate, setStartDate] = useState(new Date());
    const [monthYear, setMonthYear] = useState({
    year: year,
    month: month
});
const monthsArray = ['January', 'February', 'March ', 'April', 
                    'May', 'June', 'July ', 'August',
                    'September', 'October ', 'November', 'December',];

    let SunCalc = require('suncalc');

    //functie care ne arata cate zile sunt intr-0 luna
    function getDaysInMonth(yearSet, monthSet){
        return new Date(yearSet, monthSet, 0).getDate();
      }

      let monthDays = [];
      for(let i = getDaysInMonth(monthYear.year, monthYear.month); i >= 1; i--){
        monthDays.push(i);
        };

    //functie care ne arata cat de iluminata e luna
    function moonIllum(month, day, year){
        return parseFloat(SunCalc.getMoonIllumination(new Date(`${month}, ${day}, ${year}`)).phase.toFixed(5));
    };

    //functie care ne arata procentul
    function percentageMoon(month, day, year){
        return `${parseInt(Math.round(SunCalc.getMoonIllumination(new Date(`${month}, ${day}, ${year}`)).fraction*100))}%`
    };

    const gridDays = monthDays.reverse().map(el=>{
        return <div id={`el${el}`} key={el} className='divGrid text-white md:text-xl md:h-32'>
                    <div className='pl-1'>
                        {el}
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                    <div>
                        <Moon phase={moonIllum(monthYear.month, el ,monthYear.year)}
                          size={width > 768 ? 50 : 35}
                          border={"0px"}
                          lightColor={'#fffcab'}/>
                    </div>
                    
                        <div>{percentageMoon(monthYear.month, el ,monthYear.year)}</div>
                    </div>
            </div>
    });
    return(
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5}}>
            <div className='py-5'>
                    <DatePicker selected={startDate} 
                                onChange={(date) =>{
                                        /* setMonthYear({year: date.getFullYear(), month:date.getMonth() +1}) */
                                        setStartDate(date);
                                        setMonthYear({year: date.getFullYear(), month:date.getMonth() +1})
                                    }} 
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className='datePicker'
                                popperPlacement='auto'
                    />
            </div>
            
            <div className='flex text-white gap-2 justify-center text-2xl pb-8'>
                <div>{monthsArray[monthYear.month-1]}</div>
                <div>{monthYear.year}</div>
            </div>
            <div className="gridPercentage grid grid-cols-7">
                {gridDays}
            </div>
        </motion.div>
        
    )
}

export default MoonCalendar