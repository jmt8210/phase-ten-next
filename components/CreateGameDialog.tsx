import styles from '@/styles/CreateGameDialog.module.sass';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SyntheticEvent,
  useState
} from 'react';
import { Alert } from './Alert';
import useSwr from 'swr';

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
    <div className={styles.create_dialog}>
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
        Users: <input onChange={updateUser} id="userInput" type="text" />
        <button
          style={{ marginLeft: 20 }}
          className={styles.create_dialog_button}
          onClick={addPlayer}
        >
          Add player
        </button>
      </div>
      <div>
        {users.map((username) => (
          <p key={username}>{username}</p>
        ))}
      </div>
      <div>
        <button className={styles.create_dialog_button} onClick={createGame}>
          Create
        </button>
      </div>
    </div>
  );
};
