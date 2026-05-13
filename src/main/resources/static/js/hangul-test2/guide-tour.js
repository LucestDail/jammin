// 가이드 시스템 변수들
var currentGuideStep = 1;
var totalGuideSteps = 6;
var guideSteps = [
    {
        title: "환영합니다!",
        message: "초민정음 받아쓰기 페이지에 오신 것을 환영합니다. 단계별로 주요 기능들을 안내해드리겠습니다.",
        target: "#titleMain",
        action: "click"
    },
    {
        title: "문제 추가하기",
        message: "이 버튼을 클릭하면 새로운 받아쓰기 문제를 추가할 수 있습니다. 한글 문장을 입력하면 자동으로 자모로 분해됩니다.",
        target: "#addWordButton",
        action: "click"
    },
    {
        title: "옵션 선택",
        message: "여기서 어떤 자모를 숨길지 선택할 수 있습니다. 초성, 중성, 종성 중 원하는 것을 선택해보세요.",
        target: "#removeCombo",
        action: "change"
    },
    {
        title: "자모 선택",
        message: "체크박스를 통해 특정 자모들을 개별적으로 숨길 수 있습니다. 원하는 자모를 선택해보세요.",
        target: "#removeJa",
        action: "checkbox"
    },
    {
        title: "출력하기",
        message: "모든 설정이 완료되면 이 버튼을 클릭하여 받아쓰기 시험지를 출력할 수 있습니다.",
        target: "#printTest",
        action: "click"
    },
    {
        title: "완료!",
        message: "축하합니다! 이제 초민정음 받아쓰기 시스템을 자유롭게 사용하실 수 있습니다. 언제든지 상단의 '사용가이드' 버튼을 클릭하여 다시 확인할 수 있습니다.",
        target: null,
        action: "complete"
    }
];

// 가이드 시스템 초기화
$(document).ready(function() {
    // 가이드 시작 버튼 클릭 이벤트
    $(document).on("click", "#guideStartBtn", function(e) {
        e.preventDefault();
        startGuide();
    });
    
    // 가이드 종료 버튼 클릭 이벤트
    $(document).on("click", "#guideCloseBtn", function() {
        endGuide();
    });
    
    // 가이드 다시시작 버튼 클릭 이벤트
    $(document).on("click", "#guideRestartBtn", function() {
        restartGuide();
    });
    
    // 단계별 점 클릭 이벤트
    $(document).on("click", ".guide-step-dot", function() {
        var step = parseInt($(this).data("step"));
        goToStep(step);
    });
});

// 가이드 시작
function startGuide() {
    currentGuideStep = 1;
    // 기존 이벤트 리스너 정리
    $("*").off("click.guide change.guide");
    $("#guideOverlay").show();
    showCurrentStep();
}

// 가이드 종료
function endGuide() {
    $("#guideOverlay").hide();
    clearGuideElements();
    markGuideCompleted();
    // 이벤트 리스너 정리
    $("*").off("click.guide change.guide");
}

// 가이드 다시시작
function restartGuide() {
    currentGuideStep = 1;
    showCurrentStep();
}

// 현재 단계 표시
function showCurrentStep() {
    clearGuideElements();
    
    if (currentGuideStep > totalGuideSteps) {
        endGuide();
        return;
    }
    
    var step = guideSteps[currentGuideStep - 1];
    
    // 진행률 업데이트
    $("#guideProgress").text("단계 " + currentGuideStep + " / " + totalGuideSteps);
    
    // 단계별 점 업데이트
    updateStepDots();
    
    if (step.target) {
        var targetElement = $(step.target);
        if (targetElement.length > 0) {
            // 타겟 요소 하이라이트
            highlightElement(targetElement);
            
            // 스티커 생성
            createSticker(targetElement, step);
            
            // 이벤트 리스너 추가
            addStepEventListener(targetElement, step);
        }
    } else {
        // 완료 단계
        createCompletionSticker(step);
    }
}

// 가이드 요소들 정리
function clearGuideElements() {
    $(".guide-highlight").remove();
    $(".guide-sticker").remove();
}

// 요소 하이라이트
function highlightElement(element) {
    var offset = element.offset();
    var width = element.outerWidth();
    var height = element.outerHeight();
    
    var highlight = $("<div class='guide-highlight'></div>");
    highlight.css({
        top: offset.top - 5,
        left: offset.left - 5,
        width: width + 10,
        height: height + 10
    });
    
    $("#guideOverlay").append(highlight);
}

