import Moon from "react-moon";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { WiSunrise, WiSunset, WiMoonrise, WiMoonset } from "react-icons/wi";
import { motion } from "framer-motion";

function MoonPhaseNow({width}){
    let lune = require('lune');
    let current_phase = lune.phase_hunt();
    let SunCalc = require('suncalc');
    const date = new Date();
    const moonPercentage = parseFloat(SunCalc.getMoonIllumination(date).phase.toFixed(5));
    const moonIllumination = `${(SunCalc.getMoonIllumination(date).fraction*100).toFixed(1)}%`;
    const [timeLive, setTimeLive] = useState(DateTime.now().toFormat('dd/MM/yyyy HH:mm'));
    const [coordonateIp, setCoordonateIp] = useState({
        lat: '',
        long: ''
    });
    const [sunMoon, setSunMoon] = useState({
        sunRise:" ",
        sunSet: " ",
        moonRise: " ",
        moonSet: " "
    });

    function coordinateIp(){
        fetch("https://ipinfo.io/json?token=a52e57c897dccc")
        .then(res => res.json())
        .then(data=>{
            const index = data.loc.indexOf(",")
            const lat = parseInt(data.loc.slice(0, index))
            const long = parseInt(data.loc.slice(index+1, data.loc.length))
            setCoordonateIp({
                lat: lat,
                long: long
                            });
            
        })};

    useEffect(()=>{
           coordinateIp();
       },[]);

    useEffect(()=>{
        let interval = setInterval(() => {
                setTimeLive(DateTime.now().toFormat('dd/MM/yyyy HH:mm'));
            }, 60000);
        return ()=>{
           clearInterval(interval);
        }
    });

    useEffect(()=>{
        const sunriseSunToday = DateTime.fromISO((new Date(SunCalc.getTimes(date, coordonateIp.lat , coordonateIp.long).sunrise)).toISOString()).toFormat("HH:ss");
        const sunsetSunToday = DateTime.fromISO((new Date(SunCalc.getTimes(date, coordonateIp.lat, coordonateIp?.long).sunset)).toISOString()).toFormat("HH:ss");

        if(SunCalc.getMoonTimes(date, coordonateIp.lat , coordonateIp.long).rise === undefined){
            setSunMoon(prevSun=>{
                return {...prevSun ,
                            sunRise: sunriseSunToday, 
                            sunSet: sunsetSunToday,
                            moonRise: "- -:- -" }
            })
        } else if(SunCalc.getMoonTimes(date, coordonateIp.lat , coordonateIp.long).rise !== undefined){
            setSunMoon(prevSun=>{
                return {...prevSun ,
                        sunRise: sunriseSunToday, 
                        sunSet: sunsetSunToday,
                        moonRise:DateTime.fromISO(new Date(SunCalc.getMoonTimes(date, coordonateIp.lat , coordonateIp.long).rise).toISOString()).toFormat("HH:ss")
                        };
        });
        };

      if(SunCalc.getMoonTimes(date, coordonateIp.lat , coordonateIp.long).set === undefined){
        setSunMoon(prevSun=>{
            return {...prevSun ,
                        sunRise: sunriseSunToday, 
                        sunSet: sunsetSunToday,
                        moonSet: "- -:- -" }
            })
        } else if(SunCalc.getMoonTimes(date, coordonateIp.lat , coordonateIp.long).set !== undefined){
        setSunMoon(prevSun=>{
            return {...prevSun ,
                    sunRise: sunriseSunToday, 
                    sunSet: sunsetSunToday,
                    moonSet:DateTime.fromISO(new Date(SunCalc.getMoonTimes(date, coordonateIp.lat, coordonateIp.long).set).toISOString()).toFormat("HH:ss")
                    }
        });
        
    } 
    },[SunCalc, coordonateIp.lat])

    const daysNewMoon =  parseInt(lune.phase().age);
  
    //functie care ne arata unghiul lunii cand o privim
    function zenithAngle(){
        const parallacticAngleMoon = SunCalc.getMoonPosition(date, coordonateIp.lat, coordonateIp.long).parallacticAngle
        let pi = Math.PI;
        return parallacticAngleMoon * (180/pi);
       
    }
    //functie care ne arata urmatoarea luna noua
    function newNextMoon(){
        return DateTime.fromISO(new Date(current_phase.nextnew_date).toISOString()).toFormat("dd LLL")
    }
   
    //functie care ne arata urmatoarea luna plina
    function nextFullMoon(){
        const dt = new Date();
        return  DateTime.fromISO(new Date(dt.setDate(dt.getDate() - daysNewMoon + 29.53059 + 29.53059/2 )).toISOString()).toFormat("dd LLL");
        
    }

    return(
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7}}
                    className="flex flex-col justify-center items-center pt-10">
            <div className="flex gap-4 text-white pb-12 text-xl">
                    {timeLive}
            </div>
                <Moon phase={moonPercentage} size={width >= 768 ? 300 : 200} border={'0px black solid'} lightColor={'#fffcab'} rotation={`${zenithAngle()}deg`} />
            <div className="text-white pt-12 text-2xl">
                {moonIllumination}
            </div>
            <div className="flex gap-28 md:gap-96">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Moon phase={1} border={'0px'} lightColor={'black'}/>
                    <h1 className="text-white text-center px-4 md:px-0">Next New Moon:</h1>
                    <div className="text-white">{newNextMoon()}</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Moon  phase={0.5} border={'0px'} lightColor={'#fffcab'}/>
                    <h1 className="text-white text-center px-4 md:px-0">Next Full Moon:</h1>
                    <div className="text-white">{nextFullMoon()}</div>
                </div>
            </div>
            <div className="pt-10 text-white text-2xl">
                Day`s since new Moon: {daysNewMoon}
            </div>
            <div className="flex gap-20 pt-10 text-white text-2xl">
                <div className="md:flex md:gap-2">
                    <div className="flex">
                        {coordonateIp.lat !== "" &&  sunMoon.sunRise}
                        <WiSunrise size={"1.5em"} />
                    </div>
                    <div className="flex">
                        {coordonateIp.lat !== "" && sunMoon.sunSet}
                        <WiSunset size={'1.5em'}/>
                    </div>
                </div>
                <div className="md:flex md:gap-2">
                    <div className="flex">
                        {coordonateIp.lat !== "" && sunMoon.moonRise}
                        <WiMoonrise size={"1.5em"} />
                    </div>
                    <div className="flex">
                        {coordonateIp.lat !== "" && sunMoon.moonSet}
                        <WiMoonset size={"1.5em"} />
                    </div>
                </div>
            </div>
        </motion.div>
        
    )
    
}

export default MoonPhaseNow