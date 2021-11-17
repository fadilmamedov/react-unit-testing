import { useUser } from 'hooks/api/useUser';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { searchStringState } from 'state/todos';

import { LogoutButton } from './LogoutButton';
import { SearchInput } from './SearchInput';
import { UserInfo } from './UserInfo';

export const Header = () => {
  const history = useHistory();
  const { user } = useUser();

  const [searchString, setSearchString] = useRecoilState(searchStringState);

  return (
    <div className="p-4 px-6 bg-white shadow sticky top-0 z-10">
      <div className="flex items-center">
        <SearchInput value={searchString} onChange={setSearchString} className="flex-1" />

        {user && <UserInfo fullName={user?.name} avatarURL={user?.avatarURL} className="ml-10" />}

        <LogoutButton
          className="ml-3"
          onClick={() => {
            history.push('/login');
          }}
        />
      </div>
    </div>
  );
};
