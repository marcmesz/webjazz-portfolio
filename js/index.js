const text = document.getElementById("text")
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelectorAll(".nav__link")
const sections = document.querySelectorAll("section")
const blinkingCursor = document.getElementById("blinking-cursor")
const langBtn = document.getElementById("language-selector")
const portfolioItemSpan = document.querySelectorAll(".portfolio-item-description")
const portfolioItem = document.querySelectorAll(".portfolio-item")
const menuBtn = document.querySelector(".nav-toggle")
let currentPhrase = 0
let isBlinking = true
let currentChar = 0
let currentReverse = 0
let lang = true
let setLang = ""
let setTitle = ""
let setImgTitle = ""

setLanguage()

langBtn.addEventListener("click",()=>{
  lang = !lang
  setLanguage()
})

function setLanguage(){
  fetch("./js/content.json")
  .then(res => res.json())
  .then(data=>{
    lang ? setLang = "hu" : setLang = "en"
    lang ? setTitle = "Magyar" : setTitle = "English"
    lang ? setImgTitle = "Switch to English" : setImgTitle = "Váltás Magyar nyelvre"
    
    document.documentElement.setAttribute("lang",setLang)
    document.title="WebJazz – "+data.pageTitle[setLang]
    document.getElementById("language-icon").setAttribute("src","img/"+setLang+".png")
    document.getElementById("language-selector").setAttribute("title",setImgTitle)
    document.getElementById("language-selector-title").textContent=setTitle
    document.querySelector(".dynamic-slogan").textContent=data.slogan[setLang]
    document.getElementById("screen-text").textContent=data.servicesFooterText[setLang]
    document.getElementById("dynamic-btn").textContent=data.allButtonText[0][setLang]
    document.getElementById("btn-osszes").textContent=data.allButtonText[1][setLang]
    document.getElementById("btn-weboldal").textContent=data.allButtonText[2][setLang]
    document.getElementById("btn-webaruhaz").textContent=data.allButtonText[3][setLang]
    document.getElementById("btn-submit").textContent=data.allButtonText[5][setLang]
    document.querySelectorAll(".arlista-btn").forEach(item=>item.textContent=data.allButtonText[4][setLang])

        
    for(let i = 0; i<data.sectionTitle.hu.length; i++){
      document.querySelectorAll(".nav__link")[i].textContent=data.sectionTitle[setLang][i]
    }

    for(let i = 0; i<data.sectionTitle.hu.length-1; i++){
      document.querySelectorAll(".section-title")[i].textContent=data.sectionTitle[setLang][i+1]
      document.querySelectorAll(".section-subtitle")[i].textContent=data.sectionSubTitle[setLang][i]
    }

    for(let i = 0; i<data.servicesItems.length; i++){
      document.querySelectorAll(".szolgaltatasok-item-title")[i].textContent=data.servicesItems[i].title[setLang]
      document.querySelectorAll(".szolgaltatasok-item-content")[i].textContent=data.servicesItems[i].content[setLang]
    }

    for(let i = 0; i<data.portfolioItems.length; i++){
      if(portfolioItem[i].classList.contains("weboldal")){
        portfolioItemSpan[i].textContent=data.website[setLang]+" · "+data.portfolioItems[i][setLang]
      }
      else if(portfolioItem[i].classList.contains("webaruhaz")){
        portfolioItemSpan[i].textContent=data.webshop[setLang]+" · "+data.portfolioItems[i][setLang]
      }
    }

    for(let i = 0; i<data.priceCategoriesTitle.length; i++){
      document.querySelectorAll(".arlista-main-title")[i].textContent=data.priceCategoriesTitle[i][setLang]
    }

    document.querySelectorAll(".arlista-sub-title")[0].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-sub-title")[1].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-sub-title")[2].textContent=data.webshop[setLang]
    document.querySelector(".nepszeru").textContent=data.bestSeller[setLang]

    for(let i = 0; i<data.introductiveWebsite.length; i++){
      document.querySelectorAll(".arlista-list-introduction")[i].textContent=data.introductiveWebsite[i][setLang]
    }
    for(let i = 0; i<data.premiumWebsite.length; i++){
      document.querySelectorAll(".arlista-list-premium")[i].textContent=data.premiumWebsite[i][setLang]
    }
    for(let i = 0; i<data.businessWebshop.length; i++){
      document.querySelectorAll(".arlista-list-business")[i].textContent=data.businessWebshop[i][setLang]
    }

    document.querySelectorAll(".amount").forEach(item=>!lang ? item.style.order=2 : null)
    document.querySelectorAll(".tol").forEach(item=>{
      if(!lang){
        item.style.order=1
        item.textContent="from"
      }
      else{
        item.style.order=3
        item.textContent="-tól"
      }
    })
    document.querySelectorAll(".ft").forEach(item=>{
      if(!lang){
        item.style.order=3
        item.textContent="HUF"
      }
      else{
        item.textContent="Ft"
      }
    })

  })
}


