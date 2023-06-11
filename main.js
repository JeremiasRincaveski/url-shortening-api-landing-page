const url = 'https://api.shrtco.de/v2/shorten?url='
const input = document.querySelector('.input__link')
const submit = document.querySelector('.input__button')
const haburger = document.querySelector('[data-button="hamburger"]')

const takeCopy = () => {
  const copyButton = Array.from(document.querySelectorAll('.result__button'))
  copyButton.forEach((item) => {
    item.removeEventListener('click', clicked)
    item.addEventListener('click', clicked)
  })
}

const clicked = (e) => {
  const text = e.target.previousElementSibling.textContent
  navigator.clipboard.writeText(text)
  e.target.textContent = 'Copied!'
  e.target.style.backgroundColor = 'hsl(257, 27%, 26%)'
  e.target.style.color = 'white'
  e.target.style.cursor = 'default'
}

submit.addEventListener('click', () => {
  fetch(url + input.value)
  .then((response) => response.json())
  .then((data) => {
    const result = document.querySelector('.results__links')
    const newData = document.createElement('li')
    newData.classList.add('result__line')
    newData.innerHTML = `
      <div class="result__link">${data.result.original_link}</div>
      <div class="result__shorten-link">${data.result.full_short_link}</div>
      <button class="result__button">Copy</button>
    `
    result.insertBefore(newData, result.firstChild)
    // input.value = ''
    takeCopy()
  })
})

haburger.addEventListener('click', () => {
  const ul = document.querySelector('.header__nav--ul')
  const container = document.querySelector('.header__nav')
  const styles = window.getComputedStyle(ul)
  if (styles.display === 'none') {
    ul.style.display = 'flex'
    ul.style.flexDirection = 'column'
    container.style.flexDirection = 'column'
  }
  else {
    ul.style.display = 'none'
    container.style.flexDirection = 'row'
    container.style.justifyContent = 'space-between'
  }
})