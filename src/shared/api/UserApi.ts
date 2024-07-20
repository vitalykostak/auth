import { injectable } from 'tsyringe';

type LoginProps = { email: string; password: string };
type LoginResponse = {
  id: string;
  email: string;
  token: string;
};

export interface UserApiInterface {
  login: (data: LoginProps) => Promise<LoginResponse>;
}

@injectable()
export class UserApiMock implements UserApiInterface {
  constructor() {}

  login(data: LoginProps): Promise<LoginResponse> {
    console.log('fetch', data); //fetch
    return Promise.resolve({
      id: '12345565667',
      email: data.email,
      token: 'jwt_token',
    });
  }
}
