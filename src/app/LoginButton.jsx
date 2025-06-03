import { useGoogleLogin } from "@react-oauth/google";

function LoginButton({ onSuccess, onError }) {
  const login = useGoogleLogin({
    onSuccess: (response) => onSuccess(response.access_token),
    onError: (err) => onError(err),
    scope: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/forms.body.readonly",
      "https://www.googleapis.com/auth/forms.responses.readonly",
    ].join(" "),
  });

  return <button onClick={() => login()}>Sign in with Google</button>;
}

export default LoginButton;
