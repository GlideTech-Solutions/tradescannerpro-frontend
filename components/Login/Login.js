import { useTheme } from "@/context/ThemeContext";
import "./login.scss";
import PageLogo from "../PageLogo/PageLogo";
import { useState } from "react";
export default function Login() {
  const { isDarkMode } = useTheme();
  const UserIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5"/>
  </svg>
);

const LockIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M17 8h-1V6a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2M9 6a3 3 0 1 1 6 0v2H9zm3 12a2 2 0 0 1-1-3.732V13h2v1.268A2 2 0 0 1 12 18"/>
  </svg>
);

const EyeIcon = ({ off=false }) => (
  off ? (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M2 4.27L3.28 3L21 20.72L19.73 22l-3.06-3.06C15.49 19.61 13.82 20 12 20C7 20 2.73 16.55 1 12c.62-1.58 1.67-3.03 3-4.2zm11.18 11.18L13 14.27a3 3 0 0 1-3-3l-1.18-1.18A5 5 0 0 0 7 12a5 5 0 0 0 6.18 3.45M12 6a5 5 0 0 1 5 5c0 .7-.15 1.36-.41 1.95l3.1 3.1C21.42 14.73 23 13 23 12c-1.73-4.55-6-8-11-8c-1.82 0-3.49.39-5 .95l2.06 2.06A6.83 6.83 0 0 1 12 6"/>
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 4C7 4 2.73 7.45 1 12c1.73 4.55 6 8 11 8s9.27-3.45 11-8c-1.73-4.55-6-8-11-8m0 14a6 6 0 1 1 6-6a6 6 0 0 1-6 6m0-10a4 4 0 1 0 4 4a4 4 0 0 0-4-4"/>
    </svg>
  )
);
const [pwVisible, setPwVisible] = useState(false);
  return (
    <>
      <div className="login-page">
        <div className="login-box">
            <PageLogo />
           <h1 className={`${isDarkMode ? 'dark' : ''}`}>Login</h1>
          <form>
            <div className="field">
          <div className="iconLeft"><UserIcon /></div>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            required
          />
          <div className="iconRight" />
        </div>
           <div className="field">
          <div className="iconLeft"><LockIcon /></div>
          <input
            className="input"
            type={pwVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="eyeBtn"
            onClick={()=>setPwVisible(v=>!v)}
            aria-label={pwVisible ? "Hide password" : "Show password"}
            title={pwVisible ? "Hide password" : "Show password"}
          >
            <EyeIcon off={pwVisible}/>
          </button>
        </div>

        <div className="check">
          <input id="remember" name="remember" type="checkbox" defaultChecked />
          <label htmlFor="remember">Remember Me</label>
        </div>

            <div className='run-button-alignment'>
                        <button> <img src='/assets/icons/user-key.svg' alt='User Key icon' />Log In</button>
                    </div>
          </form>
        </div>
        <div className="login-info">
          <img src="/assets/images/login-icon.png" alt="login img" />
        </div>
      </div>
    </>
  );
}
