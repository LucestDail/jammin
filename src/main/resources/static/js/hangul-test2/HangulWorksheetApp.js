import { buildHangulWrapperHtml } from "./HangulGlyphRenderer.js";

/**
 * test2 전용 — 받아쓰기 워크시트 UI (test.html 인라인 스크립트의 구조화 버전)
 */
export class HangulWorksheetApp {
  constructor() {
    this.lineBreakCount = 8;
    this.currentFontSize = 60;
    this.currentEditElement = null;
    this.currentRemoveCheck = "ja";
    this.orderingNumber = 0;
  }

  init() {
    $("#userInfo").hide();
    $("#printArea").hide();
    this.showJaCheck();
    $("#removeCombo").on("change", () => {
      const sel = $("#removeCombo").val();
      if (sel === "jaremove") this.showJaCheck();
      else if (sel === "choremove") this.showChoCheck();
      else if (sel === "jungremove") this.showJungCheck();
      else if (sel === "jongremove") this.showJongCheck();
    });

    this.bindCheckboxHandlers();
    this.bindWordListActions();
    this.bindModals();
    this.bindOrderToolbar();

    window.addEventListener("beforeprint", () => this.onBeforePrint());
    window.addEventListener("afterprint", () => this.onAfterPrint());
  }

  bindOrderToolbar() {
    $("#printTest").off("click.test2").on("click.test2", () => window.print());
  }

  bindCheckboxHandlers() {
    const self = this;
    $("input[type=checkbox]")
      .off("change.test2")
      .on("change.test2", function () {
        const $cb = $(this);
        if ($cb.val().includes("all")) {
          const allExt = $cb.val().split("-")[1];
          let alls = null;
          switch (allExt) {
            case "ja":
              alls = $("#removeJaPlus, #removeJa").find("input[type=checkbox]");
              break;
            case "cho":
              alls = $("#removeChoDouble, #removeCho").find("input[type=checkbox]");
              break;
            case "jung":
              alls = $("#removeJungPlus, #removeJung").find("input[type=checkbox]");
              break;
            case "jong":
              alls = $("#removeJongPlus, #removeJong").find("input[type=checkbox]");
              break;
            default:
              alls = null;
          }
          if (alls && alls.length) {
            if (this.checked) {
              for (let i = 1; i < alls.length; i++) {
                if (!alls[i].checked) $(alls[i]).trigger("click");
              }
            } else {
              for (let i = 1; i < alls.length; i++) {
                if (alls[i].checked) $(alls[i]).trigger("click");
              }
            }
          }
          self.syncCheckRemove();
        } else {
          let elements = null;
          let elementsExt = null;
          if ($cb.val().indexOf("_") === -1) {
            elements = $("." + $cb.val());
            if (this.checked) elements.each((_, item) => $(item).addClass("hidebox"));
            else elements.each((_, item) => $(item).removeClass("hidebox"));
          } else {
            if ($cb.val().includes("all")) return;
            elements = $("." + $cb.val().split("_")[0]);
            elementsExt = $("." + $cb.val().split("_")[1]);
            if (this.checked) {
              elements.each((_, item) => $(item).addClass("hidebox"));
              elementsExt.each((_, item) => $(item).addClass("hidebox"));
            } else {
              elements.each((_, item) => $(item).removeClass("hidebox"));
              elementsExt.each((_, item) => $(item).removeClass("hidebox"));
            }
          }
          self.syncCheckRemove();
        }
      });

    $("input[type=radio]")
      .off("change.test2")
      .on("change.test2", function () {
        document.querySelectorAll("input[type='checkbox']").forEach((c) => {
          c.checked = false;
        });
        document.querySelectorAll(".hidebox").forEach((el) => el.classList.remove("hidebox"));
      });
  }

  bindWordListActions() {
    const self = this;
    $("#wordList")
      .off("click.test2")
      .on("click.test2", "[data-hw-action]", function (e) {
        const action = $(this).data("hw-action");
        if (action === "toggle-glyph") {
          $(this).toggleClass("hidebox");
          return;
        }
        if (action === "order-up") {
          self.orderUpSide(this);
          return;
        }
        if (action === "order-down") {
          self.orderDownSide(this);
          return;
        }
        if (action === "edit-ready") {
          self.editTestReady(this);
          return;
        }
        if (action === "delete-row") {
          self.deleteTest(this);
        }
      });
  }

