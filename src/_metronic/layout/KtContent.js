import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as builder from "../ducks/builder";

function KtContent({ children, contentContainerClasses }) {
  const match = useRouteMatch() || {};
  const animationEndClass = "kt-grid--animateContent-finished";
  const [cssClassesState, setCssClassesState] = useState([
    "kt-grid--animateContent",
    "kt-container",
    contentContainerClasses.split(" "),
    "kt-grid__item kt-grid__item--fluid",
    animationEndClass
  ]);

  useEffect(() => {
    // for animation start should toggle 'kt-grid--animateContent-finished' css class
    // TODO: change useMemo
    const fullClasses = [...cssClassesState];
    const startAnimation = fullClasses.filter(el => el !== animationEndClass);
    setCssClassesState(startAnimation);
    const timeOutId = setTimeout(() => {
      setCssClassesState(fullClasses);
    }, 200);

    return () => {
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.url]);

  return <div className={cssClassesState.join(" ")}>{children}</div>;
}

const mapStateToProps = store => ({
  contentContainerClasses: builder.selectors.getClasses(store, {
    path: "content_container",
    toString: true
  })
});

export default connect(mapStateToProps)(KtContent);
