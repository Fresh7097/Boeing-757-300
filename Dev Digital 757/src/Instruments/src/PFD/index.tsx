

import React, { FC } from "react";
import { render } from "../Common";
import { Horizon } from "./AttitudeIndicator/Horizon";
import { CommandSpeed, MachGS } from "./AirspeedIndicator/SpeedTape";
import { SpeedTape } from "./AirspeedIndicator/SpeedTape";
import { SpeedScroller } from "./AirspeedIndicator/AirspeedScroller";
// import { VSI } from "./VerticalSpeedIndicator";
import { HeadingDisplay } from "./HeadingDisplay";
// import { AltitudeScroller } from "./Altimeter/AltitudeScroller";
// import { AltitudeTape } from "./Altimeter/AltitudeTape";
// import { CommandAlt } from "./Altimeter/AltitudeTape";
// import { BaroSetting } from "./Altimeter/AltitudeTape";
// import { Minimums } from "./Altimeter/AltitudeTape";
// import { RadioAltimeter } from "./Altimeter/AltitudeTape";
import { LateralDeviationScale } from "./DeviationScales/Lateral";
import { VerticalDeviationScale } from "./DeviationScales/Vertical";
import { FMA } from "./FMA";

import "./index.scss";

type BlackOutlineWhiteLineProps = { d: string; blackStroke?: number; whiteStroke?: number; color?: string };
export const BlackOutlineWhiteLine: FC<BlackOutlineWhiteLineProps> = ({ d, blackStroke = 4, whiteStroke = 3, color = "white" }) => (
    <>
        <path stroke="black" strokeWidth={blackStroke} strokeLinecap="round" d={d}></path>
        <path stroke={color} strokeWidth={whiteStroke} strokeLinecap="round" d={d}></path>
    </>
);



const PFD: FC = () => {
    return (
        <>
            <div className="PFD">
                <div className="img">
                    <img src="https://i.ibb.co/4pjhRHx/Untitleyd-1.png" alt="" width={1850} height={2000}/>
                    {/* <embed src="https://i.ibb.co/ww53Yhy/image2535.png" type="" /> */}
                </div>
                <svg className="pfd-svg"  viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <svg className="AH" x={70} y={-35}>
                            <Horizon>

                            </Horizon>
                            <BlackOutlineWhiteLine d="M286 10, v50" />
                            <BlackOutlineWhiteLine d="M428 10, v50" />
                            <FMA />
                        </svg>
                    </g>
                    
                    
                    {/* <VSI /> */}
                 
                    <path className="gray-bg" d="M13 100, h100 v560 h -100 Z" /> 
                    <path className="gray-bg" d="M600 100, h100 v560 h-100 Z" />
                    <path className="gray-bg" d="M130 10, h450, v50, h-450 Z" />
                    <path className="gray-bg" d="M142 785, h412, c -103 -140, -306 -140, -412 0 Z" /> 
                    

                    {/* FMA lines */}
                    

                    <SpeedTape />
                    <CommandSpeed />
                    <SpeedScroller />
                    <MachGS />

                    
                    {/* <CommandAlt />
                    
                    
                    <Minimums />
                    <RadioAltimeter /> */}
                    <LateralDeviationScale />
                    <VerticalDeviationScale />
                </svg>
        
            </div>
            
          
        </>
    );
};

render(<PFD />);
