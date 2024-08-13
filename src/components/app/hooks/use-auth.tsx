import {useAppSelector} from './index.ts';
import {AuthorizationStatus} from '../../../const.tsx';

export function useAuth() {
  const status = useAppSelector((state) => state.user.status);

  return status === AuthorizationStatus.Auth;
}
