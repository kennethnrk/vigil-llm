import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import { IoHome } from "react-icons/io5";
import { FaArrowCircleRight, FaPencilAlt  } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDangerous } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

function ZoneSafety() {

  const [points, setPoints] = useState([]);
  const [rectangle, setRectangle] = useState([]);
  const navigate = useNavigate();


  const handleClick = (e) => {
    if (points.length >= 4) return; // stop after 4 clicks

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, { x, y }]);
  };

  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
  };



  return (
    <div className="h-full w-full flex bg-gray-100  p-5">
      <div className='w-1/6 pr-5 '>
        <button className='cursor-pointer w-full bg-white h-20 rounded-lg text-[#26a69a] text-2xl flex p-6 mb-5 font-semibold' onClick={() => navigate('/')}>
          <IoHome className='mr-6 mt-1' />
          Home
        </button>
        <div className='w-full bg-white h-20 rounded-lg text-2xl flex p-6 mb-5'>

        </div>
        <div className='w-full bg-white h-20 rounded-lg text-2xl flex p-6 mb-5'>

        </div>
      </div>
      <div className='w-3/6 '>
        <div className='w-full rounded-lg shadow-xl bg-white p-5'>
          <div className='w-full rounded-lg'>
            {!image ?
              (<Webcam

                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />) : (
                <div className="w-full h-full relative" onClick={handleClick}
                >

                  <img src={image} alt="Captured" className="w-full rounded-lg" />
                  <svg
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    {/* Draw dots */}
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r={4} fill="red" />
                    ))}

                    {/* Draw polygon only when 4 points selected */}
                    {points.length === 4 && (
                      <polygon
                        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="rgba(0, 128, 255, 0.3)"
                        stroke="blue"
                        strokeWidth="2"
                      />
                    )}
                  </svg>
                </div>
              )}
          </div>
        </div>
        <div className='w-full rounded-lg shadow-xl bg-white p-5 mt-5 text-[#26a69a] font-semibold text-2xl'>
        
Zone Detection: Detect unwated entry in dangerous Zones.

        </div>
      </div>
      <div className='w-2/6 pl-5'>

      {image? <button className='
         w-full bg-white h-20 rounded-lg text-green-300 text-2xl flex p-6 mb-5 font-semibold px-12'
          onClick={capture}>
          Image Captured Successfully <FaCircleCheck className='ml-8 mt-1'/></button> :
        (<button className='
        cursor-pointer w-full bg-white h-20 rounded-lg text-[#26a69a] text-2xl flex p-6 mb-5 font-semibold px-12'
          onClick={capture}>
          Capture zone to Annotate <FaArrowCircleRight className='ml-8 mt-1'/></button>)}

          {points.length === 4 ? <button className='
         w-full bg-white h-20 rounded-lg text-green-300 text-2xl flex p-6 mb-5 font-semibold px-12'
          onClick={capture}>
          Bounding box selected <FaCircleCheck className='ml-8 mt-1'/></button> :
        (<button className='
        w-full bg-white h-20 rounded-lg text-[#26a69a] text-2xl flex p-6 mb-5 font-semibold pl-8'
          onClick={capture}>
          Click on the image to Annotate <FaPencilAlt className='ml-4 mt-1'/></button>)}

      </div>

    </div>
  );
}

export default ZoneSafety;


