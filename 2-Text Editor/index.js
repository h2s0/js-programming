// 옵션 버튼 전체
let optionButtons = document.querySelectorAll(".option-button");
// 1번째
let formatButtons = document.querySelectorAll(".format");
// 2번째
let scriptButtons = document.querySelectorAll(".script");
// 7번째꺼
let linkButton = document.getElementById("createLink");
// 9, 10, 11, 12번째
let alignButtons = document.querySelectorAll(".align");
// 13, 14 번째
let spacingButtons = document.querySelectorAll(".spacing");
// createlink 버튼 7번째, 폰트, 폰트크기 선택 내려오는거, 컬러선택칸 2개
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");

// 사용 가능한 폰트 리스트
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

// 페이지가 로드될 때 실행될 초기 설정 함수
const intializer = () => {
    // 버튼을 강조하는 highlighter 함수 호출
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // 폰트 리스트를 순회하며 각 폰트를 선택할 수 있는 option element 를 생성하고, fontName 이라는 element 에 추가
    // value = 폰트 이름
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // 0부터 7까지 값인 option element 를 생성하고, fontSizeRef에 추가
    for( let i = 0; i <= 7; i++ ) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // 기본 폰트 크기 3으로 설정
    fontSizeRef.value = 3;
};

// execCommand  : 웹 페이지의 편집 가능 영역에서 특정 명령을 실행하는 함수
// value : 명령에 대한 추가 정보
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// 각 option button 에 클릭 이벤트 리스너 추가
// 버튼을 클릭하면 해당 버튼의 id 를 command 로 사용하여 modifyText 함수 호출
optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

// 고급 옵션 버튼에 이벤트 리스너 추가
// 선택된 옵션이 변경되면 modifyText 함수 호출
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// 링크 생성 버튼에 클릭 이벤트 리스너 추가
// 클릭하면 사용자에게 URL을 입력하라는 프롬프트가 표시되고, 입력한 URL로 링크가 생서됨
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// 주어진 클래스 이름을 가진 모든 버튼에 클릭 이벤트 리스너를 추가하는 함수
// 클릭하면 'active' 클래스가 추가, 제거되어 강조 효과 적용
const highlighter= (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if(needsRemoval){
                let alreadyActive = false;
                if(button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

// 지정된 클래스 이름을 가진 모든 버튼에서 'active' 클래스 제거
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// 페이지가 로드될 때 intializer 함수 실행
window.onload = intializer();