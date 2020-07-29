const modalBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

closeBtn.onclick = closeModal;

function openModal(){
    modal.style.display = "block"
};
function closeModal(){
    modal.style.display = "none"
};
