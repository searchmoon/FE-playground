console.log('hello world')

interface 숨쉬기{
    숨쉰다: () => void
}

class 사람 implements 숨쉬기{
    숨쉰다(): void {
        console.log('전 입으로 숨을 쉽니다')
    }
}

(new 사람).숨쉰다()
