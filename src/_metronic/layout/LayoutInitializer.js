import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayoutSplashScreen } from "./LayoutContext";
import * as builder from "../ducks/builder";

/**
 * Used to synchronize current layout `menuConfig`, `layoutConfig` and
 * `htmlClassService` with redux store.
 */
export default function LayoutInitializer({
                                            children,
                                            menuConfig,
                                            layoutConfig,
                                            htmlClassService
                                          }) {
  const dispatch = useDispatch();
  const builderState = useSelector(({ builder }) => builder);

  useEffect(() => {
    dispatch(builder.actions.setMenuConfig(menuConfig));
  }, [dispatch, menuConfig]);

  useEffect(() => {
    if (layoutConfig.demo !== builderState.layoutConfig.demo) {
      dispatch(builder.actions.setLayoutConfigs(layoutConfig));
    }
  }, [dispatch, builderState, layoutConfig]);

  useEffect(() => {
    dispatch(builder.actions.setHtmlClassService(htmlClassService));
  }, [dispatch, htmlClassService]);

  return htmlClassService === builderState.htmlClassServiceObjects ? (
      // Render content when `htmlClassService` synchronized with redux store.
      <>{children}</>
  ) : (
      // Otherwise sow loading splash screen.
      <LayoutSplashScreen />
  );
}
