const processButtons = document.querySelectorAll("#process .button");
const processExplanations = document.querySelectorAll("#process .explanation");

processButtons.forEach((processButton, index) => {
  processButton.addEventListener("click", () => {
    for (let i = 0; i < processButtons.length; i++) {
      processButtons[i].classList.remove("active");
      processExplanations[i].classList.remove("active");
    }
    processButtons[index].classList.add("active");
    processExplanations[index].classList.add("active");
  });
});

const precedentBoxes = document.querySelectorAll("#precedent .box");
const precedentHiddenBoxes = document.querySelectorAll(
  "#precedent .hidden-box"
);

precedentBoxes.forEach((precedentBox, index) => {
  precedentBox.addEventListener("click", () => {
    precedentBox.classList.toggle("active");
    precedentHiddenBoxes[index].classList.toggle("active");
  });
});

const lastBox = document.querySelector("#precedent .box:nth-child(7)");
const lastHiddenBox = document.querySelector(
  "#precedent .hidden-box:last-child"
);
const foldButton = document.querySelector("#precedent .fold-button");
const foldButtonSpan = document.querySelector(
  "#precedent .fold-button > span:first-child"
);
const foldButtonIcon = document.querySelector("#precedent .fold-button i");
foldButton.addEventListener("click", () => {
  foldButton.classList.toggle("active");

  if (foldButton.classList.contains("active")) {
    foldButtonSpan.textContent = "접기";
    foldButtonIcon.classList.replace("fa-angle-down", "fa-angle-up");
    lastBox.classList.add("open");
    lastHiddenBox.classList.add("open");
  } else {
    foldButtonSpan.textContent = "더보기";
    foldButtonIcon.classList.replace("fa-angle-up", "fa-angle-down");
    lastBox.classList.remove("open");
    lastHiddenBox.classList.remove("open");
    lastHiddenBox.classList.remove("active");
  }
});

const separateMonthInput = document.getElementById("separate-month-input");
const stayYesLabel = document.getElementById("stay-y");
const stayRadio = document.querySelector("#stay-n input");
const stayNoLabel = document.getElementById("stay-n");
stayYesLabel.addEventListener("click", () => {
  separateMonthInput.value = "";
});

