let user = document.querySelector("#user"),
  play = document.querySelector("#play"),
  reset = document.querySelector("#reset"),
  start = document.querySelector("#start"),
  life = document.querySelector("#life"),
  result = document.querySelector(".result"),
  bg = document.querySelector(".stat_imgBox"),
  updown = document.querySelector("#updown");

let computerNum; //정답 숫자
let count = 5; //맞출 기회
let history = []; //입력한 숫자 내역(중복 기입 방지용)

let bunny = document.querySelector(".bunny");
let deco = document.querySelector(".bun_1");

let info = document.querySelector(".how");
let modal = document.querySelector(".how_modal");
let modalBox = document.querySelector(".modalBox");
let close = document.querySelector(".modalBox > i");

//랜덤 숫자 선정
function random() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log("com", computerNum);
}
random();

//-----게임 방법 모달창 시작-----

//-----게임 방법 모달창 끝-----

//게임 시작
start.addEventListener("click", () => {
  let gamePoint = document.querySelector(".game2").offsetTop;
  // console.log(gamePoint);

  window.scrollTo({ top: gamePoint, behavior: "smooth" });
});

//게임 초기화 후 재시작
function replay() {
  bg.style.backgroundColor = "#ffc990";
  bunny.classList.remove("up");
  deco.classList.remove("up");
  bunny.classList.remove("down");
  deco.classList.remove("down");
  bunny.src = "img/char-start.png";
  deco.src = "img/char-start-1.png";

  count = 5;
  life.textContent = `남은 기회: ${count}회`;
  play.disabled = false;
  user.disabled = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
  result.classList.remove("on");
  history = [];
  updown.innerHTML = "<li>1 이상 100 이하의 숫자인 것 같다!</li>";
  random();
}

//게임 플레이
play.addEventListener("click", (e) => {
  e.preventDefault();

  let userNum = user.value;
  console.log(userNum);
  console.log(computerNum);

  //중복 숫자 입력 방지
  if (history.includes(userNum)) {
    alert("이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.");
    return;
  } else if (userNum == "" || userNum > 100 || userNum <= 0) {
    alert("1부터 100까지의 숫자를 정확히 입력해주세요.");
    return;
  } //범위를 벗어난 숫자 입력 방지

  let compare = "";

  //숫자 입력값에 따른 결과 출력
  if (userNum > computerNum) {
    bg.style.backgroundColor = "#739edeff";
    bunny.classList.remove("up");
    deco.classList.remove("up");
    bunny.classList.add("down");
    deco.classList.add("down");
    bunny.src = "img/char-down.png";
    deco.src = "img/char-down-1.png";

    compare = `<li>${userNum}보다는 <span class="small">작은</span> 숫자인 것 같다!</li>`;
    count--;
  } else if (userNum < computerNum) {
    bg.style.backgroundColor = "#ff7686";
    bunny.classList.remove("down");
    deco.classList.remove("down");
    bunny.classList.add("up");
    deco.classList.add("up");
    bunny.src = "img/char-up.png";
    deco.src = "img/char-up-1.png";

    compare = `<li>${userNum}보다는 <span class="big">큰</span> 숫자인 것 같다!</li>`;
    count--;
  } else if (userNum == computerNum) {
    play.disabled = true;
    user.disabled = true;
    result.innerHTML = `<h2>game clear!</h2>
          <p>축하합니다!<br>
            정답은 <span>${computerNum}</span>입니다.<br />게임을 더 즐기고
            싶으시다면 플레이 버튼을 클릭해주세요!
          </p>
          <img src="img/KakaoTalk_20251112_224536676.png" />
          <button id="replay" onclick="replay()">다시 플레이하기</button>`;
    result.classList.add("on");
  }
  //게임 오버
  if (count == 0) {
    play.disabled = true;
    user.disabled = true;
    result.innerHTML = `<h2>game over!</h2>
          <p>
            정답은 <span>${computerNum}</span>입니다.<br />게임을 더 즐기고
            싶으시다면 플레이 버튼을 클릭해주세요!
          </p>
          <img src="img/KakaoTalk_20251112_224536676.png" />
          <button id="replay" onclick="replay()">다시 플레이하기</button>`;
    result.classList.add("on");
  }
  // console.log(count);
  life.textContent = `남은 기회: ${count}회`;

  updown.innerHTML += compare;
  // console.log(compare);

  history.push(userNum);
  console.log(history);

  user.value = ""; //입력 후 input 초기화
});

//...???
// let gameConfirm = confirm(
//   "재시작하면 정답과 입력한 모든 숫자가 함께 초기화됩니다. 정말로 재시작하시겠습니까?"
// );
// reset.addEventListener("click", () => {
//   if (gameConfirm) {
//     replay();
//   } else {
//     return false;
//   }
// });

//게임방법 표시
info.addEventListener("click", () => {
  modal.classList.add("on");
  modalBox.classList.add("on");
  // modalBox.style.transform = "translate(50%, -50%) scale(1)";
  // modalBox.style.opacity = "1";
});

close.addEventListener("click", () => {
  modal.classList.remove("on");
  modalBox.classList.remove("on");
});