menuBtn.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
})

navLinks.forEach(item=>item.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
  navLinks.forEach(link=>link.classList.remove("current-link"))
  item.classList.add("current-link")
}))


function displayCharacters(){

  lang ? myString = ["Weboldal?","Webáruház?","Portfólió?"] : myString = ["Website?","Webshop?","Portfolio?"]

  const kiir = setInterval(()=>{
    if(currentChar===myString[currentPhrase].length){
        clearInterval(kiir)
        setTimeout(deleteCharacters, 2000)
    }
    else{
        currentChar++
        text.innerHTML+=myString[currentPhrase].split("")[currentChar-1]
    }
  },70)

}

function deleteCharacters(){
  const torol = setInterval(()=>{
    if(currentReverse!==-myString[currentPhrase].length){
        currentReverse--    
        text.innerHTML=myString[currentPhrase].slice(0,currentReverse)
    }
    else{
        clearInterval(torol)
        currentChar = 0
        currentReverse = 0
        currentPhrase<myString.length-1 ? currentPhrase++ : currentPhrase=0
        displayCharacters()
    }
  },40)  
}

const cursorBlinking = setInterval(()=>{
    if(text.innerHTML.length===0 || text.innerHTML.length===myString[currentPhrase].length || !isBlinking){
      if(isBlinking){
        isBlinking=!isBlinking
        blinkingCursor.style.display="none"
      }
      else{
        isBlinking=!isBlinking
        blinkingCursor.style.display="inline"
      }
    }
  },450)

displayCharacters()



/* Navbar Add Background on scroll */
let currentSection = ""
window.onscroll = () => {
  window.scrollY > 200 ? navbar.classList.add('nav-active') : navbar.classList.remove('nav-active')

  sections.forEach((section) => {
  const sectionTop = section.offsetTop
  scrollY >= sectionTop - 500 ? currentSection=section.getAttribute("id") : null

})
  document.body.className=currentSection
}


/* Portfólió */

const links = document.querySelectorAll(".portfolio-btn")
links.forEach(link=>{
  link.addEventListener("click",()=>{
    links.forEach(item=>item.classList.remove("btn-current"))
    const currentLink = link.getAttribute("id")
    document.getElementById(currentLink).classList.add("btn-current")

    if(currentLink==="btn-weboldal"){
      document.querySelectorAll(".webaruhaz").forEach(item=>{
        item.classList.add("portfolio-hidden")
      })
      document.querySelectorAll(".weboldal").forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
    else if(currentLink==="btn-webaruhaz"){
      document.querySelectorAll(".weboldal").forEach(item=>{
        item.classList.add("portfolio-hidden")
      })
      document.querySelectorAll(".webaruhaz").forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
    else{
      document.querySelectorAll(".portfolio-item").forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
  })
})

/* Kapcsolat */

document.getElementById("kapcsolat-form").addEventListener("submit",(e)=>{
  e.preventDefault()
  alert("Sikeres üzenetküldés!")
})

