import React, { Children, useState } from "react"
import "./style.scss"
import {render} from "../Hooks/index"
import {useInteractionEvent, useUpdate} from "../Hooks/hooks"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"
import { transform } from "@babel/core"

const Electricity = ({ circuitId, children }) => {
    const [circuitOn] = useSimVar(`A:CIRCUIT ON:${circuitId}`,'Bool');
    return (
        <div>
            {circuitOn && children}
        </div>
    )
  }

const EICAS = () => {

    const [n1Eng1] = useSimVar('A:ENG N1 RPM:1','percent');
    const [n1Eng2] = useSimVar('A:ENG N1 RPM:2','percent');
    const [ittEng1] = useSimVar('TURB ENG ITT:1','celsius')
    const [ittEng2] = useSimVar('TURB ENG ITT:2','celsius')

    let constructor = () =>
    {
    }
    useUpdate(dt => {
        constructor()
        n1Eng1
        n1Eng2
        ittEng1
        ittEng2
    })
    return(
         <Electricity circuitId={39}>
            <div>
                <div id="layout">
                    <div id="border1"/>
                    <div id="border2"/>
                    <div id="border3"/>
                    <div id="border4"/>
                    <div id="border5"/>
                    <div id="border6"/>
                    <div id="border7"/>
                    <div id="Tags">
                        <h1 id="FUELQTYTAG">FUEL  QTY</h1>
                        <h1 id="OILTAG">OIL</h1>
                        <h1 id="VIBTAG">VIB</h1>
                        <h1 id="SLATFLAPSPOILERTAG">SLAT/FLAP/SPOILER</h1>
                        <h1 id="LGAUTOBRAKETAG">LG/AUTOBRAKE</h1>
                        <h1 id="APUTAG">APU</h1>
                        <h1 id="CABINTAG">CABIN</h1>
                        <h1 id="TRIMSTAG">TRIMS</h1>
                    </div>
                    <div id="engine status">
                        <h1 id="TO-1">TO-1</h1>
                        <h1 id="ITT">ITT</h1>
                        <div id="ENG1">
                            <img id="ENG1ROSE" src="/Pages/VCockpit/instruments/e170/Assets/EICAS/N1_ICON.png"/>
                            <h1 id="ENG1N1">{(n1Eng1).toFixed(1)}</h1>
                            <img id="ITT1ROSE" src="/Pages/VCockpit/instruments/e170/Assets/EICAS/ITT_ICON.png"/>
                            <h1 id="ENG1ITT">{(ittEng1).toFixed()}</h1><h1 id="ittCelIcon1">°</h1>
                        </div>
                        <div id="ENG2">
                            <img id="ENG2ROSE" src="/Pages/VCockpit/instruments/e170/Assets/EICAS/N1_ICON.png"/>
                            <h1 id="ENG2N1">{(n1Eng1).toFixed(1)}</h1>
                            <img id="ITT2ROSE" src="/Pages/VCockpit/instruments/e170/Assets/EICAS/ITT_ICON.png"/>
                            <h1 id="ENG2ITT">{(ittEng2).toFixed()}</h1><h1 id="ittCelIcon2">°</h1>
                        </div>
                        <h1 id="N1">N1</h1>
                    </div>     
                </div>
            </div>
        </Electricity>
    )
    }    
render(<EICAS/>)