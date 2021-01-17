
// возвращает cookie если есть или undefined
  window.getCookie = function(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }



// уcтанавливает cookie
  window.setCookie = function(name, value, props) {
    props = props || {}

    var exp = props.expires

    if (typeof exp == "number" && exp) {

      var d = new Date()

      d.setTime(d.getTime() + exp*1000)

      exp = props.expires = d

    }

    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

    value = encodeURIComponent(value)

    var updatedCookie = name + "=" + value

    for(var propName in props){
      updatedCookie += "; " + propName

      var propValue = props[propName]

      if(propValue !== true){ updatedCookie += "=" + propValue }
    }

    document.cookie = updatedCookie
  }

// удаляет cookie
  window.deleteCookie = function(name) {
    setCookie(name, null, { expires: -1 })
  }





//установка и удаление ивент листнеров
  window.configOfEventListeners = (function() {
    let arrOfEventsObj = [];

    return function(destroy, eventObj) {
      if(!destroy){
        eventObj.target.addEventListener(eventObj.type, eventObj.func);

        arrOfEventsObj.push(eventObj);
      } else if(destroy == "current" && arrOfEventsObj.length != 0){

        arrOfEventsObj.forEach((eventObjCopy) => {
          let index = arrOfEventsObj.indexOf(eventObjCopy);

          if(eventObj.type == eventObjCopy.type && eventObj.target == eventObjCopy.target && eventObj.func == eventObjCopy.func){
            eventObjCopy.target.removeEventListener(eventObjCopy.type, eventObjCopy.func);

            arrOfEventsObj.splice(index, 1);
          }
        });

      } else {
        arrOfEventsObj.forEach((eventObjCopy) => {
          eventObjCopy.target.removeEventListener(eventObjCopy.type, eventObjCopy.func);
        });

        arrOfEventsObj = [];
      }
    };
  })();
//**OVER**
