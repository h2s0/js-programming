// password length 
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document. querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const passIndicatorText = document.querySelector(".pass-indicator-text");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*(){}[],.|<>~-:;"
}

// 비밀번호 생성
const generatePassword = () => {
    // 비밀번호 생성에 사용될 가능한 모든 문자를 포함할 변수
    let staticPassword = "",
    // 생성될 랜덤 비밀번호를 저장할 변수
    randomPassword ="",
    // 중복 문자를 제외할지 나타내는 변수
    excludeDuplicate = false,
    // 슬라이더로 설정한 비밀번호 길이
    passLength = lengthSlider.value;

    // 체크 된 옵션에 따라 staticPassword 문자열 구성
    options.forEach( option => {
        // option 이 체크되어 있다면, option.id 를 보고 판단하여 설정
        if(option.checked) {
            // 소문자, 대문자, 숫자, 기호 중 하나 옵션일 때
            if(option.id !== "exe-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword += `   ${staticPassword}   `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    // 설정된 비밀번호 길이만큼 반복하여 staticPassword에서 무작위 문자를 선택하고 randomPassword에 추가
    for( let i = 0; i < passLength; i++ ) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            // 중복 문자 제외 옵션이 체크되어 있다면 이미 randomPassword 에 있는 문자는 추가하지 않음
            !randomPassword.includes(randomChar) | randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    // 생성된 randomPassword 를 입력 요소의 값으로 설정
    passwordInput.value = randomPassword;
}

// 비밀번호 강도 표시
const updatePassIndicator = () => {
    const strength =
        lengthSlider.value <= 8 ? "weak"
        : lengthSlider.value <= 16 ? "medium"
        : "strong";
    passIndicator.id = strength;
    
    passIndicatorText.innerText = strength.charAt(0).toUpperCase() + strength.slice(1);
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

// 비밀번호를 클립보드에 복사
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

// password copy 버튼에 이벤트 리스너 추가, 함수를 호출하여 비밀번호를 클립보드에 복사
copyIcon.addEventListener("click", copyPassword);
// 비밀번호 길이 설정 슬라이더 값이 변경될 때마다 
lengthSlider.addEventListener("input", updateSlider);
// 비밀번호 생성 버튼 클릭 시, 새로운 비밀번호 생성
generateBtn.addEventListener("click", generatePassword);