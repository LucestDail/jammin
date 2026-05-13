function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * 긴글 연습 페이지 (practice.html 로직 패키지화)
 */
export class LongPracticeApp {
  constructor() {
    this.currentFontSize = null;
    this.currentEditElement = null;
    this.orderingNumber = 0;
  }

  init() {
    $("#userInfo").hide();
    $("#printArea").hide();
    $("#printTest").off("click.jamminLp").on("click.jamminLp", () => window.print());
    this.bindSentenceListActions();
    this.bindModals();
    window.addEventListener("beforeprint", () => this.onBeforePrint());
    window.addEventListener("afterprint", () => this.onAfterPrint());
  }

  buildSentenceRowsHtml(lines) {
    let html = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const ord = this.orderingNumber++;
      html += "<div class='sentence-set d-flex' ordering='" + ord + "'>";
      html += "<input class='fullWord' type='hidden' value='" + escapeAttr(line) + "'>";
      html += "<p class='sentence text-black-50 opacity-40 h1'>" + escapeHtml(line) + "</p>";
      html +=
        "<button class='btn rounded-0 btn-orderup' type='button' title='Up' data-lp-action='order-up'><i class='fas fa-arrow-up'></i></button>";
      html +=
        "<button class='btn rounded-0 btn-orderdown' type='button' title='Down' data-lp-action='order-down'><i class='fas fa-arrow-down'></i></button>";
      html +=
        "<button class='btn rounded-0 btn-edit' type='button' title='Edit' data-bs-toggle='modal' data-bs-target='#editSentence' data-lp-action='edit-ready'><i class='fa fa-edit'></i></button>";
      html +=
        "<button class='btn rounded-0 btn-delete' type='button' title='Delete' data-lp-action='delete'><i class='fa fa-trash'></i></button>";
      html += "</div>";
    }
    return html;
  }

  bindSentenceListActions() {
    const self = this;
    $("#sentenceList")
      .off("click.jamminLp")
      .on("click.jamminLp", "[data-lp-action]", function () {
        const act = $(this).data("lp-action");
        if (act === "order-up") self.orderUpSide(this);
        else if (act === "order-down") self.orderDownSide(this);
        else if (act === "edit-ready") self.editSentenceReady(this);
        else if (act === "delete") self.deleteSentence(this);
      });
  }

  bindModals() {
    const self = this;
    $("#requestSentenceButton")
      .off("click.jamminLp")
      .on("click.jamminLp", function () {
        let raw = $("#requestSentence").val();
        raw = raw.replace(/\n\r?/g, "<br/>");
        const parts = raw.split("<br/>");
        const html = self.buildSentenceRowsHtml(parts);
        $("#sentenceList").append(html);
        $("#requestSentence").val("");
        self.syncFontConfig();
      });

    $("#editSentenceButton")
      .off("click.jamminLp")
      .on("click.jamminLp", function () {
        let raw = $("#editSentenceValue").val();
        raw = raw.replace(/\n\r?/g, "<br/>");
        const parts = raw.split("<br/>");
        const html = self.buildSentenceRowsHtml(parts);
        self.currentEditElement.parent().after(html);
        self.currentEditElement.parent().remove();
        $("#editSentence").modal("toggle");
        $("#editSentenceValue").val("");
        self.syncFontConfig();
      });

    $("#fontConfigButton")
      .off("click.jamminLp")
      .on("click.jamminLp", function () {
        const v = Number($("#fontSize").val());
        if (v < 10 || v > 120) {
          toastr.warning("초민정음 관리자", "10 이상 120 이하로 설정 가능합니다.");
          return;
        }
        self.currentFontSize = v;
        $(".sentence").each((_, item) => $(item).css("font-size", v));
        $("#fontConfig").modal("toggle");
        $("#fontSize").val("");
      });
  }

  deleteSentence(el) {
    $(el).parent().remove();
  }

  editSentenceReady(el) {
    $("#editSentenceValue").val($(el).parent().find(".fullWord").val());
    this.currentEditElement = $(el);
  }

  syncFontConfig() {
    if (this.currentFontSize == null) return;
    $(".sentence").each((_, item) => $(item).css("font-size", Number(this.currentFontSize)));
  }

  orderUpSide(targetElement) {
    const currentOrderNumber = Number($(targetElement).parent().attr("ordering"));
    if (currentOrderNumber === 0) {
      toastr.warning("초민정음 관리자", "처음 문제입니다.");
      return;
    }
    $(targetElement).parent().attr("ordering", currentOrderNumber - 1);
    $(targetElement).parent().prev().attr("ordering", currentOrderNumber);
    this.syncOrdering();
  }

  orderDownSide(targetElement) {
    const currentOrderNumber = Number($(targetElement).parent().attr("ordering"));
    if (currentOrderNumber === this.orderingNumber - 1) {
      toastr.warning("초민정음 관리자", "마지막 문제입니다.");
      return;
    }
    $(targetElement).parent().attr("ordering", currentOrderNumber + 1);
    $(targetElement).parent().next().attr("ordering", currentOrderNumber);
    this.syncOrdering();
  }

  syncOrdering() {
    const divElements = document.getElementsByClassName("sentence-set");
    if (!divElements.length) return;
    const divArray = Array.from(divElements);
    divArray.sort((a, b) => {
      return parseInt(a.getAttribute("ordering"), 10) - parseInt(b.getAttribute("ordering"), 10);
    });
    const parentContainer = divElements[0].parentNode;
    divArray.forEach((div) => parentContainer.appendChild(div));
  }

  onBeforePrint() {
    $("#services").addClass("no-padding");
    $("#printArea").show();
    $("#titleMain").hide();
    $("#addSentenceButton").hide();
    $("#printTest").hide();
    $("#titleSub").hide();
    $("#mainNav").hide();
    $("#userInfo").show();
    $(".btn-edit").hide();
    $(".btn-delete").hide();
    $(".btn-orderup").hide();
    $(".btn-orderdown").hide();
    $("#fontConfigModalButton").hide();
    $(".container").addClass("beforePrintArea");
  }

  onAfterPrint() {
    $("#services").removeClass("no-padding");
    $("#printArea").hide();
    $("#titleMain").show();
    $("#addSentenceButton").show();
    $("#printTest").show();
    $("#titleSub").show();
    $("#mainNav").show();
    $("#userInfo").hide();
    $(".btn-edit").show();
    $(".btn-delete").show();
    $(".btn-orderup").show();
    $(".btn-orderdown").show();
    $("#fontConfigModalButton").show();
    $(".container").removeClass("beforePrintArea");
  }
}
