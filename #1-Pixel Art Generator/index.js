// querySelector : CSS 선택자를 인자로 받음, 클래스를 선택하려면 .클래스이름, 아이디를 선택하려면 #id이름 을 사용
// getElementById : 아이디를 직접적으로 인자로 받음, 바로 id이름 을 사용
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// 마우스와 터치 이벤트에 대한 객체 생성
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchStart",
        mobe: "touchmove",
        up: "touchend",
    },
};

// 터치 가능한 기기인지 아닌지를 판별해 저장
let deviceType = "";

// 그림 그리기, 지우개 상태 관리 변수, 초기값 false
let draw = false;
let erase = false;

// 현재 디바이스가 터치 지원 기기인지 아닌지 판별
const isTouchDevice = () => {
    try{
        // 터치 이벤트를 생성해보고
        document.createEvent("TouchEvent");
        // 생성 성공 시, deviceType 을 touch 로 설정
        deviceType = "touch";
        return true;
    } catch (e) { // 오류가 생기면 = 터치 이벤트가 실패하면 deviceType 을 mouse 로 설정
        deviceType = "mouse";
        return false;
    }
};

// 함수 호출해 터치 지원 기기인지 판별
isTouchDevice();

// gridButton 요소에 클릭 이벤트 리스너 추가해 클릭시 실행되는 함수 등록
gridButton.addEventListener("click", () => {
    // container 요소의 내부 HTML을 비워주며, 이전에 그려진 그리드를 초기화
    container.innerHTML = "";

    let count = 0;

    // 세로 방향으로 최대 그리드 행 생성
    for ( let i = 0; i < gridHeight.value; i++ ) {
        count += 2;
        // div 요소 생성해 gridRow 클래스 추가
        let div = document.createElement("div");
        div.classList.add("gridRow");

        // 가로 방향으로 gridWidth.value 만큼의 그리드 셀 생성
        for( let j=0; j < gridWidth.value; j++ ) {
            count += 2;
            // div 요소 생성해 gridCol 클래스 추가
            let col = document.createElement("div");
            col.classList.add("gridCol");
            // setAttribute ?
            // gridCol 뒤에 count 값 붙힌 id 값 생성
            col.setAttribute("id", `gridCol${count}`);
            // 생성한 div 요소에 이벤트 리스너 추가, 이벤트는 deviceType 에 따라 mousedown 또는 touchstart 가 됨 
            col.addEventListener(events[deviceType].down, () => {
                // 사용자가 그리기 시작
                draw = true;
                // erase 가 true 일 때 지우개 기능을 사용하므로, 그리드 셀의 배경을 투명색으로 지정
                // false 일 때 그리기 기능을 사용하므로, colorButton 값에 따라 그리드 셀의 배경색 설정
                if(erase){
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
            
        }

        container.appendChild(div);
    }
});

function checker(elementId) {

    let gridColumns = document.querySelectorAll(".gridCol");

    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if ( draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if ( draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
}