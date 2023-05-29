type LoginDialogProps = { csrfToken: string };

export const LoginDialog = ({ csrfToken }: LoginDialogProps) => {
  return (
    <div
      className="dialog"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form
        style={{
          border: '1px solid black',
          backgroundColor: '#eee',
          color: 'black'
        }}
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
