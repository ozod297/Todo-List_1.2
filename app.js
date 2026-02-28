let createForm = document.querySelector(".create-form");
let editForm = document.querySelector(".edit-form");
let todoLists = document.querySelector(".todo-lists");
let message = document.querySelector("#message");
let as = document.querySelector("#as")

// overlay && modal
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let closeIcon = document.querySelector(".close-icon");

// time
let fullTime = document.querySelector(".full-time");
let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");

// local storage control
let todo = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todo.length) showTodo();

let editTodoId;
let editMessage = document.querySelector("#edit-message");

// set local storage
function setLocalStorage() {
  localStorage.setItem("list", JSON.stringify(todo));
}

function getTime() {
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  let now = new Date();
  const date = now.getDate();
  const month_title = months[now.getMonth()];
  const month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const fullYear = now.getFullYear();

  fullTime.textContent = `${date}.${month_title}.${fullYear} yy`;

  // vaqt
  const nowHour = now.getHours();
  const nowMinutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const nowSecondes =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  hour.textContent = nowHour;
  minute.textContent = nowMinutes;
  second.textContent = nowSecondes;

  let listTime = `${nowHour}:${nowMinutes}, ${date}.${month}.${fullYear}`;
  return listTime;
}
setInterval(() => getTime(), 1000);

// show todo
function showTodo() {
  todoLists.innerHTML = "";
  todo.forEach((item, i) => {
    todoLists.innerHTML += `
      <li ondblclick="complatedTodo(${i})" class="${item.complated ? "complated" : ""}">
        ${item.text}
        <div class="extra">
          <span style="opacity:0.5">${item.time}</span>
          <span>
            <img onclick="editTodo(${i})" src="./img/edit.svg" class="edit" alt="edit-icon" width="30" />
            <img onclick="deletedTodo(${i})"
              src="./img/delete-1-svgrepo-com.svg"
              class="delete"
              width="30"
              alt="delete-icon"
            />
          </span>
        </div>
      </li>
    `;
  });
}

// deleted todo
function deletedTodo(id) {
  let newTodo = todo.filter((item, i) => id !== i);
  todo = newTodo;
  setLocalStorage();
  showTodo();
}

// edit todo
function editTodo(id) {
  openModal();
  editTodoId = id;
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeIcon.addEventListener("click", () => {
  closeModal();
});

overlay.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let input_text = editForm.elements["input"].value.trim();

  if (input_text.length) {
    todo.splice(editTodoId, 1, {
      text: input_text,
      time: getTime(),
      complated: false,
    });
    setLocalStorage();
    closeModal();
    showTodo();
  } else {
    as.textContent = "Please, enter some text";
    setTimeout(() => {
      as.textContent = "";
    }, 2000);
  }

  editForm.reset();
});

// complatedTodo
function complatedTodo(id) {
  let complatedTodo = todo.map((item, i) => {
    if (id === i) {
      return { ...item, complated: item.complated ? false : true };
    } else {
      return { ...item };
    }
  });
  todo = complatedTodo;
  setLocalStorage();
  showTodo();
}

// form create task
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let input_text = createForm.elements["todo"].value.trim();

  if (input_text.length) {
    todo.push({
      text: input_text,
      time: getTime(),
      complated: false,
    });
    setLocalStorage();
    showTodo();
  } else {
    message.textContent = "Please, enter some text";
    setTimeout(() => {
      message.textContent = "";
    }, 2000);
  }

  createForm.reset();
});
