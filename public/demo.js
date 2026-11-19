const mobileViewport = window.matchMedia("(max-width: 700px)");
const menuButton = document.querySelector(".menu-button");
const navigation = document.getElementById("nav");

function setMenuOpen(open) {
  navigation.hidden = mobileViewport.matches && !open;
  menuButton.setAttribute("aria-expanded", String(open));
}

function updateNavigation() {
  menuButton.hidden = !mobileViewport.matches;
  setMenuOpen(false);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(navigation.hidden);
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link && mobileViewport.matches) {
    setMenuOpen(false);
    const destination = document.querySelector(link.hash);
    destination.setAttribute("tabindex", "-1");
    destination.focus({ preventScroll: true });
  }
});

document.querySelector(".header").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileViewport.matches && !navigation.hidden) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileViewport.addEventListener("change", updateNavigation);
updateNavigation();

const lanes = {
  entry: [
    {
      title: "Chờ quẹt thẻ",
      message: "Bấm “Quẹt thẻ mẫu” để bắt đầu lượt xe vào.",
      action: "Quẹt thẻ mẫu"
    },
    {
      title: "Chờ bảo vệ xác nhận",
      message: "Thẻ mẫu hợp lệ. Ảnh tại làn vào đã được ghi nhận để đối chiếu khi xe ra.",
      action: "Xác nhận xe vào"
    },
    {
      title: "Đã ghi nhận xe vào",
      message: "Lượt gửi đã bắt đầu. Xe được thêm vào danh sách đang trong bãi.",
      action: "Thử lượt mới"
    }
  ],
  exit: [
    {
      title: "Chờ quẹt thẻ",
      message: "Làn ra dùng một thẻ mẫu đã có lượt gửi đang mở.",
      action: "Quẹt thẻ mẫu"
    },
    {
      title: "Chờ đối chiếu và xác nhận",
      message: "Đã tìm thấy lượt gửi. Bảo vệ đối chiếu ảnh lúc vào với xe ở cổng ra và kiểm tra phí.",
      action: "Xác nhận xe ra"
    },
    {
      title: "Đã hoàn tất lượt gửi",
      message: "Giờ ra và ảnh tại cổng ra được ghi vào lịch sử. Xe rời danh sách đang trong bãi.",
      action: "Thử lượt mới"
    }
  ]
};

const consolePanel = document.querySelector(".demo-console");
const lanePicker = document.querySelector(".lane-picker");
const demoTitle = document.getElementById("demo-title");
const demoText = document.getElementById("demo-text");
const demoIcon = document.getElementById("demo-icon");
const nextButton = document.getElementById("demo-next");
const resetButton = document.getElementById("demo-reset");
const progress = document.querySelectorAll(".demo-progress li");
const stepIcons = ["#i-card", "#i-camera", "#i-shield"];
let step = 0;

function renderDemo() {
  const selectedLane = lanePicker.querySelector("input:checked").value;
  const state = lanes[selectedLane][step];
  consolePanel.dataset.demoStep = String(step);
  demoTitle.textContent = state.title;
  demoText.textContent = state.message;
  demoIcon.setAttribute("href", stepIcons[step]);
  nextButton.textContent = state.action;
  resetButton.disabled = step === 0;

  progress.forEach((item, index) => {
    item.toggleAttribute("data-reached", index < step);
    if (index === step) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function resetDemo() {
  step = 0;
  renderDemo();
}

lanePicker.addEventListener("change", resetDemo);
nextButton.addEventListener("click", () => {
  step = (step + 1) % stepIcons.length;
  renderDemo();
});
resetButton.addEventListener("click", () => {
  resetDemo();
  nextButton.focus();
});

renderDemo();
document.getElementById("demo-controls").hidden = false;
