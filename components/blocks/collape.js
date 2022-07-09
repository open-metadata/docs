import React, { useState } from "react";
import { ReactComponent as SvgArrow } from "../../images/icons/arrow.svg";

const Collapse = ({ title, children }) => {
  
  const [show, setShow] = useState(false);

  return (
    <section>
      <div className="collapse_container border border-color_violet rounded">
        <div className="main-heading py-2 px-2" onClick={() => setShow(!show)}>
          <summary className="flex text-[18px] pl-2 py-2 font-abold">
            {title}
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
          >
            <section>{children}</section>
            
          </div>
        )}
      </div>
    </section>
  );
};
export default Collapse;
