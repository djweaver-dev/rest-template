username = document.querySelector('span').innerText

setTimeout(() => {
    fetch(`/dash?user=${username}`)
},6000)