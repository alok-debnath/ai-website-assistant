document.addEventListener("mouseup", () => {
  const selection = window.getSelection()?.toString();
  if (selection && selection.length > 5) {
    const range = window.getSelection()!.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const popup = document.createElement("div");
    popup.innerHTML = `
      <button style="margin: 2px; padding: 5px 10px;">Translate</button>
      <button style="margin: 2px; padding: 5px 10px;">Ask</button>
    `;
    popup.style.position = "fixed";
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + 10}px`;
    popup.style.background = "white";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "6px";
    popup.style.padding = "5px";
    popup.style.zIndex = "10000";

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
  }
});
