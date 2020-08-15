!function (e) {
  var t = {};

  function s(i) {
    if (t[i]) return t[i].exports;
    var n = t[i] = {i: i, l: !1, exports: {}};
    return e[i].call(n.exports, n, n.exports, s), n.l = !0, n.exports
  }

  s.m = e, s.c = t, s.d = function (e, t, i) {
    s.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: i})
  }, s.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  }, s.t = function (e, t) {
    if (1 & t && (e = s(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var i = Object.create(null);
    if (s.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var n in e) s.d(i, n, function (t) {
      return e[t]
    }.bind(null, n));
    return i
  }, s.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return s.d(t, "a", t), t
  }, s.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, s.p = "", s(s.s = 1)
}([function (e, t, s) {
}, function (e, t, s) {
  "use strict";
  s.r(t), s.d(t, "options", (function () {
    return u
  }));
  s(0);

  class i {
    constructor(e) {
      this.getInitialCards = () => fetch(this.baseUrl + "/cards", {headers: this.headers}).then(e => this._getResponseData(e)), this.addCardPage = (e, t) => fetch(this.baseUrl + "/cards", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({name: e.value, link: t.value})
      }).then(e => this._getResponseData(e)), this.getUsersInfo = () => fetch(this.baseUrl + "/users/me", {headers: this.headers}).then(e => this._getResponseData(e)), this.updateUserInfo = (e, t) => fetch(this.baseUrl + "/users/me", {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({name: e, about: t})
      }).then(e => this._getResponseData(e)), this.removeCard = e => fetch(`${this.baseUrl}/cards/${e}`, {
        method: "DELETE",
        headers: this.headers
      }).then(e => this._getResponseData(e)), this.setLikeCard = e => fetch(`${this.baseUrl}/cards/like/${e}`, {
        method: "PUT",
        headers: this.headers
      }).then(e => this._getResponseData(e)), this.unLikeCard = e => fetch(`${this.baseUrl}/cards/like/${e}`, {
        method: "DELETE",
        headers: this.headers
      }).then(e => this._getResponseData(e)), this._getResponseData = e => e.ok ? e.json() : Promise.reject("Ошибка: " + e.status), this.baseUrl = e.baseUrl, this.headers = e.headers
    }
  }

  class n {
    constructor(e, t, s, i, n) {
      this.like = () => {
        this.iconLikeButtonElement.classList.contains("place-card__like-icon_liked") ? this._likeState(!1, this._id).then(e => {
          this.likeCounterElement.textContent = e.likes.length, this.iconLikeButtonElement.classList.remove("place-card__like-icon_liked")
        }).catch(e => {
          alert(e)
        }) : this._likeState(!0, this._id).then(e => {
          this.likeCounterElement.textContent = e.likes.length, this.iconLikeButtonElement.classList.add("place-card__like-icon_liked")
        }).catch(e => {
          alert(e)
        })
      }, this.isLiked = () => {
        this.likes.some(e => e._id === this.ownerId) && this.iconLikeButtonElement.classList.add("place-card__like-icon_liked")
      }, this.setDeleteButton = () => {
        this.owner._id === this.ownerId && (this.iconDeleteButtonElement.style.display = "block")
      }, this.openImg = () => {
        this._openImageCallback(this._link)
      }, this.remove = () => {
        window.confirm("Вы действительно хотите удалить эту карточку?") && (this._removeCard(this._id), this.removeListeners(), this.placeCard.remove())
      }, this._link = e.link, this._name = e.name, this._id = e._id, this.likes = e.likes, this.owner = e.owner, this.ownerId = t, this._openImageCallback = s, this._removeCard = i, this._likeState = n
    }

    create() {
      return this.placeCard = document.createElement("div"), this.imageElement = document.createElement("div"), this.iconDeleteButtonElement = document.createElement("button"), this.descriptionElement = document.createElement("div"), this.nameElement = document.createElement("h3"), this.iconLikeButtonElement = document.createElement("button"), this.likeContainerElement = document.createElement("div"), this.likeCounterElement = document.createElement("div"), this.placeCard.classList.add("place-card"), this.imageElement.classList.add("place-card__image"), this.imageElement.setAttribute("style", "url"), this.imageElement.style.backgroundImage = "url(" + this._link, this.imageElement.style.cursor = "pointer", this.iconDeleteButtonElement.classList.add("place-card__delete-icon"), this.descriptionElement.classList.add("place-card__description"), this.nameElement.classList.add("place-card__name"), this.nameElement.textContent = this._name, this.likeContainerElement.classList.add("place-card__like-container"), this.iconLikeButtonElement.classList.add("place-card__like-icon"), this.likeCounterElement.classList.add("place-card__like-counter"), this.likeCounterElement.textContent = this.likes.length, this.placeCard.append(this.imageElement), this.imageElement.append(this.iconDeleteButtonElement), this.placeCard.append(this.descriptionElement), this.descriptionElement.append(this.nameElement), this.descriptionElement.append(this.likeContainerElement), this.likeContainerElement.append(this.iconLikeButtonElement), this.likeContainerElement.append(this.likeCounterElement), this.isLiked(), this.setDeleteButton(), this.setListeners(), this.placeCard
    }

    setListeners() {
      this.iconLikeButtonElement.addEventListener("click", this.like), this.iconDeleteButtonElement.addEventListener("click", this.remove), this.imageElement.addEventListener("click", this.openImg)
    }

    removeListeners() {
      this.iconLikeButtonElement.removeEventListener("click", this.like), this.iconDeleteButtonElement.removeEventListener("click", this.remove), this.imageElement.removeEventListener("click", this.openImg)
    }
  }

  class r {
    constructor(e, t) {
      this.addCard = e => {
        this._cardsList.append(e)
      }, this.render = () => {
        this._cardsArray.forEach(e => {
          this.addCard(e)
        })
      }, this._cardsList = e, this._cardsArray = t
    }
  }

  class o {
    constructor(e, t) {
      this.isValidate = e => (e.setCustomValidity(""), e.validity.valueMissing ? (e.setCustomValidity(this._errorMessages.valueMissing), !1) : e.validity.tooShort || e.validity.tooLong ? (e.setCustomValidity(this._errorMessages.tooShort), !1) : e.validity.typeMismatch && "url" === e.type ? (e.setCustomValidity(this._errorMessages.typeMismatch), !1) : e.checkValidity()), this.inputErrorAdd = e => {
        this.errorMessage = this._someForm.querySelector(`#${e.id}-error`), this.errorMessage.textContent = e.validationMessage
      }, this.isFieldValid = e => {
        const t = this.isValidate(e);
        return this.inputErrorAdd(e), t
      }, this.setSubmitButtonState = e => {
        e ? (this.button.removeAttribute("disabled"), this.button.classList.add("popup__button_valid")) : (this.button.setAttribute("disabled", "true"), this.button.classList.remove("popup__button_valid"))
      }, this.handlerInputForm = e => {
        this.isFieldValid(e.target), this._someForm.checkValidity() ? this.setSubmitButtonState(!0) : this.setSubmitButtonState(!1)
      }, this.resetErrorsPopup = () => {
        this.errors.forEach(e => e.textContent = "")
      }, this.setListeners = () => {
        this.errors = this._someForm.querySelectorAll(".error"), this.button = this._someForm.querySelector(".button"), this._someForm.addEventListener("input", this.handlerInputForm)
      }, this._someForm = e, this._errorMessages = t, this.setListeners()
    }
  }

  class a {
    constructor(e, t) {
      this._popupElement = e, this._closeButton = t, this.close = this.close.bind(this), this.setListeners()
    }

    open() {
      this._popupElement.classList.add("popup_is-opened")
    }

    close() {
      this._popupElement.classList.remove("popup_is-opened")
    }

    setListeners() {
      this._closeButton.addEventListener("click", this.close)
    }
  }

  class l extends a {
    constructor(e, t, s, i) {
      super(e, s), this.open = () => {
        this._clearPopup(), super.open()
      }, this.setListeners = () => {
        this._openButton.addEventListener("click", this.open)
      }, this._openButton = t, this._clearPopup = i, this.setListeners()
    }
  }

  class c {
    constructor() {
      this.setUserInfo = ({name: e, about: t, id: s}) => {
        this._name = e, this._about = t, this._id = s
      }, this.updateRender = (e, t) => {
        e.textContent = this._name, t.textContent = this._about
      }, this.getUserInfo = () => ({name: this._name, about: this._about, id: this._id})
    }
  }

  const h = {
    baseUrl: "https://praktikum.tk/cohort11",
    headers: {authorization: "3d586cb3-b972-4364-9e4e-d3f459cab5c9", "Content-Type": "application/json"}
  }, d = JSON.stringify(h), u = JSON.parse(d);
  !function () {
    const e = {
        valueMissing: "Это обязательное поле",
        tooShort: "Должно быть от 2 до 30 символов",
        typeMismatch: "Здесь должна быть ссылка"
      }, t = document.querySelector(".root"), s = t.querySelector(".places-list"),
      h = t.querySelector(".user-info__name"), d = t.querySelector(".user-info__job"),
      p = t.querySelector(".user-info__edit"), m = t.querySelector(".popup__close_type_profile"),
      _ = t.querySelector(".popup_type_profile"), E = t.querySelector(".user-info__photo"),
      k = t.querySelector("#edit"), b = t.querySelector(".popup__input_type_user"),
      f = t.querySelector(".popup__input_type_about"), y = t.querySelector(".user-info__button"),
      g = t.querySelector(".popup__close_type_card"), v = t.querySelector(".popup_type_card"),
      L = t.querySelector("#new"), S = [], C = t.querySelector(".popup__close_type_image"),
      B = t.querySelector(".popup_type_image"), I = t.querySelector(".popup__image"), q = new r(s, S),
      w = new l(_, p, m, A), D = new l(v, y, g, A), U = new a(B, C), M = new o(L, e), P = new o(k, e), x = new c,
      O = new i(u);

    function j(e) {
      I.src = e, U.open()
    }

    function R(e, t) {
      return e ? O.setLikeCard(t) : O.unLikeCard(t)
    }

    function F(e) {
      O.removeCard(e).catch(e => {
        console.log(e)
      })
    }

    function V(e) {
      e.reset()
    }

    function A() {
      M.resetErrorsPopup(), P.resetErrorsPopup(), M.setSubmitButtonState(!1)
    }

    O.getInitialCards().then(e => {
      q.render(void e.forEach((function (e) {
        const t = new n(e, x._id, j, F, R).create();
        S.push(t)
      })))
    }).catch(e => {
      console.log(e)
    }), O.getUsersInfo().then(e => {
      x.setUserInfo({
        name: e.name,
        about: e.about,
        id: e._id
      }), x.updateRender(h, d), E.style.backgroundImage = `url(${e.avatar})`
    }).catch(e => {
      console.log(e)
    }), g.addEventListener("click", () => {
      V(L)
    }), p.addEventListener("click", (function () {
      const e = x.getUserInfo();
      b.value = e.name, f.value = e.about, P.setSubmitButtonState(!0)
    })), L.addEventListener("submit", (function (e) {
      e.preventDefault();
      const t = L.elements.link, s = L.elements.name;
      M.setSubmitButtonState(!1), O.addCardPage(s, t).then(e => {
        const t = new n(e, x._id, j, F, R);
        q.addCard(t.create()), V(L), D.close()
      }).catch(e => {
        alert(e)
      }).finally(() => {
        M.setSubmitButtonState(!0)
      })
    })), k.addEventListener("submit", (function (e) {
      e.preventDefault();
      const t = b.value, s = f.value;
      O.updateUserInfo(t, s).then(e => {
        x.setUserInfo({name: e.name, about: e.about}), x.updateRender(h, d), w.close()
      }).catch(e => {
        alert(e)
      })
    }))
  }()
}]);