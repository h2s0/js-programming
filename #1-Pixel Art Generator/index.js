// HTML 요소 선택
// querySelector : CSS 선택자를 인자로 받음, 클래스를 선택하려면 .클래스이름, 아이디를 선택하려면 #id이름 을 사용
let container = document.querySelector(".container");
// getElementById : 아이디를 직접적으로 인자로 받음, 바로 id이름 을 사용
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// 마우스 및 터치 이벤트 객체 생성
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

// 그리드 생성 버튼에 클릭 이벤트 리스너 추가
gridButton.addEventListener("click", () => {
    // 그리드 컨테이너 초기화
    container.innerHTML = "";

    let count = 0;

    // 세로 방향 그리드 생성
    for ( let i = 0; i < gridHeight.value; i++ ) {
        count += 2;
        // div 요소 생성해 gridRow 클래스 추가
        let div = document.createElement("div");
        div.classList.add("gridRow");

        // 가로 방향 그리드 생성
        for( let j=0; j < gridWidth.value; j++ ) {
            count += 2;
            // div 요소 생성해 gridCol 클래스 추가
            let col = document.createElement("div");
            col.classList.add("gridCol");
            // 생성한 div에 id 값 생성
            col.setAttribute("id", `gridCol${count}`);

            // 그리드 셀에 이벤트 리스너 추가
            col.addEventListener(events[deviceType].down, () => {
                // 그리기 시작
                draw = true;
                // erase 가 true 일 때 지우개 기능을 사용하므로, 그리드 셀의 배경을 투명색으로 지정
                // false 일 때 그리기 기능을 사용하므로, colorButton 값에 따라 그리드 셀의 배경색 설정
                if(erase){
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            // 그리드 셀에 마우스 또는 터치 이동 이벤트 리스너 추가
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            // 그리드 셀에 마우스 또는 터치 끝날 때 이벤트 리스너 추가
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            // 생성한 그리드 셀을 그리드 행에 추가
            div.appendChild(col);
            
        }

        // 생성한 그리드 행을 그리드 컨테이너에 추가
        container.appendChild(div);
    }
});

// 그리기 또는 지우기를 실행할 셀을 확인하고 색상을 변경하는 함수
function checker(elementId) {

    // 모든 그리드 셀 선택
    let gridColumns = document.querySelectorAll(".gridCol");

    // 모든 그리드 셀 중 1*1 셀 = element
    // elementId : 마우스 또는 터치가 현재 위치한 그리드 셀의 id
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            // 그리기 모드일 때 (draw가 true, erase가 false) 배경색을 선택한 색으로 설정
            if ( draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            // 지우개 모드일 때 (draw와 erase 모두 true) 배경색을 투명색으로 설정
            } else if ( draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// 그리드 클리어 버튼에 클릭 이벤트 리스너 추가
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

// 지우개 버튼에 클릭 이벤트 리스너 추가
eraseBtn.addEventListener("click", () => {
    // 지우개 모드 활성화
    erase = true;
});

// 그리기 버튼에 클릭 이벤트 리스터 추가
paintBtn.addEventListener("click", () => {
    // 그리기 모드 활성화
    erase = false;
});

// 그리드 너비 슬라이더에 입력 이벤트 리스너 추가
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

// 그리드 높이 슬라이더에 입력 이벤트 리스너 추가
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// 9 는 비교를 위한 기준 값으로 사용됨, 그리드 높이 슬라이더의 값이 9보다 작을 경우 = 한 자릿수일 경우 값 앞에 0을 추가하여 두 자릿수 형식으로 표시하도록 하기 위험

// 초기값 설정 삭제
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
}