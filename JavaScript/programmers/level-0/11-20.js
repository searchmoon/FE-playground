//11. 문자열 겹쳐쓰기 https://school.programmers.co.kr/learn/courses/30/lessons/181943

//11. 풀이
function solution(my_string, overwrite_string, s) {
    let strArr = my_string.split('');
    
    for (let i = 0; i < overwrite_string.length; i++) {
        strArr[s + i] = overwrite_string[i];
    }
    
    return strArr.join('');
}
