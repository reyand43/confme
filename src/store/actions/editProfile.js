import {
  CHANGE_USER_NAME,
  LOAD_USERNAME_FROM_SERVER, LOAD_CONTACTS_FROM_SERVER, LOAD_CAREER_FROM_SERVER, LOAD_INTERESTS_FROM_SERVER,
  CLEAR_USER_NAME,
  CHANGENAME,
  CHANGESURNAME,
  CHANGEAGE,
  CHANGECOMPANY,
  CHANGEPROFESSION,
  CHANGECOUNTRY,
  CHANGECITY,
  CHANGEPHONE,
  CHANGEPURPOSE,
  CHANGE_EDITOR,
  CHANGE_SEX,
  CHANGE_LOOK, CHANGE_SUGGEST, CHANGE_HOBBY,
  CHANGE_VKONTAKTE, CHANGE_FACEBOOK, CHANGE_LINKEDIN, CHANGE_INSTAGRAM,
  CHANGE_WORKPLACE, CHANGE_COMPANYNAME, CHANGE_POSITION,
  CHANGE_CONTACTS_INFO, CHANGE_CAREER_INFO, CHANGE_HOBBY_INFO
} from "./actionTypes";
import axios from "../../axios/axios";

export function changeEditor(activeEdit) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_EDITOR,
      activeEdit
    });
  };
}

export function updateUserName(name, surname, ageValue, sexValue, countryValue, cityValue) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER_NAME,
      name,
      surname,
      ageValue,
      sexValue,
      countryValue,
      cityValue
    });
  };
}

export function updateContactInfo(phoneValue, vkontakteValue, facebookValue, linkedinValue, instagramValue) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CONTACTS_INFO,
      phoneValue,
      vkontakteValue,
      facebookValue,
      linkedinValue,
      instagramValue
    });
  };
}

export function updateCareerInfo(workplaceValue, companynameValue, positionValue) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CAREER_INFO,
      workplaceValue,
      companynameValue,
      positionValue
    });
  };
}

export function updateHobbyInfo(lookValue, suggestValue, hobbyValue) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_HOBBY_INFO,
      lookValue,
      suggestValue,
      hobbyValue
    });
  };
}

export function loadUserNameFromServer() {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`/users/${userId}/personalData.json`);

      const name = response.data.Name;
      const surname = response.data.Surname;
      const accType = response.data.AccountType;
      const userData = response.data;
      dispatch({
        type: LOAD_USERNAME_FROM_SERVER,
        name,
        surname,
        accType,
        userData
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function loadContactsFromServer() {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`/users/${userId}/personalData.json`);
      const accType = response.data.AccountType;
      const userData = response.data;
      dispatch({
        type: LOAD_CONTACTS_FROM_SERVER,
        accType,
        userData
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function loadCareerFromServer() {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`/users/${userId}/personalData.json`);
      const accType = response.data.AccountType;
      const userData = response.data;
      dispatch({
        type: LOAD_CAREER_FROM_SERVER,
        accType,
        userData
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function loadInterestsFromServer() {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`/users/${userId}/personalData.json`);
      const accType = response.data.AccountType;
      const userData = response.data;
      dispatch({
        type: LOAD_INTERESTS_FROM_SERVER,
        accType,
        userData
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearUserName() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER_NAME,
    });
  };
}

export function changeValue(name, value) {
  return (dispatch) => {
    switch (name) {
      case "Name":
        dispatch({
          type: CHANGENAME,
          value,
        });
      case "Surname":
        dispatch({
          type: CHANGESURNAME,
          value,
        });
      case "Age":
        dispatch({
          type: CHANGEAGE,
          value,
        });
      case "Country":
        dispatch({
          type: CHANGECOUNTRY,
          value,
        });
      case "City":
        dispatch({
          type: CHANGECITY,
          value,
        });
      case "Company":
        dispatch({
          type: CHANGECOMPANY,
          value,
        });
      case "Profession":
        dispatch({
          type: CHANGEPROFESSION,
          value,
        });
      case "Phone":
        dispatch({
          type: CHANGEPHONE,
          value,
        });
      case "Purpose":
        dispatch({
          type: CHANGEPURPOSE,
          value,
        });
      case 'Sex':
        dispatch({
          type: CHANGE_SEX,
          value,
        });
      case 'Look':
        dispatch({
          type: CHANGE_LOOK,
          value,
        });
      case 'Suggest':
        dispatch({
          type: CHANGE_SUGGEST,
            value,
        });
      case 'Hobby':
        dispatch({
          type: CHANGE_HOBBY,
          value,
        });
      case 'Vkontakte':
        dispatch({
          type: CHANGE_VKONTAKTE,
          value,
        });
      case 'Facebook':
        dispatch({
          type: CHANGE_FACEBOOK,
          value,
        });
      case 'Linkedin':
        dispatch({
          type: CHANGE_LINKEDIN,
          value,
        });
      case 'Instagram':
        dispatch({
          type: CHANGE_INSTAGRAM,
          value,
        });
      case 'WorkPlace':
        dispatch({
          type: CHANGE_WORKPLACE,
          value,
        });
      case 'CompanyName':
        dispatch({
          type: CHANGE_COMPANYNAME,
          value,
        });
      case 'Position':
        dispatch({
          type: CHANGE_POSITION,
          value,
        });
      default: return null;
    }
  };
}