  bindModals() {
    const self = this;
    $("#requestWordButton")
      .off("click.test2")
      .on("click.test2", function () {
        const data = { requestWord: $("#requestWord").val() };
        $.ajax({
          type: "POST",
          url: "/addWord",
          dataType: "text",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
        })
          .done((resp) => {
            const jsonArray = JSON.parse(resp);
            if (resp === "" || jsonArray.length === 0) {
              toastr.warning("초민정음 관리자", "한글이 아니거나, 완성된 한글 단어가 아닌 문자가 포함되어있습니다.");
              return;
            }
            if (jsonArray.length > 16) {
              toastr.warning("초민정음 관리자", "16글자 이상의 문장은 추가할 수 없습니다.");
              return;
            }
            let hangulRowCount = $(".hangul-row").length;
            hangulRowCount += jsonArray.length < 9 ? 1 : 2;
            if (hangulRowCount > 20) {
              toastr.warning("초민정음 관리자", "학습지 전체 줄수는 20줄을 넘을 수 없습니다.");
              return;
            }
            toastr.success("초민정음 관리자", "문제 추가 완료");
            self.addTest(resp, $("#requestWord").val());
            $("#requestWord").val("");
          })
          .fail(() => toastr.error("초민정음 관리자", "문제 추가 실패"));
      });

    $("#editWordButton")
      .off("click.test2")
      .on("click.test2", function () {
        const data = { requestWord: $("#editWordValue").val() };
        $.ajax({
          type: "POST",
          url: "/addWord",
          dataType: "text",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
        })
          .done((resp) => {
            const jsonArray = JSON.parse(resp);
            if (resp === "" || jsonArray.length === 0) {
              toastr.warning("초민정음 관리자", "한글이 아니거나, 완성된 한글 단어가 아닌 문자가 포함되어있습니다.");
              return;
            }
            toastr.success("초민정음 관리자", "문제 수정 완료");
            self.editTest(resp, $("#editWordValue").val());
            $("#editWordValue").val("");
          })
          .fail(() => toastr.error("초민정음 관리자", "문제 수정 실패"));
      });
  }

  addTest(data, fullWord) {
    const jsonArray = JSON.parse(data);
    const html = buildHangulWrapperHtml({
      jsonArray,
      fullWord,
      ordering: this.orderingNumber++,
      profileKey: "editor",
      toolbar: "minimal",
    });
    $("#wordList").append(html);
    $("#requestWord").val("");
    this.syncCheckRemove();
    this.syncRadioRemove();
    this.syncFontConfig();
  }

  editTest(data, fullWord) {
    const jsonArray = JSON.parse(data);
    const ord = this.currentEditElement.parent().attr("ordering");
    const html = buildHangulWrapperHtml({
      jsonArray,
      fullWord,
      ordering: ord,
      profileKey: "editor",
      toolbar: "full",
    });
    this.currentEditElement.parent().remove();
    $("#wordList").append(html);
    $("#editWord").modal("toggle");
    $("#editWordValue").val("");
    this.syncCheckRemove();
    this.syncRadioRemove();
    this.syncFontConfig();
  }

  editTestReady(element) {
    $("#editWordValue").val($(element).parent().find(".fullWord").val());
    this.currentEditElement = $(element);
  }

  deleteTest(element) {
    $(element).parent().remove();
    this.syncHangulOrdering();
    this.syncTestNumber();
  }

  showJaCheck() {
    this.jaCheckControl(false);
    this.choCheckControl(true);
    this.jungCheckControl(true);
    this.jongCheckControl(true);
    this.currentRemoveCheck = "ja";
  }
  showChoCheck() {
    this.jaCheckControl(true);
    this.choCheckControl(false);
    this.jungCheckControl(true);
    this.jongCheckControl(true);
    this.currentRemoveCheck = "cho";
  }
  showJungCheck() {
    this.jaCheckControl(true);
    this.choCheckControl(true);
    this.jungCheckControl(false);
    this.jongCheckControl(true);
    this.currentRemoveCheck = "jung";
  }
  showJongCheck() {
    this.jaCheckControl(true);
    this.choCheckControl(true);
    this.jungCheckControl(true);
    this.jongCheckControl(false);
    this.currentRemoveCheck = "jong";
  }

