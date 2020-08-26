import React, {useState} from 'react';
import FaQsNav from "./FAQsNav";
import {Collapse} from 'reactstrap'
const FaQsContent = () => {
  const [firstCollapse, setFirstCollapse] = useState(true);
  const [secondCollapse, setSecondCollapse] = useState(false);
  const [thirdCollapse, setThirdCollapse] = useState(false);
  return (
    <div className="kt-container  kt-grid__item kt-grid__item--fluid">
      <div className="kt-portlet kt-faq-v1">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              FAQ Example
            </h3>
          </div>
        </div>
        <div className="kt-portlet__body">
          <div className="row">
            <FaQsNav/>
            <div className="col-md-9">
              <div className="accordion accordion-solid accordion-toggle-plus">
                <div className="card">
                  <div className="card-header">
                    <div className={`card-title ${!firstCollapse && 'collapsed'}`} onClick={() => setFirstCollapse(!firstCollapse)}>
                      Updates and bug fixes are included in the cost of ALL items.
                    </div>
                  </div>
                    <Collapse isOpen={firstCollapse} >
                      <div className="card-body">
                        <p>
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has
                          been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type specimen book. It has survived not only five
                          centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy text ever
                          since the 1500s, when an unknown printer took a galley of
                        </p>
                        <p>
                          Type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                          also the leap into Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                          has survived not only five centuries, but also the leap into Lorem Ipsum has been the industry's
                          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                          leap into
                        </p>
                        <p>
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                          only five centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy
                          text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                          make a type specimen book. It has survived not only five centuries, but also the leap into Lorem
                          Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type specimen book. It has survived not only
                          five centuries, but also the leap into
                        </p>
                      </div>
                    </Collapse>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo" onClick={() => setSecondCollapse(!secondCollapse)}>
                    <div className={`card-title ${!secondCollapse && 'collapsed'}`}>
                      Impact on buyers who bought before the new item support policy.
                    </div>
                  </div>
                  <Collapse isOpen={secondCollapse} >
                    <div className="card-body">
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of
                      </p>
                      <p>
                        Type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                        also the leap into Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                        has survived not only five centuries, but also the leap into Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap into
                      </p>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also the leap into Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into
                      </p>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also the leap into Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into
                      </p>
                    </div>
                  </Collapse>
                </div>
                <div className="card">
                  <div className="card-header" onClick={() => setThirdCollapse(!thirdCollapse)}>
                    <div className={`card-title ${thirdCollapse && 'collapsed'}`}>
                      Extending and Renewing Item Support.
                    </div>
                  </div>
                  <Collapse isOpen={thirdCollapse} >
                    <div className="card-body">
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of
                      </p>
                      <p>
                        Type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                        also the leap into Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                        has survived not only five centuries, but also the leap into Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap into
                      </p>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also the leap into Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into
                      </p>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also the leap into Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into
                      </p>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FaQsContent;