import { UserApiMock } from '@/shared/api/UserApi';
import { container, injectable } from 'tsyringe';

type AuthLoginProps = { email: string; password: string };
type AuthLoginResponse = {
  id: string;
  email: string;
  token: string;
};

@injectable()
export class AuthService {
  constructor(private readonly userApi: UserApiMock) {}

  async login(data: AuthLoginProps): Promise<AuthLoginResponse> {
    return await this.userApi.login(data);
  }
}

export const authService = container.resolve(AuthService);
