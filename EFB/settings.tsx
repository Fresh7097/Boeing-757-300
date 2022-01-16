import React, { Children, useState } from "react"
import "./style.scss"
import {render} from "../Hooks/index"
import {useInteractionEvent, useUpdate} from "../Hooks/hooks"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"


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
    <div style={{width:"1080", height:"864", alignItems: "center"}}>
            <img src="/Pages/VCockpit/instruments/e170/Assets/EFB/Settings.png" width="1080" height="950" alt="submit"/>
    </div>
    </Electricity>
    )
    }
render(<EFB/>)

export const settings = () => {


    }
    
    


