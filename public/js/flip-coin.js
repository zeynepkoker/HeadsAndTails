let result = JSON.parse(localStorage.getItem('result')) || {
    heads : 0,
    tails : 0
}

updateResultElement()
document.querySelector('.result-view').style.opacity = '0'

function flipCoin() {
    const randomNumber = Math.random();
    let resultCoin = '';
    if (randomNumber >= 0 && randomNumber < 1 / 2) {
        resultCoin = 'Head'
        result.heads += 1
    } else {
        resultCoin = 'Tail'
        result.tails += 1
    }
    updateResultElement(false);
    localStorage.setItem('result', JSON.stringify(result));
    totalCoinNum = calculatePecentage()
    document.querySelector('.result-view').innerHTML = resultCoin
    document.querySelector('.total-coin-num').innerHTML = `Total flipped coin: ${totalCoinNum}`
    return resultCoin
}

function calculatePecentage() {
    let percentageHead = 0
    let percentageTail = 0
    let totalCoinNum = 0
    if (result.heads != 0 || result.tails != 0) {
        percentageHead = Math.round((result.heads/(result.heads + result.tails))*100)
        percentageTail = 100 - percentageHead
        totalCoinNum = result.heads + result.tails
        document.querySelector('.pie-chart').style.background = `conic-gradient(
            from 0deg,
            rgb(14, 141, 48) 0,
            rgb(14, 141, 48) calc(${percentageHead}%),
            rgba(155, 36, 90, 0.971) 0,
            rgba(155, 36, 90, 0.971) calc(${percentageTail}%))`
    }
    document.querySelector('.percentage-head').innerHTML = `Head: %${percentageHead}`
    document.querySelector('.percentage-tail').innerHTML = `Tail: %${percentageTail}`
    return totalCoinNum
}

function updateResultElement(isReset) {
    if (isReset) {
        result = {
            heads : 0,
            tails : 0
        }
        document.querySelector('.result-view').style.opacity = '0'
        localStorage.removeItem('result')
        document.querySelector('.pie-chart').style.background = `transparent`
    }
    if (result.heads != 0 || result.tails != 0) {
        document.querySelector('.result-view').style.opacity = '1'
        
    }
    document.querySelector('.total-result')
      .innerHTML = `Heads: ${result.heads}  -   Tails: ${result.tails}`;
      totalCoinNum = calculatePecentage()
    document.querySelector('.total-coin-num').innerHTML = `Total flipped coin:   ${totalCoinNum }`
  }

function xTimesFlipCoin(event) {
    if(event.keyCode == 13) {
        const inputElement = document.querySelector('.input-num')
        if (isNumber(inputElement.value)) {
            if (inputElement.value.length <= 4){
                parseInt(inputElement.value)
                if (inputElement != null) {
                    for (let i = 0; i < inputElement.value; i++) {
                        flipCoin()
                    }
                }
            } else {
                alert('Please give a smaller number. Max number is 9999')
            }
        } else {
            alert('Please give a valid number!')
        }
        inputElement.value = ''
    }
}

function isNumber(string) {
    return /^[0-9]*$/.test(string);
}