import {User} from './user';

export interface SigninResponse {
  user: User;
  accessToken: string;
}
