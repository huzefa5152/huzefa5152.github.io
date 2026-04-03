// ============================================================
// terminal.js — Terminal engine (input, history, rendering)
// ============================================================

(function () {
  "use strict";

  // DOM References
  const terminalBody = document.getElementById("terminal-body");
  const commandInput = document.getElementById("command-input");
  const mobileChips = document.getElementById("mobile-suggestions");

  // State
  let commandHistory = [];
  let historyIndex = -1;

  // ---- Initialization ----
  function init() {
    renderBanner();
    renderWelcome();
    setupInput();
    setupMobileChips();
    focusInput();

    // Click anywhere to focus input
    terminalBody.addEventListener("click", focusInput);
  }

  function renderBanner() {
    const banner = document.createElement("div");
    banner.className = "ascii-banner";
    banner.textContent = RESUME_DATA.ascii_banner;
    terminalBody.appendChild(banner);

    // Fallback for small screens
    const fallback = document.createElement("div");
    fallback.className = "ascii-fallback";
    fallback.textContent = RESUME_DATA.name;
    terminalBody.appendChild(fallback);

    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    subtitle.textContent = `  ${RESUME_DATA.title} | ${RESUME_DATA.about.location}`;
    terminalBody.appendChild(subtitle);
  }

  function renderWelcome() {
    const msg = document.createElement("div");
    msg.className = "welcome-msg";
    msg.innerHTML = `Welcome to my interactive portfolio. Type <span class="highlight-cmd">help</span> to see available commands.\n`;
    terminalBody.appendChild(msg);

    const hr = document.createElement("hr");
    hr.className = "terminal-hr";
    terminalBody.appendChild(hr);
  }

  // ---- Input Handling ----
  function setupInput() {
    commandInput.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleEnter();
          break;

        case "ArrowUp":
          e.preventDefault();
          navigateHistory(-1);
          break;

        case "ArrowDown":
          e.preventDefault();
          navigateHistory(1);
          break;

        case "Tab":
          e.preventDefault();
          handleTab();
          break;

        case "l":
          if (e.ctrlKey) {
            e.preventDefault();
            clearTerminal();
          }
          break;

        case "c":
          if (e.ctrlKey) {
            e.preventDefault();
            appendPromptLine(commandInput.value + "^C");
            commandInput.value = "";
            historyIndex = -1;
          }
          break;
      }
    });
  }

  function handleEnter() {
    const input = commandInput.value.trim();
    commandInput.value = "";
    historyIndex = -1;

    // Echo the command
    appendPromptLine(input);

    if (input === "") {
      scrollToBottom();
      return;
    }

    // Add to history
    commandHistory.push(input);

    // Process
    processCommand(input);
    scrollToBottom();
  }

  function navigateHistory(direction) {
    if (commandHistory.length === 0) return;

    if (direction === -1) {
      // Up arrow
      if (historyIndex === -1) {
        historyIndex = commandHistory.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }
    } else {
      // Down arrow
      if (historyIndex === -1) return;
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
      } else {
        historyIndex = -1;
        commandInput.value = "";
        return;
      }
    }

    commandInput.value = commandHistory[historyIndex];
    // Move cursor to end
    setTimeout(() => {
      commandInput.selectionStart = commandInput.selectionEnd = commandInput.value.length;
    }, 0);
  }

  function handleTab() {
    const partial = commandInput.value.trim().toLowerCase();
    if (!partial) return;

    const matches = Object.keys(COMMANDS).filter(
      (cmd) => cmd.startsWith(partial) && !COMMANDS[cmd].hidden
    );

    if (matches.length === 1) {
      commandInput.value = matches[0];
    } else if (matches.length > 1) {
      appendPromptLine(partial);
      renderOutput(matches.map((m) => `  <span class="cmd-name">${m}</span>`).join("\n"));
    }
  }

  // ---- Command Processing ----
  function processCommand(input) {
    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Special multi-word: "sudo hire me" or "sudo <anything>"
    if (cmd === "sudo") {
      if (COMMANDS["sudo"]) {
        const result = COMMANDS["sudo"].execute(args);
        renderOutput(result);
        return;
      }
    }

    // Handle "history" specially
    if (cmd === "history") {
      const historyOutput = commandHistory
        .map((h, i) => `  <span class="muted">${String(i + 1).padStart(4)}</span>  ${h}`)
        .join("\n");
      renderOutput(historyOutput || "  <span class=\"muted\">No commands in history</span>");
      return;
    }

    // Look up command
    const command = COMMANDS[cmd];
    if (!command) {
      renderOutput(
        `<span class="error">bash: ${escapeHtml(cmd)}: command not found</span>\n<span class="muted">Type 'help' for available commands</span>`
      );
      return;
    }

    const result = command.execute(args);

    // Special results
    if (result === "__CLEAR__") {
      clearTerminal();
      return;
    }

    if (result === "__HISTORY__") {
      // Already handled above, but just in case
      return;
    }

    renderOutput(result);
  }

  // ---- Rendering ----
  function createPromptHTML() {
    return `<span class="prompt"><span class="prompt-user">huzefa</span><span class="at">@</span><span class="host">portfolio</span><span class="colon">:</span><span class="path">~</span><span class="dollar">$</span></span>`;
  }

  function appendPromptLine(text) {
    const line = document.createElement("div");
    line.className = "command-line";
    line.innerHTML = `${createPromptHTML()} <span class="command-text">${escapeHtml(text)}</span>`;
    terminalBody.appendChild(line);
  }

  function renderOutput(html) {
    const block = document.createElement("div");
    block.className = "output-block";
    block.innerHTML = html;
    terminalBody.appendChild(block);
  }

  function clearTerminal() {
    // Remove everything except the input line container
    const children = Array.from(terminalBody.children);
    children.forEach((child) => {
      if (!child.classList.contains("input-line")) {
        child.remove();
      }
    });
    renderBanner();
  }

  // ---- Mobile Chips ----
  function setupMobileChips() {
    const chipCommands = ["help", "about", "skills", "experience", "projects", "contact", "neofetch", "resume", "theme dracula", "theme retro", "theme matrix", "theme nord"];
    chipCommands.forEach((cmd) => {
      const btn = document.createElement("button");
      btn.textContent = cmd;
      btn.addEventListener("click", () => {
        commandInput.value = cmd;
        handleEnter();
        focusInput();
      });
      mobileChips.appendChild(btn);
    });
  }

  // ---- Utilities ----
  function focusInput() {
    commandInput.focus();
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ---- Start ----
  document.addEventListener("DOMContentLoaded", init);
})();
