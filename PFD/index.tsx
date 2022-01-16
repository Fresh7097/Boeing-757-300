import React, { Children, useState } from "react"
import "./style.scss"
import {render} from "../Hooks/index"
import {useInteractionEvent, useUpdate} from "../Hooks/hooks"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"
import {infoGrid,box2topVar,box2topSLeft,box3topVar,box3topSRigth,box2downVar,box2downSLeft} from "./infoGrid"

export let atActive1 : boolean
export let apMaster1 : boolean
export let IAS1 : number
export let AGL1 : number
export let THROTTLEPOS1 : number
export let THROTTLEPOS2 : number
export let HDG1 : boolean
export let lnav1 : number
let speedStripeVal : number
let over30 : boolean
let speedMarkerImg : string
let scaleSpdMarker : number
let startPosSpdMarker : number
let spdMarkerVis : string

const Electricity = ({ circuitId, children }) => {
    const [circuitOn] = useSimVar(`A:CIRCUIT ON:${circuitId}`,'Bool');
    return (
        <div>
            {circuitOn && children}
        </div>
    )
  }

const PFD = () => {

    const [pitchVar, setPitchVar] = useSimVar('A:PLANE PITCH DEGREES', 'degrees')
    const [rollVar, setRollVar] = useSimVar('A:PLANE BANK DEGREES', 'degrees')
    const [IASVar, setIASVar] = useSimVar('A:AIRSPEED INDICATED', 'knots')
    const [altMslVar, setAltMSLVar] = useSimVar('A:INDICATED ALTITUDE', 'feet')
    const [altAglVar, setAltAGLVar] = useSimVar('A:PLANE ALT ABOVE GROUND','feet')
    const [selFDVar, setSelFDVar] = useSimVar('A:AUTOPILOT FLIGHT DIRECTOR ACTIVE','Bool')
    const [atActiveVar, setAtActiveVar] = useSimVar('A:AUTOPILOT MANAGED THROTTLE ACTIVE','Bool')
    const [apMasterVar, setApMasterVar] = useSimVar('A:AUTOPILOT MASTER','Bool')
    const [altSelVar, setAltSelVar] = useSimVar('A:AUTOPILOT ALTITUDE LOCK VAR', 'feet')
    const [altSelVar1, setAltSelVar1] = useSimVar('A:AUTOPILOT ALTITUDE LOCK VAR', 'feet')
    const [altChangeVar, setAltChangeActiveVar] = useSimVar('A:AUTOPILOT ALTITUDE LOCK','Bool')
    const [headingLockVar, setHeadingLockVar] = useSimVar ('A:AUTOPILOT HEADING LOCK','Bool')
    const [headingSelVar, setHeadingSelVar] = useSimVar ('A:AUTOPILOT HEADING LOCK DIR','degrees')
    const [baroAGLVar, setBaroAGLVar] = useSimVar('A:BAROMETER PRESSURE', 'millibars')
    const [throttlePosVar1, setThrottlePosVar1] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:1','Percent')
    const [throttlePosVar2, setThrottlePosVar2] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:2','Percent')
    const [circuitAvionicsVar, setCircuitAvionicsVar] = useSimVar('A:CIRCUIT AVIONICS ON', 'Boolean')
    const [planeOnGroundVar, setPlaneOnGroundVar] = useSimVar('A:SIM ON GROUND','Boolean')
    const [currentGPSHeadingVar, setCurrentGPSHeadingVar] = useSimVar('HEADING INDICATOR','degrees')
    const [baroRefreshHPAVar, setBaroRefreshHPAVar] = useSimVar('A:KOHLSMAN SETTING HG', 'millibars')
    const [dtkGPSVar,setDtkGPSVar] = useSimVar('GPS WP DESIRED TRACK','degrees')
    const [gspdGPSVar, setGspdGPSVar] = useSimVar('GPS GROUND SPEED','knots')
    const [spdChangeVar, setSpdChangeVar] = useSimVar('TRUE AIRSPEED SELECTED','Boolean')
    const [selSpdChangeVar, setSelSpdChangeVar] = useSimVar('AUTOPILOT AIRSPEED HOLD VAR','knots')
    
    const [pitch, setPitch] = useState(0)
    const [roll, setRoll] = useState(0)
    const [altMSL, setAltMSL] = useState(0)
    const [altAGL, setAltAGL] = useState(0)
    const [selFD, setSelFD] = useState(0)
    const [atActive, setAtActive] = useState(0)
    const [apMaster, setApMaster] = useState(0)
    const [IAS, setIAS] = useState(0)
    const [altSel, setAltSel] = useState(0)
    const [altSel1, setAltSel1] = useState(0)
    const [altChange, setAltChangeActive] = useState(0)
    const [headingLock, setHeadingLock] = useState(0)
    const [headingSel, setHeadingSel] = useState(0)
    const [throttlePos1, setThrottlePos1] = useState(0)
    const [throttlePos2, setThrottlePos2] = useState(0)
    const [circuitAvionics, setCircuitAvionics] = useState(0)
    const [planeOnGround,setPlaneOnGround] = useState(0)
    const [currentGPSHeading, setCurrentGPSHeading] = useState(0)
    const [dtkGPS, setDtkGPS] = useState(0)
    const [gspdGPS, setgspdGPS] = useState(0)
    const [spdChange, setSpdChange] = useState(0)
    const [selSpdChange,setSelSpdChange] = useState(0)

    let constructor = () =>
    {
        atActive1 = atActiveVar
        apMaster1 = apMasterVar
        IAS1 = IAS
        AGL1 = altAGL
        THROTTLEPOS1 = throttlePosVar1
        THROTTLEPOS2 = throttlePosVar2
        HDG1 = headingLockVar
    }

    over30 = false
    let airspeedLock = () => 
    {
        if  (IAS < 30)
        {
            over30 = false
        } 
        else if (IAS > 30)
        {
            over30 = true
            IAS1 = speedStripeVal
        }
    }
    let resChanger = () =>
    {
        if (spdChangeVar == true)
        {
            if (selSpdChangeVar < 30)
            {
                spdMarkerVis = "none"
            }
            else
            {
                speedMarkerImg = "/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_BLUEMARKER.png"
                scaleSpdMarker = 0.1
                startPosSpdMarker = 1
            }
        }
        else 
        {
            if (selSpdChangeVar < 30)
            {
                spdMarkerVis = "none"
            }
            else
            {
                speedMarkerImg = "/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_PINKMARKER.png"
                scaleSpdMarker = 0.1
                startPosSpdMarker = 98.5
                spdMarkerVis = "contents"
            }
        }
    }
    
    useUpdate(dt => {
        constructor()
        infoGrid()
        resChanger()
        setPitch(pitchVar)
        setRoll(rollVar)
        setIAS(IASVar)
        setAltMSL(altMslVar)
        setAltAGL(altAglVar)
        setSelFD(selFDVar)
        setAtActive(atActiveVar)
        setApMaster(apMasterVar)
        setAltSel(altSelVar)
        setAltSel1(altSelVar1)
        setAltChangeActive(altChangeVar)
        setHeadingLock(headingLockVar)
        setHeadingSel(headingSelVar)
        setThrottlePos1(throttlePosVar1)
        setThrottlePos2(throttlePosVar2)
        setCircuitAvionics(circuitAvionicsVar)
        setPlaneOnGround(planeOnGroundVar)
        setCurrentGPSHeading(currentGPSHeadingVar)
        setDtkGPS(dtkGPSVar)
        setgspdGPS(gspdGPSVar)
        setSpdChange(spdChangeVar)
        setSelSpdChange(selSpdChangeVar)
    })
    return(
         <Electricity circuitId={39}>
            <div>
                <div id="mask">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_MASK.dds"/>
                </div>
                <div id="spdStripe">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_SPEEDSTRIPE.dds"
                    style={{transform:`translateY(${airspeedLock(),over30?(IAS-30)*5.27: 0}px)`}}/>
                </div>
                <div id="spdBlend">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_SPEEDBLEND.dds"/>
                </div>
                <div id="horMask1">
                    <div id="horMask2">
                </div>
                </div>
                <div id="background">
                <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_HORIZON.dds" 
                    style={{transform:'translateY('+(-pitch*10.4).toString()+ 
                    'px)rotate('+roll.toString()+'deg'}}/>
                </div>
                <div id="airSpdInd">
                    <h1>{airspeedLock()}{over30?(IAS.toFixed()):""}</h1>
                </div>
                <div id="altMSLInd">
                    <h1>{Math.round(altMSL)}</h1>
                </div>
                <div id="altSel">
                    <h1>{("0000"+altSelVar).slice(-5)}</h1>
                </div>
                <div id="spdSel">
                    <h1>{("00"+selSpdChange).slice(-3)}</h1>
                </div>
                <div id="spdMarker" style={{display:spdMarkerVis}}>
                    <img src={speedMarkerImg} style={{transform:`translateY(${((IAS-30)+-selSpdChange+startPosSpdMarker)*5.27}px) scale(${scaleSpdMarker},${scaleSpdMarker})`}}/>
                </div>
                <div id="hdgInd1">
                    <h1>HDG</h1>
                </div>
                <div id="hdgInd2">
                    <h1>{('00'+ headingSel).slice(-3)}</h1>
                </div>
                <div id="dtkInd1">
                    <h1>DTK</h1>
                </div>
                <div id="dtkInd2">
                    <h1>{('00'+ dtkGPSVar.toFixed()).slice(-3)}</h1>
                </div>
                <div id="gspd1">
                    <h1>GSPD</h1>
                </div>
                <div id="gspd2">
                    <h1>{gspdGPSVar.toFixed()}</h1>
                </div>
                <div id="gspd3">
                    <h1>KT</h1>
                </div>
                <div id="hdgTestGPS">
                    <h1>{('00'+ currentGPSHeadingVar.toFixed()).slice(-3)}</h1>
                </div>
                <div id="headingIndComp">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_CURRENTHEADING.dds"/>
                </div>
                <div id="HDGMarker">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_BLUEMARKER.png"
                    style={{transform:`rotate(${-currentGPSHeadingVar + headingSel}deg) translateY(-4700px) rotate(-90deg)`}}/>
                </div> 
                <div id="compass1">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_COMPASS_STATIC.dds"/>
                </div>
                <div id="compass2">
                    <img src="/Pages/VCockpit/instruments/e170/Assets/PFD/PFD_COMPASS.dds"
                    style={{transform: `rotate(${-currentGPSHeadingVar}deg)`}}/>
                </div>
                <div id="baro1">
                    <h1>{baroRefreshHPAVar.toFixed()}</h1>
                </div>
                <div id="baro2">
                    <h1>HPA</h1>
                </div>
                <div id="box2top" style={{left:`${box2topSLeft}px`}}>
                    <h1>{box2topVar}</h1>
                </div>
                <div id="box3top" style={{right:`${box3topSRigth}px`}}>
                    <h1>{selFDVar? box3topVar:""}</h1>
                </div>
                <div id="box2down" style={{left:`${box2downSLeft}px`}}>
                    <h1>{box2downVar}</h1>
                </div>   
            </div>         
        </Electricity>
    )
    }    
render(<PFD/>)