  jaCheckControl(isHide) {
    if (isHide) {
      $("#removeJa").hide();
      $("#removeJaPlus").hide();
      $("#removeJaDouble").hide();
    } else {
      $("#removeJa").show();
      $("#removeJaPlus").show();
      $("#removeJaDouble").show();
    }
  }
  choCheckControl(isHide) {
    if (isHide) {
      $("#removeCho").hide();
      $("#removeChoDouble").hide();
    } else {
      $("#removeCho").show();
      $("#removeChoDouble").show();
    }
  }
  jungCheckControl(isHide) {
    if (isHide) {
      $("#removeJung").hide();
      $("#removeJungPlus").hide();
    } else {
      $("#removeJung").show();
      $("#removeJungPlus").show();
    }
  }
  jongCheckControl(isHide) {
    if (isHide) {
      $("#removeJong").hide();
      $("#removeJongPlus").hide();
      $("#removeJongDouble").hide();
    } else {
      $("#removeJong").show();
      $("#removeJongPlus").show();
      $("#removeJongDouble").show();
    }
  }

  syncCheckRemove() {
    document.querySelectorAll(".hidebox").forEach((el) => el.classList.remove("hidebox"));
    $("input[type=checkbox]:checked").each(function () {
      const $cb = $(this);
      if ($cb.val().indexOf("_") === -1) {
        const elements = $("." + $cb.val());
        if (this.checked) elements.each((_, item) => $(item).addClass("hidebox"));
        else elements.each((_, item) => $(item).removeClass("hidebox"));
      } else {
        const elements = $("." + $cb.val().split("_")[0]);
        const elementsExt = $("." + $cb.val().split("_")[1]);
        if (this.checked) {
          elements.each((_, item) => $(item).addClass("hidebox"));
          elementsExt.each((_, item) => $(item).addClass("hidebox"));
        } else {
          elements.each((_, item) => $(item).removeClass("hidebox"));
          elementsExt.each((_, item) => $(item).removeClass("hidebox"));
        }
      }
    });
  }

  syncRadioRemove() {
    const removeTarget = $("input[type=radio]:checked").val();
    if (removeTarget === "choremove") {
      document.querySelectorAll(".hangul.cho").forEach((el) => el.classList.add("hidebox"));
    } else if (removeTarget === "jungremove") {
      document.querySelectorAll(".hangul.jung").forEach((el) => el.classList.add("hidebox"));
    } else if (removeTarget === "jongremove") {
      document.querySelectorAll(".hangul.jong").forEach((el) => el.classList.add("hidebox"));
    }
  }

  syncFontConfig() {
    if (!this.currentFontSize) return;
    $(".hangul").each((_, item) => $(item).css("height", Number(this.currentFontSize)));
    $(".emptyWordSvg").each((_, item) => $(item).css("top", Number(this.currentFontSize)));
    $(".hangulSet").each((_, item) => $(item).css("width", Number(this.currentFontSize)));
    $(".hangul-row").each((_, item) => {
      let h;
      if (this.currentFontSize === 60) h = Number(this.currentFontSize) * 2;
      else if (this.currentFontSize === 120) h = Number(this.currentFontSize) * 2;
      else if (this.currentFontSize === 180) h = Number(this.currentFontSize) * 2.5;
      else h = Number(this.currentFontSize) * 2;
      $(item).css("height", h);
    });
    this.syncWordLineBreak();
  }

  syncHangulOrdering() {
    const divElements = document.getElementsByClassName("hangulWrapper");
    const divArray = Array.from(divElements);
    divArray.sort((a, b) => {
      return parseInt(a.getAttribute("ordering"), 10) - parseInt(b.getAttribute("ordering"), 10);
    });
    const parentContainer = divElements[0]?.parentNode;
    if (parentContainer) divArray.forEach((div) => parentContainer.appendChild(div));
  }

