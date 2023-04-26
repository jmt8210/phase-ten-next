import { default as dialog_styles } from '@/styles/Dialog.module.sass';
import { useState } from 'react';
import { Alert } from './Alert';
import { FaPlusCircle } from 'react-icons/fa';
import { Button } from './Button';

export const CreateGameDialog = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [currUser, setCurrUser] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const updateUser = () => {
    setIsError(false);
    let e = document.getElementById('userInput') as HTMLInputElement;
    setCurrUser(e.value);
  };

  const createGame = () => {
    fetch('/api/create_game')
      .then((res) => {
        if (res.status !== 200) return { name: 'no' };
        else res.json();
      })
      .then((res) => console.log(res?.name))
      .catch((err) => console.error(err));
  };

  const addPlayer = () => {
    if (!users.includes(currUser)) setUsers([...users, currUser]);
  };

  return (
    <div className={dialog_styles.dialog}>
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
        {/* <button
          className={create_game_styles.create_dialog_button}
          onClick={createGame}
        >
          Create
        </button> */}
        <Button>
          <>test</>
        </Button>
      </div>
    </div>
  );
};
