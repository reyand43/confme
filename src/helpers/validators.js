import React from 'react'
import is from 'is_js';

export function numberValidator(value, isRequired) {
  if (isRequired && value.trim() === "") {
    return false;
  }
  if (value.trim() === "") {
    return true;
  }
  var reg = new RegExp("^[0-9]+$");
  
  return reg.test(value);
}

export function textValidator(value, isRequired) {
  if (isRequired && value.trim() === "") {
    return false;
  }
  if (value.trim() === "") {
    return true;
  }
  var reg = new RegExp("[A-Za-zА-яа-я]+$");
  return reg.test(value);
}

export function linkValidator(value, isRequired) {
  console.log('link')
    if (isRequired && value.trim() === "") {
      console.log('isRequired')
      return false;
    }
    if (value.trim() === "") {
      console.log('trim')
      return true;
    }
    console.log('!!!', is.url(value))
    return is.url(value);
  }

  export function phoneValidator(value, isRequired) {
    if (isRequired && value.trim() === "") {
      return false;
    }
    if (value.trim() === "") {
      return true;
    }
    var reg = new RegExp("/\+7\d{10}");
    return reg.test(value);
  }
  