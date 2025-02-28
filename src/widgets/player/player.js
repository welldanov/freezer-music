export function volumeControl() {
  const slider = document.getElementById('rangeSlider');
  let prevValue = slider.value
  const volumeIcon = document.getElementById('volume-icon');
  const volumePopover = document.getElementById('volume-popover');
  const volumePopoverSquare = document.getElementById('volume-popover-square');
  const settingsIcon = document.getElementById('player-settings');
  const settingsPopover = document.getElementById('settings-popover');
  const settingsPopoverSquare = document.getElementById('settings-popover-square');

  let isSettingsOpen = false;

  function updateSliderValue() {
    if (Number(slider.value) === 0) slider.value = prevValue;
    else slider.value = 0
    changeIcon()
  }

  function updateSliderBackground() {
    if (Number(slider.value) !== 0) {
      prevValue = slider.value
    }
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.setProperty('--value', `${value}%`);
    changeIcon()
  }

  function changeIcon() {
    if (Number(slider.value) === 0) {
      volumeIcon.style["fill"] = "#B560FFFF";
      volumeIcon.innerHTML = `<svg fill="#4ea8b4" id="volume-icon_off" viewBox="0 0 24 24" focusable="false" data-testid="VolumeMuteIcon" aria-hidden="true"><path fill-rule="evenodd" d="M7.015 8.007 10.33 4h1.657s.827 3.636.827 8.007c0 4.357-.83 7.993-.83 7.993H10.33l-3.245-3.993H4.667c-.368 0-.667-.325-.667-.727V8.735c0-.402.299-.728.667-.728h2.348Zm1.104 7.16 2.78 3.42c.236-1.366.582-3.837.582-6.58 0-2.76-.346-5.239-.582-6.604L8.043 8.857l-.4.483h-2.31v5.334h2.386l.4.493ZM18 9.53l.943.943L17.414 12l1.529 1.529-.943.943-1.529-1.529-1.528 1.529L14 13.53l1.529-1.529L14 10.473l.943-.943 1.528 1.529L18 9.53Z" clip-rule="evenodd"></path></svg>`;
    } else {
      volumeIcon.style["fill"] = "#FFFFFF";
      volumeIcon.innerHTML =`<svg id="volume-icon_on" viewBox="0 0 24 24" focusable="false" data-testid="VolumeMaxIcon" aria-hidden="true"> <path fill-rule="evenodd" d="M7.015 8.007 10.33 4h1.657s.827 3.636.827 8.007c0 4.357-.83 7.993-.83 7.993H10.33l-3.245-3.993H4.667c-.368 0-.667-.325-.667-.727V8.735c0-.402.299-.728.667-.728h2.348Zm1.104 7.16 2.78 3.42c.236-1.366.582-3.837.582-6.58 0-2.76-.346-5.239-.582-6.604L8.043 8.857l-.4.483h-2.31v5.334h2.386l.4.493Zm9.643-7.786-.943.942c1.137 1.137 1.731 2.399 1.72 3.65-.012 1.267-.646 2.542-1.834 3.686l.925.96c1.451-1.398 2.227-3 2.242-4.634.015-1.617-.715-3.21-2.11-4.604Zm-3.277 3.193c.448.45.683.936.679 1.408-.005.48-.256.973-.727 1.426l.925.96c.735-.707 1.127-1.528 1.135-2.374.008-.838-.362-1.655-1.07-2.362l-.942.942Z" clip-rule="evenodd"></path> </svg>`
    }
  }

  function onHoverVolume() {
    volumePopover.style.display = "flex"
    volumePopoverSquare.style.display = "block"
    setTimeout(()=> {
      volumePopover.classList.add("player-right__volume-popover_hover")
      volumePopoverSquare.classList.add("player-right__volume-popover-square_hover")
    },1)
  }

  function onLeaveVolume() {
    volumePopover.classList.remove("player-right__volume-popover_hover")
    volumePopoverSquare.classList.remove("player-right__volume-popover-square_hover")
  }

  function onClickSettings() {
    if (!isSettingsOpen) {
      settingsPopover.style.display = "block"
      settingsIcon.style.fill = "var(--color-scheme-secondary)"
      settingsPopoverSquare.style.display = "block"
      setTimeout(()=> {
        settingsPopover.style.opacity = "1"
        settingsPopoverSquare.style.opacity = "1"
      },1)
    } else {
      settingsPopover.style.opacity = "0"
      settingsPopoverSquare.style.opacity = "0"
      settingsIcon.style.fill = "#ffffff"
    }
    isSettingsOpen = !isSettingsOpen
  }

  function onClickWindow(e) {
    if (e.srcElement.id !== "player-settings-icon") {
      isSettingsOpen = false
      settingsPopover.style.opacity = "0"
      settingsPopoverSquare.style.opacity = "0"
      settingsIcon.style.fill = "#ffffff"
    }
  }


  updateSliderBackground();
  volumePopover.addEventListener('transitionend', () => {
    if (!volumePopover.classList.contains('player-right__volume-popover_hover')) {
        volumePopover.style.display = "none";
        volumePopoverSquare.style.display = "none";
    }
  });
  window.addEventListener("click", onClickWindow);
  settingsIcon.addEventListener("click", onClickSettings);
  volumeIcon.addEventListener("mouseenter", onHoverVolume);
  volumePopover.addEventListener("mouseenter", onHoverVolume);
  volumePopoverSquare.addEventListener("mouseenter", onHoverVolume);
  volumeIcon.addEventListener("mouseleave", onLeaveVolume);
  volumePopover.addEventListener("mouseleave", onLeaveVolume);
  volumePopoverSquare.addEventListener("mouseleave", onLeaveVolume);
  volumeIcon.addEventListener('click', updateSliderValue);
  slider.addEventListener('input', updateSliderBackground);
  volumeIcon.addEventListener('click', updateSliderBackground);
}