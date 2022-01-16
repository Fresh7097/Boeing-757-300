import React, { Children, useState } from "react"
import "./style.scss"
import {render} from "../Hooks/index"
import {useInteractionEvent, useUpdate} from "../Hooks/hooks"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"
import { settings } from "./settings"


const Electricity = ({ circuitId, children }) => {
    const [circuitOn] = useSimVar(`A:CIRCUIT ON:${circuitId}`,'Bool');
    return (
        <div>
            {circuitOn && children}
        </div>
    )
  }

const EFB = () => { 

return(
    <Electricity circuitId={51}>
   <div id="SettingButton" style={{width:"256", height:"256", alignItems: "center"}}>
        <button onClick={settings} type="submit" style={{transform: "scale(60,60)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/Gear.png" width="1" height="1" alt="submit"/>
        </button>
    </div>
    <div id="DashButton" style={{width:"512", height:"512", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(60,60)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/Dash.png" width="1" height="1" alt="submit"/>
        </button>
    </div>
    <div id="ClipButton" style={{width:"512", height:"512", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(60,60)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/clip.png" width="1" height="1" alt="submit"/>
        </button>
    </div>
    <div id="ChartButton" style={{width:"512", height:"512", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(60,60)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/chart.png" width="1" height="1" alt="submit"/>
        </button>
    </div>
    <div id="PlaneButton" style={{width:"512", height:"512", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(60,60)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/plane.png" width="1" height="1" alt="submit"/>
        </button>
    </div>
    <div id="Simbrief" style={{width:"512", height:"512", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(100,100)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/Simbrief.png" width="9" height="11" alt="submit"/>
        </button>
    </div>
    <div id="SimbriefName" style={{width:"176", height:"57", alignItems: "center"}}>
        <button type="submit" style={{transform: "scale(100,100)", border: 0, background: "transparent", }}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/Simbriefname.png" width="9" height="11" alt="submit"/>
        </button>
    </div>
    <div style={{width:"1080", height:"864", alignItems: "center"}}>
            <img src='/Pages/VCockpit/instruments/e170/Assets/EFB/Dashboard.png' width="1080" height="950" alt="submit"/>
    </div>
    </Electricity>
)
}
render(<EFB/>)



