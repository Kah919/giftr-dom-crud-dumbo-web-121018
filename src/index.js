const glist = document.querySelector(".gift-list");
const newGift = document.querySelector("#gift-form");
const giftName = document.querySelector("#gift-name-input");
const giftIMG = document.querySelector("#gift-image-input");
const giftSubmit = document.querySelector("#gift-form-button");
const searchBar = document.querySelector("#filter-input");
const items = document.querySelector(".item");

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)
  populatePage();
  searching();
})

const populatePage = () => {
  glist.children[0].remove();
  gifts.forEach( gift => {
    const div = document.createElement("div");
    div.className = "item";
    const li = document.createElement("li");
    li.innerText = gift.name;
    const img = document.createElement("IMG");
    img.setAttribute("src", gift.image);
    li.className = "giftName";
    img.className = "img";
    div.append(li);
    div.append(img);
    const button = document.createElement("button");
    button.innerText = "Delete 🗑";
    button.className = "delete";

    const edit = document.createElement("button");
    edit.innerText = "Edit ✄";
    edit.className = "edit";

    const editForm = document.createElement("form");
    editForm.className = "editForm";

    div.append(button);
    div.append(edit);
    div.append(editForm);
    glist.append(div);
  })
}

const create = event => {
  event.preventDefault();
  removeNoGift();
  const div = document.createElement("div");
  div.className = "item";
  let li = document.createElement("li");
  li.innerText = giftName.value;
  li.className = "giftName";

  let image = document.createElement("img");
  image.setAttribute("src", giftIMG.value);
  image.className = "img";

  const button = document.createElement("button");
  button.innerText = "Delete 🗑";
  button.className = "delete";

  const edit = document.createElement("button");
  edit.innerText = "Edit ✄";
  edit.className = "edit";

  const editForm = document.createElement("form");
  editForm.className = "editForm";

  div.append(li);
  div.append(image);
  div.append(button);
  div.append(edit);
  div.append(editForm);
  glist.append(div);
}

newGift.addEventListener('submit', create);

const removeEli = event => {
  event.preventDefault();
  if (event.target.className === "delete") {
    event.target.parentNode.remove();
    isEmpty();
  }
}


glist.addEventListener('click', removeEli);

const searching = () => {
  searchBar.addEventListener("input", e => {
    for (let i = 0; i < glist.children.length; i++) {
    	if((glist.children[i].children[0].innerText).includes(searchBar.value)) {
        console.log("yes!");
        glist.children[i].style.display = "";
      } else {
        glist.children[i].style.display = "none";
      }
    }
  })
}

const editItem = event => {
  event.preventDefault();
  if (event.target.classList.contains("edit")) {
  const editForm = event.target.parentNode.querySelector(".editForm");
  editForm.innerHTML = `<form class="" method="post">
      <label for="name">Name: </label>
      <input class="newName" type="text" name="name" value="">

      <label for="name">Image: </label>
      <input class="newImg" type="text" name="name" value="">

      <input class="edit-submit" type="submit">
    </form>`
  }
  const newName = document.querySelector(".newName");
  const newImg = document.querySelector(".newImg");

  const editSubmit = document.querySelector(".edit-submit");

  editSubmit.addEventListener("click", e => {
    e.target.parentNode.parentNode.querySelector(".giftName").innerText = newName.value;
    e.target.parentNode.parentNode.querySelector(".img").src = newImg.value;
  })
}

glist.addEventListener('click', editItem);

const isEmpty = () => {
  if (glist.children.length === 0) {
    glist.innerHTML = `<li>No gifts yet :(</li>`;
  }
}

const removeNoGift = () => {
  if (glist.children[0].innerText === "No gifts yet :(") {
    glist.children[0].remove();
  }
}
