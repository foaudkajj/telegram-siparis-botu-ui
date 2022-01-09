import {FuseNavigation} from '@fuse/types';
import {UserStatus} from '../enums/UserStatus';

export interface LoginResponse {
  UserId: number;
  MerchantId: number;
  UserName: string;
  UserCode: string;
  UserStatus: UserStatus;
  Token: string;
  IsAuthenticated: boolean;
  NavigationItems: FuseNavigation[];
}
