var imgs = document.querySelectorAll("#mainApp img");

imgs.forEach(function (value, index, listObjects) {
    value.addEventListener("click", function (el) {
        onClick(el)
    })
});

function onClick(el) {
    console.log(el.target.dataset.choice);
    document.querySelector("#form input").value = el.target.dataset.choice;
    document.querySelector("#form").submit();

}
