import { useState } from 'react';
import { Alert } from './Alert';

export const RegisterDialog = () => {
  const [currUser, setCurrUser] = useState<string>('');
  const [currPass, setCurrPass] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const updateUser = () => {
    setIsError(false);
    let e = document.getElementById('userInput') as HTMLInputElement;
    setCurrUser(e.value);
  };

  const updatePass = () => {
    setIsError(false);
    let e = document.getElementById('passInput') as HTMLInputElement;
    setCurrPass(e.value);
  };

  const createUser = () => {
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username: currUser, password: currPass })
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.error(res?.message);
      })
      .catch((err) => console.error(err));
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
        Username: <input onChange={updateUser} id="userInput" type="text" />
      </div>
      <div>
        Password: <input onChange={updatePass} id="passInput" type="text" />
      </div>
      <div>
        <button onClick={createUser}>Register</button>
        <button onClick={() => {}}>Login</button>
      </div>
    </div>
  );
};
