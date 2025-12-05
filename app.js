const form = document.getElementById("goal-form");
const input = document.getElementById("goal-input");
const list = document.getElementById("goals-list");
const clearBtn = document.getElementById("clear-all");

const STORAGE_KEY = "daily-goals-v1";

function load() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  list.innerHTML = "";
  data.forEach((g, idx) => {
    const li = document.createElement("li");
    li.textContent = g;
    const del = document.createElement("button");
    del.textContent = "x";
    del.onclick = () => {
      data.splice(idx, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      load();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (data.length >= 5) {
    alert("Limit 5 goals — delete one first.");
    return;
  }
  data.push(val);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  input.value = "";
  load();
};

clearBtn.onclick = () => {
  if (confirm("Clear all goals?")) {
    localStorage.removeItem(STORAGE_KEY);
    load();
  }
};

window.onload = load;
