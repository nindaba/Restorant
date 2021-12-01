export interface Token{
    sub: string;
    iss: string;
    exp: number;
    iat: number;
    payload:{
      email: string;
      userType: string;
      username: string;
    } 
  }