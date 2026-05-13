/**
 * 받아쓰기 / 긴글연습 공통 온보딩 가이드
 * @param {{ steps: Array<{title:string,message:string,target:string|null,action:string}>, totalSteps: number, storageKey: string }} options
 */
export function mountJamminGuide(options) {
  const steps = options.steps;
  const totalSteps = options.totalSteps;
  const storageKey = options.storageKey;

  let currentGuideStep = 1;

  function markGuideCompleted() {
    localStorage.setItem(storageKey, "true");
  }

  function clearGuideElements() {
    $(".guide-highlight").remove();
    $(".guide-sticker").remove();
  }

  function highlightElement(element) {
    const offset = element.offset();
    const width = element.outerWidth();
    const height = element.outerHeight();
    const highlight = $("<div class='guide-highlight'></div>");
    highlight.css({
      top: offset.top - 5,
      left: offset.left - 5,
      width: width + 10,
      height: height + 10,
    });
    $("#guideOverlay").append(highlight);
  }

  function createSticker(targetElement, step) {
    const offset = targetElement.offset();
    const width = targetElement.outerWidth();
    const height = targetElement.outerHeight();
    const sticker = $("<div class='guide-sticker'></div>");
    sticker.html(
      "<h4>" +
        step.title +
        "</h4><p>" +
        step.message +
        "</p><button class='guide-next-btn' type='button'>다음 단계</button>",
    );
    let stickerTop = offset.top + height + 10;
    let stickerLeft = offset.left;
    if (stickerTop + 200 > $(window).height()) stickerTop = offset.top - 220;
    if (stickerLeft + 400 > $(window).width()) stickerLeft = $(window).width() - 420;
    sticker.css({ top: stickerTop, left: stickerLeft });
    $("#guideOverlay").append(sticker);
    sticker.find(".guide-next-btn").on("click", () => nextStep());
  }

  function createCompletionSticker(step) {
    const sticker = $("<div class='guide-sticker'></div>");
    sticker.html(
      "<h4>" +
        step.title +
        "</h4><p>" +
        step.message +
        "</p><button class='guide-next-btn' type='button'>완료</button>",
    );
    const lastTarget = $(steps[totalSteps - 2].target);
    if (lastTarget.length > 0) {
      const offset = lastTarget.offset();
      const width = lastTarget.outerWidth();
      const height = lastTarget.outerHeight();
      let stickerTop = Math.max(offset.top + height + 10, $(window).height() / 2 - 120);
      let stickerLeft = Math.max(offset.left, $(window).width() / 2 - 200);
      if (stickerTop + 200 > $(window).height()) stickerTop = $(window).height() / 2 - 120;
      if (stickerLeft + 400 > $(window).width()) stickerLeft = $(window).width() / 2 - 200;
      sticker.css({ top: stickerTop, left: stickerLeft, zIndex: "10008" });
    } else {
      sticker.css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "10008",
      });
    }
    $("#guideOverlay").append(sticker);
    sticker.find(".guide-next-btn").on("click", () => endGuide());
  }

  function addStepEventListener(targetElement, step) {
    if (step.action === "click") {
      targetElement.off("click.guide").on("click.guide", () => nextStep());
    } else if (step.action === "change") {
      targetElement.off("change.guide").on("change.guide", () => nextStep());
    } else if (step.action === "checkbox") {
      targetElement.find("input[type='checkbox']").off("change.guide").on("change.guide", () => nextStep());
    }
  }

  function updateStepDots() {
    $(".guide-step-dot").removeClass("active completed");
    for (let i = 1; i <= totalSteps; i++) {
      const dot = $(".guide-step-dot[data-step='" + i + "']");
      if (i < currentGuideStep) dot.addClass("completed");
      else if (i === currentGuideStep) dot.addClass("active");
    }
  }

  function showCurrentStep() {
    clearGuideElements();
    if (currentGuideStep > totalSteps) {
      endGuide();
      return;
    }
    const step = steps[currentGuideStep - 1];
    $("#guideProgress").text("단계 " + currentGuideStep + " / " + totalSteps);
    updateStepDots();
    if (step.target) {
      const targetElement = $(step.target);
      if (targetElement.length > 0) {
        highlightElement(targetElement);
        createSticker(targetElement, step);
        addStepEventListener(targetElement, step);
      }
    } else {
      createCompletionSticker(step);
    }
  }

  function startGuide() {
    currentGuideStep = 1;
    $("*").off("click.guide change.guide");
    $("#guideOverlay").show();
    showCurrentStep();
  }

  function endGuide() {
    $("#guideOverlay").hide();
    clearGuideElements();
    markGuideCompleted();
    $("*").off("click.guide change.guide");
  }

  function restartGuide() {
    currentGuideStep = 1;
    showCurrentStep();
  }

  function nextStep() {
    currentGuideStep++;
    showCurrentStep();
  }

  function goToStep(step) {
    currentGuideStep = step;
    showCurrentStep();
  }

  $(function () {
    $(document).on("click", "#guideStartBtn", function (e) {
      e.preventDefault();
      startGuide();
    });
    $(document).on("click", "#guideCloseBtn", function () {
      endGuide();
    });
    $(document).on("click", "#guideRestartBtn", function () {
      restartGuide();
    });
    $(document).on("click", ".guide-step-dot", function () {
      goToStep(parseInt($(this).data("step"), 10));
    });
  });
}
