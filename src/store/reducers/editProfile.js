import {
  CHANGE_USER_NAME,
  LOAD_USERNAME_FROM_SERVER,
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
  CHANGE_EDITOR
} from "../actions/actionTypes";

const initialState = {
  name: "Неопознанный",
  surname: "Объект",
  accountType: "",
  userData: [],
  nameValue: "",
  surnameValue: "",
  ageValue: "",
  countryValue: "",
  cityValue: "",
  professionValue: "",
  companyValue: "",
  phoneValue: "",
  purposeValue: "",
  activeEdit: 0
};

export default function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EDITOR:
      return {
        ...state,
        activeEdit: action.activeEdit,
      }
    case CHANGE_USER_NAME:
      return {
        ...state,
        name: action.name,
        surname: action.surname,
        nameValue: action.name,
        surnameValue: action.surname
      };
    case LOAD_USERNAME_FROM_SERVER:
      return {
        ...state,
        name: action.name,
        surname: action.surname,

        accountType: action.accType,
        userData: action.userData,
        nameValue: action.userData.Name,
        surnameValue: action.userData.Surname,
        ageValue: action.userData.Age,
        countryValue: action.userData.Country,
        cityValue: action.userData.City,
        purposeValue: action.userData.Purpose,
        phoneValue: action.userData.Phone,
        companyValue: action.userData.Company,
        professionValue: action.userData.Profession,
      };
    case CLEAR_USER_NAME:
      return {
        ...state,
        nameValue: "Неопознанный",
        surnameValue: "Объект",
        accountType: "Гость",
      };
    case CHANGENAME:
      return {
        ...state,
        nameValue: action.value,
      };
    case CHANGESURNAME:
      return {
        ...state,
        surnameValue: action.value,
      };
    case CHANGEAGE:
      return {
        ...state,
        ageValue: action.value,
      };
    case CHANGECOUNTRY:
      return {
        ...state,
        countryValue: action.value,
      };
    case CHANGECITY:
      return {
        ...state,
        cityValue: action.value,
      };
    case CHANGEPROFESSION:
      return {
        ...state,
        professionValue: action.value,
      };
    case CHANGECOMPANY:
      return {
        ...state,
        companyValue: action.value,
      };
    case CHANGEPHONE:
      return {
        ...state,
        phoneValue: action.value,
      };
    case CHANGEPURPOSE:
      return {
        ...state,
        purposeValue: action.value,
      };
    default:
      return state;
  }
}
