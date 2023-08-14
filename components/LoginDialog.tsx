type LoginDialogProps = { csrfToken: string };

export const LoginDialog = ({ csrfToken }: LoginDialogProps) => {
  return (
    <div className="dialog">
      <form method="post" action="/api/auth/callback/credentials">
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
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
