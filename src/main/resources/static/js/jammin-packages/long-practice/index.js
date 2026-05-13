import { LongPracticeApp } from "./practice-app.js";
import { mountJamminGuide } from "../shared/guide-ui.js";
import { LONG_PRACTICE_GUIDE_STEPS } from "./long-guide-steps.js";

$(() => {
  new LongPracticeApp().init();
  mountJamminGuide({
    steps: LONG_PRACTICE_GUIDE_STEPS,
    totalSteps: LONG_PRACTICE_GUIDE_STEPS.length,
    storageKey: "jamminLongPracticeGuideCompleted",
  });
});
