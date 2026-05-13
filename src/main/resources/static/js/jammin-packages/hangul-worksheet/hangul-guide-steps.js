export const HANGUL_GUIDE_STEPS = [
  {
    title: "환영합니다!",
    message:
      "초민정음 받아쓰기 페이지에 오신 것을 환영합니다. 단계별로 주요 기능들을 안내해드리겠습니다.",
    target: "#titleMain",
    action: "click",
  },
  {
    title: "문제 추가하기",
    message:
      "이 버튼을 클릭하면 새로운 받아쓰기 문제를 추가할 수 있습니다. 한글 문장을 입력하면 자동으로 자모로 분해됩니다.",
    target: "#addWordButton",
    action: "click",
  },
  {
    title: "옵션 선택",
    message: "여기서 어떤 자모를 숨길지 선택할 수 있습니다. 초성, 중성, 종성 중 원하는 것을 선택해보세요.",
    target: "#removeCombo",
    action: "change",
  },
  {
    title: "자모 선택",
    message: "체크박스를 통해 특정 자모들을 개별적으로 숨길 수 있습니다. 원하는 자모를 선택해보세요.",
    target: "#removeJa",
    action: "checkbox",
  },
  {
    title: "출력하기",
    message: "모든 설정이 완료되면 이 버튼을 클릭하여 받아쓰기 시험지를 출력할 수 있습니다.",
    target: "#printTest",
    action: "click",
  },
  {
    title: "완료!",
    message:
      "축하합니다! 이제 초민정음 받아쓰기 시스템을 자유롭게 사용하실 수 있습니다. 언제든지 상단의 '사용가이드' 버튼을 클릭하여 다시 확인할 수 있습니다.",
    target: null,
    action: "complete",
  },
];
