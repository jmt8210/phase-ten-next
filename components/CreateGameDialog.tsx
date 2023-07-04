import { useState } from 'react';
import { Alert } from './Alert';
import { FaPlusCircle } from 'react-icons/fa';
import { Button } from './Button';

import { useRouter } from 'next/navigation';

export const CreateGameDialog = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [currUser, setCurrUser] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const { push } = useRouter();

  const updateUser = () => {
    setIsError(false);
    let e = document.getElementById('userInput') as HTMLInputElement;
    setCurrUser(e.value);
  };

  const createGame = () => {
    fetch('/api/create_game', {
      method: 'POST',
      body: JSON.stringify({ player_names: users, player: 'justin' })
    })
      .then(async (res) => {
        return res.status !== 200 ? { game_id: -1 } : res.json();
      })
      .then((res) => {
        push(`/game/${res?.game_id}`);
      })
      .catch((err) => console.error(err));
  };

  const addPlayer = () => {
    if (!users.includes(currUser)) setUsers([...users, currUser]);
  };

  return (
    <div className="dialog">
      {isError ? (
        <div style={{ marginBottom: 10 }}>
          <Alert
            message={`User with name ${currUser} could not be found`}
            type="error"
          />
        </div>
      ) : (
        <></>
      )}
      <div>
        User: <input onChange={updateUser} id="userInput" type="text" />
        <FaPlusCircle
          style={{ marginLeft: 20 }}
          color="#005524"
          onClick={addPlayer}
        />
      </div>
      <div>
        {users.map((username) => (
          <p key={username}>{username}</p>
        ))}
      </div>
      <div>
        <button onClick={createGame}>Create</button>
        <Button>test</Button>
      </div>
    </div>
  );
};
