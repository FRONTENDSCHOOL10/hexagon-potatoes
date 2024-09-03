// 이름
// 최소 두자 이상, 한글만 포함
export function validateName(val: string): boolean {
  const result = /^[가-힣]{2,}$/.test(val);
  return result;
}

// 닉네임
// 최소 한 글자 이상, 공백 제외 모든 기호 포함
export function validateNickname(val: string): boolean {
  const result = /^[^\s]{1,}$/.test(val);
  return result;
}

//아이디 유효성
//영문 또는 영문, 숫자 조합 6−12자리
export function validateId(val: string): boolean {
  const result = /^[A-Za-z0-9]{6,12}$/g.test(val);
  return result;
}

//비밀번호 유효성
//영문, 숫자, 특수문자(~!@#$%^&*) 조합 8−15자리
export function validatePwd(val: string): boolean {
  const result = /^[\w~!@#$%^&*()_=+|,./<>?;:'"[\]{}-]{8,15}$/g.test(val);
  return result;
}

//이메일 유효성
//@영문.영문 형식
export function validateEmail(val: string): boolean {
  const result = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(val);
  return result;
}

// 휴대폰 번호
// 010은 고정, 이하 8자리 숫자
export function validatePhoneNumber(val: string): boolean {
  const result = /^010\d{8}$/.test(val);
  return result;
}
