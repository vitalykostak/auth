import { injectable } from 'tsyringe';
import { AuthSession } from './types';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/shared/lib/localstorage';

const sessionRepositoryKey = '@auth_session';

@injectable()
export class SessionRepository {
  constructor() {}

  saveSession(session: AuthSession) {
    setToLocalStorage(sessionRepositoryKey, session);
  }

  getSession(): AuthSession | null {
    return getFromLocalStorage(sessionRepositoryKey, null);
  }

  removeSession() {
    removeFromLocalStorage(sessionRepositoryKey);
  }
}
