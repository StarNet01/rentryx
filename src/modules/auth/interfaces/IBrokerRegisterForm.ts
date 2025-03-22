export interface IBrokerRegisterForm {
  firstName: string;
  lastName: string;
  companyName: string;
  officialID: string;
  passport: string;
  officialImage: string;
  emiratesID: string;
  email: string;
  phoneNumber: string;
  socialNetworks: ISocialNetwork[];
  logo: string;
  refrenceCompany: string[];
}

interface ISocialNetwork {
  platform: string;
  url: string;
}