// 스티커 생성
function createSticker(targetElement, step) {
    var offset = targetElement.offset();
    var width = targetElement.outerWidth();
    var height = targetElement.outerHeight();
    
    var sticker = $("<div class='guide-sticker'></div>");
    sticker.html(`
        <h4>${step.title}</h4>
        <p>${step.message}</p>
        <button class='guide-next-btn'>다음 단계</button>
    `);
    
    // 스티커 위치 조정
    var stickerTop = offset.top + height + 10;
    var stickerLeft = offset.left;
    
    // 화면 밖으로 나가지 않도록 조정 (더 큰 스티커 크기 고려)
    if (stickerTop + 200 > $(window).height()) {
        stickerTop = offset.top - 220;
    }
    if (stickerLeft + 400 > $(window).width()) {
        stickerLeft = $(window).width() - 420;
    }
    
    sticker.css({
        top: stickerTop,
        left: stickerLeft
    });
    
    $("#guideOverlay").append(sticker);
    
    // 다음 단계 버튼 이벤트
    sticker.find(".guide-next-btn").click(function() {
        nextStep();
    });
}

// 완료 스티커 생성
function createCompletionSticker(step) {
    var sticker = $("<div class='guide-sticker'></div>");
    sticker.html(`
        <h4>${step.title}</h4>
        <p>${step.message}</p>
        <button class='guide-next-btn'>완료</button>
    `);
    
    // 이전 단계의 위치를 유지하거나 화면 중앙에 배치
    var lastTarget = $(guideSteps[totalGuideSteps - 2].target);
    if (lastTarget.length > 0) {
        var offset = lastTarget.offset();
        var width = lastTarget.outerWidth();
        var height = lastTarget.outerHeight();
        
        // 이전 요소 근처에 배치하되, 화면 중앙으로 조정 (더 큰 스티커 크기 고려)
        var stickerTop = Math.max(offset.top + height + 10, $(window).height() / 2 - 120);
        var stickerLeft = Math.max(offset.left, $(window).width() / 2 - 200);
        
        // 화면 밖으로 나가지 않도록 조정
        if (stickerTop + 200 > $(window).height()) {
            stickerTop = $(window).height() / 2 - 120;
        }
        if (stickerLeft + 400 > $(window).width()) {
            stickerLeft = $(window).width() / 2 - 200;
        }
        
        sticker.css({
            top: stickerTop,
            left: stickerLeft,
            zIndex: "10008"
        });
    } else {
        // 기본값으로 화면 중앙에 배치
        sticker.css({
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10008"
        });
    }
    
    $("#guideOverlay").append(sticker);
    
    // 완료 버튼 이벤트
    sticker.find(".guide-next-btn").click(function() {
        endGuide();
    });
}

// 단계별 이벤트 리스너 추가
function addStepEventListener(targetElement, step) {
    var originalClick = targetElement.click;
    
    if (step.action === "click") {
        targetElement.off("click.guide").on("click.guide", function() {
            nextStep();
        });
    } else if (step.action === "change") {
        targetElement.off("change.guide").on("change.guide", function() {
            nextStep();
        });
    } else if (step.action === "checkbox") {
        targetElement.find("input[type='checkbox']").off("change.guide").on("change.guide", function() {
            nextStep();
        });
    }
}

// 다음 단계로 이동
function nextStep() {
    currentGuideStep++;
    showCurrentStep();
}

// 특정 단계로 이동
function goToStep(step) {
    currentGuideStep = step;
    showCurrentStep();
}

// 단계별 점 업데이트
function updateStepDots() {
    $(".guide-step-dot").removeClass("active completed");
    
    for (var i = 1; i <= totalGuideSteps; i++) {
        var dot = $(".guide-step-dot[data-step='" + i + "']");
        if (i < currentGuideStep) {
            dot.addClass("completed");
        } else if (i === currentGuideStep) {
            dot.addClass("active");
        }
    }
}

// 페이지 로드 시 가이드 상태 확인 (로컬 스토리지)
$(document).ready(function() {
    var guideCompleted = localStorage.getItem("guideCompleted");
    if (!guideCompleted) {
        // 첫 방문 시 자동으로 가이드 시작 (선택사항)
        // startGuide();
    }
});

// 가이드 완료 시 로컬 스토리지에 저장
function markGuideCompleted() {
    localStorage.setItem("guideCompleted", "true");
}