const NoChildLabel = document.getElementById("have-no-child");
const childLabel = document.getElementById("have-child");
const childRadio = document.querySelector("#have-child input");
const childrenInput = document.getElementById("children-input");
const childrenInputSubContainer = document.getElementById(
  "children-input-sub-container"
);
childrenInput.addEventListener("click", () => {
  childRadio.checked = true;
});
childrenInput.addEventListener("input", () => {
  const inputValue = parseInt(childrenInput.value);
  console.log(childrenInput.value);
  childrenInputSubContainer.innerHTML = "";
  if (!isNaN(inputValue)) {
    for (let i = 1; i <= inputValue; i++) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="number" class="child-input" oninput="calculateChildSupport()"/>세`;
      childrenInputSubContainer.appendChild(label);
    }
  }
});
NoChildLabel.addEventListener("click", () => {
  childrenInput.value = "";
  childrenInputSubContainer.innerHTML = "";
});

const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", function () {
  sliderValue.textContent = slider.value;
});

const calculatorBoxes = document.querySelectorAll("#calculator .box");
const calculatorHiddenBoxes = document.querySelectorAll(
  "#calculator .hidden-box"
);

calculatorBoxes.forEach((calculatorBox, index) => {
  calculatorBox.addEventListener("click", () => {
    calculatorBox.classList.toggle("active");
    calculatorHiddenBoxes[index].classList.toggle("active");
  });
});

const unit = 10000;

// 이혼 가능성
const spouseIntentionRadioInputs = document.querySelectorAll(
  'input[name="spouse-intention"]'
);
spouseIntentionRadioInputs.forEach((spouseIntentionRadioInput) => {
  spouseIntentionRadioInput.addEventListener("click", calculatePossibility);
});
const responsibilityCheckboxes = document.querySelectorAll(
  'input[name="responsibility"]'
);
responsibilityCheckboxes.forEach((responsibilityCheckbox) => {
  responsibilityCheckbox.addEventListener("click", forResponsibility);
});
const possibilityMessageP = document.getElementById("possibility-message");

function calculatePossibility() {
  let message;
  const checkedSpouseIntentionRadioInput = document.querySelector(
    'input[name="spouse-intention"]:checked'
  );
  const pid = checkedSpouseIntentionRadioInput.value;
  const checkedResponsibilityCheckboxes = document.querySelectorAll(
    'input[name="responsibility"]:checked'
  );
  let crs = [];
  checkedResponsibilityCheckboxes.forEach((checkedResponsibilityCheckbox) => {
    crs.push(parseInt(checkedResponsibilityCheckbox.value));
  });
  if (pid == "y") {
    message =
      "양측이 모두 이혼을 원하는 상태이므로 재산분할이나 양육자 지정 등의 문제만 없으면 원만하게 이혼절차가 진행될 수 있습니다.";
  } else {
    if (crs.includes(3)) {
      if (crs.includes(5)) {
        message =
          "다툼이 있겠지만 증거들을 잘 수집했으면 이혼이 가능할 것으로 보입니다.";
      } else if (crs.includes(1) || crs.includes(2) || crs.includes(4)) {
        message = "소송으로 진행하면 이혼이 어렵지 않을 듯합니다.";
      } else if (
        crs.includes(6) ||
        crs.includes(7) ||
        crs.includes(8) ||
        crs.includes(9)
      ) {
        message =
          "서로가 책임이 있어 소송이 원활할 것 같지 않지만 상대의 잘못을 보다 명확히 증거로 제출한다면 이혼이 성립할 수도 있을 듯합니다.";
      } else {
        message =
          "상대가 있는 다툼이고 원하는 바가 다르니 결혼생활의 유지가 어려운 이유를 설득할 수 있는 구체적으로 증거와 자료가 있다면 소송이 유리할 듯합니다. ";
      }
    } else if (
      crs.includes(6) ||
      crs.includes(7) ||
      crs.includes(8) ||
      crs.includes(9)
    ) {
      message = "파탄의 책임이 본인에게 있어 이혼소송이 진행되기 어렵습니다.";
      if (
        crs.includes(1) ||
        crs.includes(2) ||
        crs.includes(3) ||
        crs.includes(4) ||
        crs.includes(5)
      ) {
        message =
          "서로가 책임이 있어 소송이 원활할 것 같지 않지만 상대의 잘못을 보다 명확히 증거로 제출한다면 이혼이 성립할 수도 있을 듯합니다.";
      }
    } else {
      message =
        "상대가 있는 다툼이고 원하는 바가 다르니 결혼생활의 유지가 어려운 이유를 설득할 수 있는 구체적으로 증거와 자료가 있다면 소송이 유리할 듯합니다. ";
    }
  }
  possibilityMessageP.textContent = message;
}

// 재산분할
const yearInput = document.getElementById("year-input");
const monthInput = document.getElementById("month-input");
yearInput.addEventListener("input", calculatePropertySplit);
monthInput.addEventListener("input", calculatePropertySplit);
separateMonthInput.addEventListener("input", calculatePropertySplit);
separateMonthInput.addEventListener("click", () => {
  stayRadio.checked = true;
});
const beforeSelfPropertyInput = document.getElementById("before-self-property");
beforeSelfPropertyInput.addEventListener("input", calculatePropertySplit);
const beforeSpousePropertyInput = document.getElementById(
  "before-spouse-property"
);
beforeSpousePropertyInput.addEventListener("input", calculatePropertySplit);
const currentTotalPropertyInput = document.getElementById(
  "current-total-property"
);
currentTotalPropertyInput.addEventListener(
  "input",
  forCurrentTotalPropertyInput
);
const sliderInput = document.getElementById("slider");
sliderInput.addEventListener("input", calculatePropertySplit);
const propertySplitSpan = document.getElementById("property-split");
const additionalP = document.querySelector("#calculator .additional");

function calculatePropertySplit() {
  let year = parseInt(yearInput.value);
  let month = monthInput.value;
  let separateMonth = parseInt(separateMonthInput.value);
  if (!isNaN(month)) {
    if (month === "") {
      month = 0;
    } else {
      month = parseInt(month);
    }
  }
  const cp = parseInt(currentTotalPropertyInput.value);
  const amp = year * 12 + month - separateMonth;
  const mpp = parseInt(beforeSelfPropertyInput.value);
  const ppp = parseInt(beforeSpousePropertyInput.value);
  const cpr = parseInt(sliderInput.value) / 100;
  let pdc;
  additionalP.style.display = "none";
  if (amp >= 16 * 12) {
    if (ppp >= 100 * unit) {
      pdc = cp * 0.1;
    } else if (ppp >= 80 * unit) {
      pdc = cp * 0.2;
    } else if (ppp >= 40 * unit) {
      pdc = cp * 0.3;
    } else if (ppp >= 20 * unit) {
      pdc = cp * 0.4;
    } else {
      pdc = cp * 0.5;
    }
  } else if (amp >= 8 * 12) {
    if (cpr >= 0.5) {
      if (ppp >= 15 * unit) {
        pdc = cp * 0.3;
      } else if (ppp >= 3 * unit) {
        pdc = cp * 0.45;
      } else {
        pdc = cp * cpr;
      }
    } else {
      if (ppp >= 3 * unit) {
        pdc = (cp - (ppp - 3 * unit)) * 0.35;
      } else {
        pdc = cp * 0.4;
      }
    }
  } else if (amp >= 3 * 12) {
    if (cpr >= 0.5) {
      if (ppp >= 10 * unit) {
        pdc = cp * 0.25;
      } else if (ppp >= 3 * unit) {
        pdc = cp * 0.45;
      } else {
        pdc = cp * cpr;
      }
    } else {
      if (ppp >= 3 * unit) {
        pdc = (cp - (ppp - 3 * unit)) * 0.3;
      } else {
        pdc = cp * 0.35;
      }
    }
  } else {
    if (cpr == 0) {
      console.log("mpp+ppp");
      console.log(mpp + ppp);
      console.log("before");
      console.log(cp - (mpp + ppp));
      pdc = (cp - (mpp + ppp)) * 0.3;
    } else {
      pdc = (cp - (mpp + ppp)) * cpr;
    }
    additionalP.style.display = "block";
  }
  propertySplitSpan.textContent = pdc.toLocaleString("ko-KR") + " 만원";
}

const compensationTextP = document.getElementById("compensation-text");
const compensationSpan = document.getElementById("compensation");
const compensationMessageP = document.getElementById("compensation-message");

function calculateCompensation() {
  const checkedResponsibilityCheckboxes = document.querySelectorAll(
    'input[name="responsibility"]:checked'
  );
  let crs = [];
  checkedResponsibilityCheckboxes.forEach((checkedResponsibilityCheckbox) => {
    crs.push(parseInt(checkedResponsibilityCheckbox.value));
  });
  const cp = parseInt(currentTotalPropertyInput.value);

  let compensationMessage;
  if (crs.includes(1) || crs.includes(5)) {
    if (cp >= 50 * unit) {
      compensationTextP.style.display = "block";
      compensationSpan.textContent = "1 억원";
      compensationMessage =
        "생각보다 크지 않을 수 있지만 우리나라 판례에서는 위자료가 1억을 넘는 경우는 거의 없습니다.";
    } else if (cp >= 12 * unit) {
      compensationTextP.style.display = "block";
      compensationSpan.textContent = "5,000 만원";
      compensationMessage = "배우자의 파탄의 책임이 명백하게 밝혀져야 합니다.";
    } else if (cp >= 5 * unit) {
      compensationTextP.style.display = "block";
      compensationSpan.textContent = "3,000 만원";
      compensationMessage =
        "위자료는 피해에 대한 책임의 의미입니다. 그래서 배우자의 파탄의 책임을 자세히 밝혀야 합니다.";
    } else if (cp >= 2 * unit) {
      compensationTextP.style.display = "block";
      compensationSpan.textContent = "2,000 만원";
      compensationMessage =
        "판례를 보면 위자료는 1천만원과 3천만원 사이에서 결정됩니다. 배우자의 책임이 명백하고 재산이 크지 않은 경우 통상 2천만원 정도로 결정됩니다.";
    } else {
      compensationTextP.style.display = "block";
      compensationSpan.textContent = "1,000 만원";
      compensationMessage =
        "결혼생활의 파탄에 배우자의 책임이 크더라도 현재 가지고 있는 재산과 형편에 따라 위자료는 결정됩니다.";
    }
  } else if (crs.includes(2) || crs.includes(3) || crs.includes(4)) {
    compensationTextP.style.display = "none";
    compensationMessage =
      "위자료는 부부관계를 파탄 낸 상대에 대한 보상의 의미입니다. 명백한 배우자의 잘못을 규명하지 못하면 위자료를 받기 어렵습니다.";
    if (
      crs.includes(6) ||
      crs.includes(7) ||
      crs.includes(8) ||
      crs.includes(9)
    ) {
      compensationTextP.style.display = "none";
      compensationMessage =
        "위자료는 피해에 대한 배상의 성격입니다. 귀책사유에서 다툼이 있는 경우, 그러니까 성격 차이에 따른 부부싸움이나 서로의 결함 때문에 결혼생활의 유지가 어렵다고 판단되는 경우 위자료는 선고되지 않을 가능성이 높습니다.";
    }
  }
  compensationMessageP.textContent = compensationMessage;
}

function forResponsibility() {
  calculateCompensation();
  calculatePossibility();
}

function forCurrentTotalPropertyInput() {
  calculatePropertySplit();
  calculateCompensation();
}

const childSupportResultBox = document.getElementById(
  "child-support-result-box"
);
const selfSalaryInput = document.getElementById("self-salary");
selfSalaryInput.addEventListener("input", calculateChildSupport);
const spouseSalaryINput = document.getElementById("spouse-salary");
spouseSalaryINput.addEventListener("input", calculateChildSupport);
const childSupportData = [
  [
    621000, 752000, 945000, 1098000, 1245000, 1401000, 1582000, 1789000,
    1997000, 2095000, 2207000,
  ],
  [
    631000, 759000, 949000, 1113000, 1266000, 1422000, 1598000, 1807000,
    2017000, 2116000, 2245000,
  ],
  [
    648000, 767000, 959000, 1140000, 1292000, 1479000, 1614000, 1850000,
    2065000, 2137000, 2312000,
  ],
  [
    667000, 782000, 988000, 1163000, 1318000, 1494000, 1630000, 1887000,
    2137000, 2180000, 2405000,
  ],
  [
    679000, 790000, 998000, 1280000, 1423000, 1598000, 1711000, 1984000,
    2159000, 2223000, 2476000,
  ],
  [
    703000, 957000, 1277000, 1402000, 1604000, 1794000, 1964000, 2163000,
    2246000, 2540000, 2883000,
  ],
];
function calculateChildSupport() {
  const mi = parseInt(selfSalaryInput.value);
  const pi = parseInt(spouseSalaryINput.value);
  const ci = mi + pi;
  const sr = pi / ci;

  let ciIndex = 0;
  if (ci >= 1200) {
    ciIndex = 10;
  } else if (ci >= 1000) {
    ciIndex = 9;
  } else if (ci >= 900) {
    ciIndex = 8;
  } else if (ci >= 800) {
    ciIndex = 7;
  } else if (ci >= 700) {
    ciIndex = 6;
  } else if (ci >= 600) {
    ciIndex = 5;
  } else if (ci >= 500) {
    ciIndex = 4;
  } else if (ci >= 400) {
    ciIndex = 3;
  } else if (ci >= 300) {
    ciIndex = 2;
  } else if (ci >= 200) {
    ciIndex = 1;
  }
  childSupportResultBox.innerHTML = "";

  const childInputs = document.querySelectorAll(".child-input");
  childInputs.forEach((childInput, index) => {
    const age = parseInt(childInput.value);
    let ageIndex = 0;
    if (15 <= age && age < 18) {
      ageIndex = 5;
    } else if (age >= 12) {
      ageIndex = 4;
    } else if (age >= 9) {
      ageIndex = 3;
    } else if (age >= 6) {
      ageIndex = 2;
    } else if (age >= 3) {
      ageIndex = 1;
    }
    let message = "";
    if (index == 0) {
      message = "첫";
    } else if (index == 1) {
      message = "두";
    } else if (index == 2) {
      message = "세";
    } else if (index == 3) {
      message = "네";
    } else if (index == 4) {
      message = "다섯";
    } else if (index == 5) {
      message = "여섯";
    }

    message = message.concat(
      " 번째 자녀를 위해 배우자로부터 받을 수 있는 월 양육비는 <span>"
    );

    const fc = childSupportData[ageIndex][ciIndex];
    const cc = Math.floor(fc * sr).toLocaleString("ko-KR");
    message = message + cc;
    message = message.concat(" 원</span> 입니다.");
    const paragraph = document.createElement("p");
    paragraph.innerHTML = message;
    childSupportResultBox.appendChild(paragraph);
  });
}

const labels = [
  "'22.06",
  "'22.07",
  "'22.08",
  "'22.09",
  "'22.10",
  "'22.11",
  "'22.12",
  "'23.01",
  "'23.02",
  "'23.03",
];

const divorceData1 = [
  7585, 7534, 8226, 8162, 7466, 8498, 7821, 7251, 7228, 8255,
];
const divorceData2 = [
  -13.2, -9.3, -1.8, -2.4, -3.1, -3.1, -10.4, -1.4, 1.3, 4.7,
];

const ctx = document.querySelector("#my-divorce-chart canvas").getContext("2d");

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "전년동월대비",
        data: divorceData2,
        type: "line",
        fill: false,
        borderColor: "#9fa4ac",
        tension: 0.1,
        yAxisID: "y2",
      },
      {
        label: "월간",
        data: divorceData1,
        backgroundColor: "#5379dd",
        yAxisID: "y1",
        barPercentage: 0.4,
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Move the legends to the bottom
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            if (datasetLabel) {
              return `${datasetLabel}: ${value}`;
            }
            return null;
          },
        },
      },
    },
    scales: {
      y1: {
        display: true,
        position: "left",
        title: {
          display: true,
          text: "월간",
        },
        max: Math.max(...divorceData1) * 1.4,
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
      y2: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "전년동월대비",
        },
        max: Math.max(...divorceData2) * 1.8,
        grid: {
          drawBorder: false,
        },
      },
    },
  },
});

const marriageData1 = [
  14897, 14947, 15718, 14748, 15832, 17455, 19883, 17926, 17846, 18192,
];
const marriageData2 = [
  1.49, 1.49, 1.57, 1.47, 1.58, 1.75, 1.99, 1.79, 1.78, 1.82,
];
const marriageCtx = document
  .querySelector("#my-marriage-chart canvas")
  .getContext("2d");

const marriageChart = new Chart(marriageCtx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "전년동월대비",
        data: marriageData2,
        type: "line",
        fill: false,
        borderColor: "#9fa4ac",
        tension: 0.1,
        yAxisID: "y2",
      },
      {
        label: "월간",
        data: marriageData1,
        backgroundColor: "#5379dd",
        yAxisID: "y1",
        barPercentage: 0.4,
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Move the legends to the bottom
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            if (datasetLabel) {
              return `${datasetLabel}: ${value}`;
            }
            return null;
          },
        },
      },
    },
    scales: {
      y1: {
        display: true,
        position: "left",
        title: {
          display: true,
          text: "월간",
        },
        max: Math.max(...marriageData1) * 1.4,
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
      y2: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "전년동월대비",
        },
        max: Math.max(...marriageData2) * 1.8,
        grid: {
          drawBorder: false,
        },
      },
    },
  },
});

const marriageButton = document.querySelector(
  "#statistics .graph > div:first-child > div:first-child"
);
const divorceButton = document.querySelector(
  "#statistics .graph > div:first-child > div:last-child"
);
const marriageCanvasDiv = document.getElementById("my-marriage-chart");
const divorceCanvasDiv = document.getElementById("my-divorce-chart");
marriageButton.addEventListener("click", () => {
  divorceButton.classList.remove("active");
  marriageButton.classList.add("active");
  marriageCanvasDiv.style.display = "block";
  divorceCanvasDiv.style.display = "none";
});
divorceButton.addEventListener("click", () => {
  divorceButton.classList.add("active");
  marriageButton.classList.remove("active");
  marriageCanvasDiv.style.display = "none";
  divorceCanvasDiv.style.display = "block";
});

const relatedBox = document.querySelector("#statistics .related");

// Allow scrolling with the mouse
relatedBox.addEventListener("wheel", function (event) {
  event.preventDefault();
  relatedBox.scrollLeft += event.deltaY;
});
