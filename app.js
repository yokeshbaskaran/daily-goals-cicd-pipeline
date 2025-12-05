const form = document.getElementById("goal-form");
const input = document.getElementById("goal-input");
const list = document.getElementById("goals-list");
const clearAllBtn = document.getElementById("clear-all");
const countEl = document.getElementById("goal-count");

// ───────────────────────────────
// LOCAL STORAGE FUNCTIONS
// ───────────────────────────────

// read stored goals
function loadGoals() {
  const saved = localStorage.getItem("daily-goals");
  return saved ? JSON.parse(saved) : [];
}

// save current dom goals into localStorage
function saveGoals() {
  const items = [...list.children].map((li) => {
    return {
      text: li.querySelector(".goal-text").textContent,
      completed: li.querySelector(".goal-text").classList.contains("completed"),
    };
  });

  localStorage.setItem("daily-goals", JSON.stringify(items));
}

// ───────────────────────────────
// UI UPDATE
// ───────────────────────────────

function updateCount() {
  countEl.textContent = list.children.length;
}

// build one goal <li>
function createGoalItem(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "goal-text";
  span.textContent = text;
  if (completed) span.classList.add("completed");

  const actions = document.createElement("div");
  actions.className = "goal-actions";

  const doneBtn = document.createElement("button");
  doneBtn.type = "button";
  doneBtn.textContent = "Done";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  doneBtn.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveGoals(); // persist change
  });

  removeBtn.addEventListener("click", () => {
    li.remove();
    updateCount();
    saveGoals(); // persist change
  });

  actions.append(doneBtn, removeBtn);
  li.append(span, actions);

  return li;
}

// ───────────────────────────────
// FORM SUBMIT
// ───────────────────────────────
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  const li = createGoalItem(value);
  list.appendChild(li);

  input.value = "";
  updateCount();
  saveGoals();
});

// ───────────────────────────────
// CLEAR ALL
// ───────────────────────────────
clearAllBtn.addEventListener("click", () => {
  list.innerHTML = "";
  updateCount();
  saveGoals();
});

// ───────────────────────────────
// INITIAL LOAD FROM STORAGE
// ───────────────────────────────
function init() {
  const stored = loadGoals();
  stored.forEach((item) => {
    const li = createGoalItem(item.text, item.completed);
    list.appendChild(li);
  });
  updateCount();
}

init();
