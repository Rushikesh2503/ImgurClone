let inVal = document.getElementById("searchingInp");
inVal.addEventListener("keypress", onInpuChange);
// console.log("inVal:", inVal.value);
let scrollCheck = true;

if (inVal.value == "" || !inVal.value) {
  inVal = "cafe";
}

let searchOnBtn = document.getElementById("searchingBtn");
searchOnBtn.addEventListener("click", showData);

let currpage = 1;

let url = `https://api.unsplash.com/search/photos?query=${inVal}&page=${currpage}&client_id=bpSvSrKX3yyNF9cOHRj_Atov2wi5DzBSFOj0dzqrEPo`;

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  scrollCheck = true;
  if (scrollTop + clientHeight >= scrollHeight) {
    currpage++;
    showData();
  }
});

async function showData() {
  try {
    return fetch(
      `https://api.unsplash.com/search/photos?query=${inVal}&page=${currpage}&client_id=bpSvSrKX3yyNF9cOHRj_Atov2wi5DzBSFOj0dzqrEPo`
    )
      .then((res) => res.json())
      .then((data) => showDataWithCard(data.results))
      .catch((error) => console.log("error", error));
  } catch (er) {
    console.log("er:", er);
  }
}
var time;
function onInpuChange(e) {
  scrollCheck = false;
  clearTimeout(time);
  time = setTimeout(() => {
    searchValue = e.target.value || "";
    inVal = searchValue || "india";
    showData();
  }, 500);
}
showData();

function showDataWithCard(data) {
  //   console.log("data:", data);
  let mainImgDiv = document.getElementById("imgShowBox");
  let content = ``;
  data?.map((el) => {
    // console.log("el:", el.alt_description);
    content += `
    <div class="imgsOfCard">
        <div>
         <img src=${el.urls.regular} alt="img"/>
        </div>
        <div>
            <p class="descriptionPTag">${
              el.alt_description == null
                ? "Image From Source"
                : el.alt_description
            }</p>
        </div>
        <div class="symbolsDn">
            <i class="fas fa-arrow-up"> ${Math.ceil(Math.random() * 50)}</i>
            <i class="fas fa-comment-alt"> ${Math.ceil(Math.random() * 20)}</i>
            <i class="fas fa-eye"> ${Math.ceil(Math.random() * 150)}</i>
        </div>
    </div>
    `;
  });

  if (scrollCheck) {
    mainImgDiv.innerHTML += content;
  } else {
    mainImgDiv.innerHTML = content;
  }
}
