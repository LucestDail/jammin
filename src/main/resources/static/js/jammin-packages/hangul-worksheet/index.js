import { HangulWorksheetApp } from "./worksheet-app.js";
import { mountJamminGuide } from "../shared/guide-ui.js";
import { HANGUL_GUIDE_STEPS } from "./hangul-guide-steps.js";

$(() => {
  new HangulWorksheetApp().init();
  mountJamminGuide({
    steps: HANGUL_GUIDE_STEPS,
    totalSteps: HANGUL_GUIDE_STEPS.length,
    storageKey: "jamminHangulGuideCompleted",
  });
});
