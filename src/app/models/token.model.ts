export interface Token{
    sub: string;
    iss: string;
    exp: number;
    iat: number;
    payload:{
      userId: string;
      userType: string;
      username: string;
    } 
  }