var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};
var counter = 0;

// day-night
var elDayBrightForm = $_(`.js-day-nigt-form`)
var elBright = $_(`.js-day`);
var elNight = $_(`.js-night`);

// console.log(elBright.value);
// console.log(elNigt.value);
// search form
var elSearchForm = document.querySelector(`.js-search-form`);
var elInputTech = document.querySelector(`.js-search-tech`);
var elInputLocation = document.querySelector(`.js-search-location`);
var elInputTime = document.querySelector(`.js-search-time`);
var elInputPay = document.querySelector(`.js-search-pay`);
var elListCard = document.querySelector(`.js-card-list`);

// add offer form
var elAddOfferForm = document.querySelector(`.js-add-offer-form`);
var elAddOfferTitle = document.querySelector(`.js-add-offer-title`);
var elAddOfferComp = document.querySelector(`.js-add-offer-comp`);
var elAddOfferTech = document.querySelector(`.js-add-offer-tech`);
var elAddOfferTelegram = document.querySelector(`.js-add-offer-telegram`);
var elAddOfferNumber = document.querySelector(`.js-add-offer-number`);
var elAddOfferLocation = document.querySelector(`.js-add-offer-location`);
var elAddOfferResponsible = document.querySelector(`.js-add-offer-respon`);
var elAddOfferTime = document.querySelector(`.js-add-offer-time`);
var elAddOfferPay = document.querySelector(`.js-add-offer-pay`);
var elAddOfferMore = document.querySelector(`.js-add-offer-more`);

var elTempletCard = document.querySelector(`.js-card-templet`).content;
// modal
var elModal = document.querySelector(`.js-form-modal`);
var elBtnModal = document.querySelector(`.js-modal-open-toggle`);
var elBtnCloseModal = document.querySelector(`.js-modal-close-btn`);

// card modal
var elCardList = $_(`.js-show-announcement-output`);
var elCardTitle = $_(`.js-elon-title`);
var elCardComp = $_(`.js-company-name`);
var elCardWhere = $_(`.js-company-where`);
var elCardSkill = $_(`.js-skills-output`);
var elCardTelegram = $_(`.js-telegram-output`);
var elCardPhoneNumber = $_(`.js-phone-output`);
var elCardRespon = $_(`.js-masul-output`);
var elCardTime = $_(`.js-time-output`);
var elCardMoney = $_(`.js-money-output`);
var elCardMore = $_(`.js-more-output`);


//  theme ni o'zgartirish ishlari olib borilgan (bu yerda)
var theme = localStorage.getItem(`theme`) || `light`;

if (theme === 'dark') {
  document.body.classList.add('mindnight');
  elNight.checked = true;
} else if (theme === 'light') {
  document.body.classList.remove('mindnight');
}

elDayBrightForm.addEventListener(`change`, function (evt){
  evt.preventDefault();
  evt.target.matches(`input`);
  if(theme === `light`){
    theme = `dark`
    document.body.classList.add(`mindnight`);
    elNight.checked = true;
    localStorage.setItem(`theme`, theme);
  }else if(theme === `dark`) {
    theme = `light`
    document.body.classList.remove(`mindnight`);
    localStorage.setItem(`theme`, theme);
  }
});

var displayCard = function(array){
  
  elListCard.innerHTML = ``;
  var elCardFragment = document.createDocumentFragment();
  array.forEach(function (offer){
    counter++ ;
    var elItemCard = elTempletCard.cloneNode(true);
    
    $_(`.js-tem-time`, elItemCard).textContent = offer.time;
    $_(`.card-item__sector`, elItemCard).textContent = offer.title;
    $_(`.card-item__text`, elItemCard).textContent = offer.company;
    $_(`.card-item__where`, elItemCard).textContent = offer.location;
    $_(`.card-item__link`, elItemCard).dataset.dataId = offer.cardId;

    elCardFragment.appendChild(elItemCard);
  });
  elListCard.appendChild(elCardFragment);
}
var userOffers = JSON.parse(localStorage.getItem(`lastOffers`)) || [] ;


// modal ochilishi uchun
elBtnModal.addEventListener(`click`, function(evt){
  evt.preventDefault()
  elModal.classList.add(`form-modal--open`)
});
elBtnCloseModal.addEventListener(`click`, function(evt){
  elModal.classList.remove(`form-modal--open`)
});

displayCard(userOffers);

elAddOfferForm.addEventListener(`submit`, function(evt){
  evt.preventDefault();
  
  userOffers.push({
    title: elAddOfferTitle.value,
    company: elAddOfferComp.value,
    tech: elAddOfferTech.value.split(`,`),
    telegram: elAddOfferTelegram.value,
    phone: elAddOfferNumber.value,
    location: elAddOfferLocation.value,
    responsible: elAddOfferResponsible.value,
    time: elAddOfferTime.value,
    salary: elAddOfferPay.value,
    moreInfo: elAddOfferMore.value,
    cardId: counter
  });
  elAddOfferForm.reset();
  localStorage.setItem(`lastOffers`, JSON.stringify(userOffers));
  
  displayCard(userOffers);
});

elListCard.addEventListener(`click`, function(evt){
  if(evt.target.matches(`a`)) {
    var targetId = evt.target.dataset.dataId;
  }
  
  var cheakCard = userOffers.find(function (bilardim){
    return bilardim.cardId == targetId;
  });
    elCardTitle.textContent = cheakCard.title;
    elCardComp.textContent = cheakCard.company;
    elCardWhere.textContent = cheakCard.location;
    elCardSkill.textContent = cheakCard.tech;
    elCardTelegram.textContent = cheakCard.telegram;
    elCardPhoneNumber.textContent = cheakCard.phone;
    elCardRespon.textContent = cheakCard.responsible;
    elCardTime.textContent = cheakCard.time;
    elCardMoney.textContent = cheakCard.salary;
    elCardMore.textContent = cheakCard.moreInfo;
});

elSearchForm.addEventListener(`submit`, function(evt){
  evt.preventDefault();
  var elInputTechReGx = new RegExp(elInputTech.value, `gi`);

  var sortCard = userOffers.filter(function (userOffer){
    return userOffer.tech.some(function (skill){
      return skill.match(elInputTechReGx)
    }) && elInputLocation.value == userOffer.location || elInputTime.value == userOffer.time && elInputPay.value == userOffer.salary;
  });
  displayCard(sortCard);
console.log(sortCard);
});
// elInputTech
// elInputLocation
// elInputTime
// elInputPay
// elListCard
