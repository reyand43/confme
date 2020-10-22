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
        surnameValue: action.surname,
        ageValue: action.ageValue,
        sexValue: action.sexValue,
        countryValue: action.countryValue,
        cityValue: action.cityValue
      };
    case CHANGE_CONTACTS_INFO:
        return {
          ...state,
          phoneValue: action.phoneValue,
          vkontakteValue: action.vkontakteValue,
          facebookValue: action.facebookValue,
          linkedinValue: action.linkedinValue,
          instagramValue: action.instagramValue
        };
    case CHANGE_CAREER_INFO:
        return {
          ...state,
          workplaceValue: action.workplaceValue,
          companynameValue: action.companynameValue,
          positionValue: action.positionValue
        };
    case CHANGE_HOBBY_INFO:
        return {
          ...state,
          lookValue: action.lookValue,
          suggestValue: action.suggestValue,
          hobbyValue: action.hobbyValue
        };
    case LOAD_USERNAME_FROM_SERVER:
      return {
        ...state,
        name: action.name,
        surname: action.surname,
        age: action.age,

        accountType: action.accType,
        userData: action.userData,
        nameValue: action.userData.Name,
        surnameValue: action.userData.Surname,
        ageValue: action.userData.Age,
        sexValue: action.userData.Sex,
        countryValue: action.userData.Country,
        cityValue: action.userData.City,
        purposeValue: action.userData.Purpose,
        phoneValue: action.userData.Phone,
        companyValue: action.userData.Company,
        professionValue: action.userData.Profession,
      };
    case LOAD_CONTACTS_FROM_SERVER:
      return {
        ...state,
        accountType: action.accType,
        userData: action.userData,
        phoneValue: action.userData.Phone,
        vkontakteValue: action.userData.Vkontakte,
        facebookValue: action.userData.Facebook,
        linkedinValue: action.userData.Linkedin,
        instagramValue: action.userData.Instagram
        };
    case LOAD_CAREER_FROM_SERVER:
      return {
        ...state,
        accountType: action.accType,
        userData: action.userData,
        workplaceValue: action.userData.WorkPlace,
        companynameValue: action.userData.CompanyName,
        positionValue: action.userData.Position
        };
    case LOAD_INTERESTS_FROM_SERVER:
      return {
        ...state,
        accountType: action.accType,
        userData: action.userData,
        lookValue: action.userData.Look,
        suggestValue: action.userData.Suggest,
        hobbyValue: action.userData.Hobby
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
    case CHANGE_SEX:
      return {
        ...state,
        sexValue: action.value,
      };
    case CHANGE_LOOK:
      return {
        ...state,
        lookValue: action.value,
      };
    case CHANGE_SUGGEST:
      return {
        ...state,
        suggestValue: action.value,
      };
    case CHANGE_HOBBY:
      return {
        ...state,
        hobbyValue: action.value,
      };
    case CHANGE_VKONTAKTE:
      return {
        ...state,
        vkontakteValue: action.value,
      };
    case CHANGE_INSTAGRAM:
      return {
        ...state,
        instagramValue: action.value,
      };
    case CHANGE_LINKEDIN:
      return {
        ...state,
        linkedinValue: action.value,
      };
    case CHANGE_FACEBOOK:
      return {
        ...state,
        facebookValue: action.value,
      };
    case CHANGE_WORKPLACE:
      return {
        ...state,
        workplaceValue: action.value,
      };
    case CHANGE_COMPANYNAME:
      return {
        ...state,
        companynameValue: action.value,
      };
    case CHANGE_POSITION:
      return {
        ...state,
        positionValue: action.value,
      };
    default:
      return state;
  }
}
