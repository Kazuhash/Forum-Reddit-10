document.addEventListener("DOMContentLoaded", function () {
  const modalCreate = document.getElementById("modalCreate");
  const btnOpenModalWidget = document.getElementById("btnOpenModalWidget");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const formCreate = document.getElementById("formCreate");
  const communityList = document.getElementById("communityList");

  if (btnOpenModalWidget) {
    btnOpenModalWidget.addEventListener("click", function () {
      modalCreate.style.display = "flex";
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", function () {
      modalCreate.style.display = "none";
    });
  }

  if (formCreate) {
    formCreate.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("inputName").value.trim();
      const desc = document.getElementById("inputDesc").value.trim();

      if (!name || !desc) return;

      const card = document.createElement("div");
      card.className = "community-card";
      card.innerHTML = `
        <div>
          <h4>${name}</h4>
          <p class="comm-desc">${desc}</p>
          <small>1 Anggota</small>
        </div>
        <button class="btn-join joined">Tergabung</button> `;

      communityList.prepend(card);
      formCreate.reset();
      modalCreate.style.display = "none";
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-join")) {
      const btn = e.target;
      if (btn.classList.contains("joined")) {
        btn.classList.remove("joined");
        btn.textContent = "Gabung";
      } else {
        btn.classList.add("joined");
        btn.textContent = "Tergabung";
      }
    }
  });
});