  syncWordLineBreak() {
    const self = this;
    $(".hangulWrapper").each(function () {
      const targetWordElement = $(this);
      const targetWordSentence = $(this).find(".fullWord").val();
      const targetWordOrdering = $(this).attr("ordering");
      $.ajax({
        type: "POST",
        url: "/addWord",
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ requestWord: targetWordSentence }),
      })
        .done((resp) => {
          const jsonArray = JSON.parse(resp);
          if (resp === "" || jsonArray.length === 0) return;
          const html = buildHangulWrapperHtml({
            jsonArray,
            fullWord: targetWordSentence,
            ordering: targetWordOrdering,
            profileKey: "compact",
            toolbar: "fullIndented",
            rowWrapperStyle: "",
          });
          $("#wordList").append(html);
          targetWordElement.remove();
          self.syncCheckRemove();
          self.syncRadioRemove();
          self.syncHangulOrdering();
          self.syncTestNumber();
        })
        .fail(() => {});
    });
  }

  syncPrintLineBreak() {
    $(".hangul-row").each((_, item) => $(item).removeClass("print-line-break"));
    let sizeCounter = 1;
    $(".hangul-row").each((_, item) => {
      if ($(item).offset().top / 880 > sizeCounter) {
        sizeCounter += 1;
        $(item).addClass("print-line-break");
      }
    });
  }

  syncTestNumber() {
    let orderCount = 1;
    $(".hangulWrapper").each((_, item) => $(item).find(".orderCount").remove());
    $(".hangulWrapper").each((_, item) => {
      $(item).prepend("<p class='orderCount' style='padding-top:10px;'>" + orderCount++ + ". </p>");
    });
  }

  orderUpSide(targetElement) {
    const currentOrderNumber = Number($(targetElement).parent().attr("ordering"));
    if (currentOrderNumber === 0) {
      toastr.warning("초민정음 관리자", "처음 문제입니다.");
      return;
    }
    $(targetElement).parent().attr("ordering", currentOrderNumber - 1);
    $(targetElement).parent().prev().attr("ordering", currentOrderNumber);
    this.syncHangulOrdering();
    this.syncTestNumber();
  }

  orderDownSide(targetElement) {
    const currentOrderNumber = Number($(targetElement).parent().attr("ordering"));
    if (currentOrderNumber === this.orderingNumber - 1) {
      toastr.warning("초민정음 관리자", "마지막 문제입니다.");
      return;
    }
    $(targetElement).parent().attr("ordering", currentOrderNumber + 1);
    $(targetElement).parent().next().attr("ordering", currentOrderNumber);
    this.syncHangulOrdering();
    this.syncTestNumber();
  }

  onBeforePrint() {
    $("#services").addClass("no-padding");
    $("#printArea").show();
    $("#addWordButton").hide();
    $("#printTest").hide();
    $("#titleMain").hide();
    $("#titleSub").hide();
    $("#mainNav").hide();
    $("#userInfo").show();
    $(".btn-edit").hide();
    $(".btn-delete").hide();
    $(".btn-orderup").hide();
    $(".btn-orderdown").hide();
    $("#removeJa").hide();
    $("#removeJaPlus").hide();
    $("#removeJaDouble").hide();
    $("#removeCho").hide();
    $("#removeChoDouble").hide();
    $("#removeJung").hide();
    $("#removeJungPlus").hide();
    $("#removeJong").hide();
    $("#removeJongPlus").hide();
    $("#removeJongDouble").hide();
    $("#btnRadio1-btn").hide();
    $("#btnRadio2-btn").hide();
    $("#btnRadio3-btn").hide();
    $("#btnRadio4-btn").hide();
    $("#btnRadio5-btn").hide();
    $("#fontConfigMenu").hide();
    $("#box1").hide();
    $("#box2").hide();
    $("#services-area").css("max-width", "100%");
    this.syncPrintLineBreak();
    toastr.remove();
    $(".container").addClass("beforePrintArea");
  }

  onAfterPrint() {
    $("#services").removeClass("no-padding");
    $("#printArea").hide();
    $("#addWordButton").show();
    $("#printTest").show();
    $("#titleMain").show();
    $("#titleSub").show();
    $("#mainNav").show();
    $("#userInfo").hide();
    $(".btn-edit").show();
    $(".btn-delete").show();
    $(".btn-orderup").show();
    $(".btn-orderdown").show();
    if (this.currentRemoveCheck === "ja") {
      $("#removeJa").show();
      $("#removeJaPlus").show();
      $("#removeJaDouble").show();
    } else if (this.currentRemoveCheck === "cho") {
      $("#removeCho").show();
      $("#removeChoDouble").show();
    } else if (this.currentRemoveCheck === "jung") {
      $("#removeJung").show();
      $("#removeJungPlus").show();
    } else if (this.currentRemoveCheck === "jong") {
      $("#removeJong").show();
      $("#removeJongPlus").show();
      $("#removeJongDouble").show();
    }
    $("#btnRadio1-btn").show();
    $("#btnRadio2-btn").show();
    $("#btnRadio3-btn").show();
    $("#btnRadio4-btn").show();
    $("#btnRadio5-btn").show();
    $("#fontConfigMenu").show();
    $("#box1").show();
    $("#box2").show();
    $(".container").removeClass("beforePrintArea");
    $("#services-area").css("max-width", "1320px");
  }
}

const app = new HangulWorksheetApp();
$(() => {
  app.init();
});
