import {useAppSelector} from './index.ts';
import {AuthorizationStatus} from '../../const.tsx';
import {getUserStatus} from '../../features/selectors/selectors.ts';

export function useAuth() {
  const status = useAppSelector(getUserStatus);

  return status === AuthorizationStatus.Auth;
}
