import React, { useState } from "react";
import { ReactComponent as SvgArrow } from "../../images/icons/arrow.svg";

const Collapse = () => {
  const [show, setShow] = useState(false);
  const [innershow, setInnershow] = useState(false);

  return (
    <div className="collapse_container border border-color_violet rounded">
      <div className="main-heading py-2 px-2" onClick={() => setShow(!show)}>
        <summary className="flex text-[18px] pl-2 py-2 font-abold">
          Click to expand
          {show ? (
            <SvgArrow className="rotate-90 duration-100 text-xxl fill-color_violet self-center" />
          ) : (
            <SvgArrow className=" fill-color_violet self-center" />
          )}
        </summary>
      </div>
      {show && (
        <div
          className="main-heading pl-6 pb-2 flex"
          onClick={() => setInnershow(!innershow)}
        >
          Details
          {innershow ? (
            <div>
              <SvgArrow className="rotate-90 duration-100 text-xl fill-color_violet self-center" />
              <div className="main-heading mt-[-10px] pb-2">
                <ol className="ml-0">Test 1</ol>
                <li>List 1</li>
                <li>List 2</li>
              </div>
            </div>
          ) : (
            <SvgArrow className=" fill-color_violet self-center" />
          )}
        </div>
      )}
    </div>
  );
};
export default Collapse;
