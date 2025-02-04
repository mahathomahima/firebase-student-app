import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './index.css'

function Login({ setUser }) {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log(auth.currentUser)
        setUser(auth.currentUser);
      } catch (err) {
        console.log(err.message)
        setError("Invalid credentials");
      }
    };

    const renderPasswordField = () => {
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )
    }

    const renderEmailField = () => {
      return (
        <>
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </>
      )
    }

    const renderUsername = () => {
      return (
        <>
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </>
      )
    }
    


    return (
      <div className="container">
        <form className="form-container" onSubmit={handleLogin}>
          <div className='form-toggle'>
            <button type="button" className={isLogin? 'active' : ''} onClick={() => setIsLogin(true)}>
                Login
            </button>
            <button type="button" className={!isLogin? 'active' : ''} onClick={() => setIsLogin(false)}>
                SignUp
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {isLogin ? (
            <div className='form'>
            <h2>Login Form</h2>
            <div className="input-container">{renderEmailField()}</div>
            <div className="input-container">{renderPasswordField()}</div>
            <a href='#signup'>Forgot Password?</a>
            <button className="login-button" type="submit">Login</button>
            <p>Not a Member? <a href='#signup'>SignUp now</a></p>
          </div>
          ):(
            <div className='form'>
            <h2>SignUp Form</h2>
            <div className="input-container">{renderUsername()}</div>
            <div className="input-container">{renderEmailField()}</div>
            <div className="input-container">{renderPasswordField()}</div>
            <button className="login-button" type="submit">SignUp</button>
          </div>
          )}
        </form>
      </div>
    )
  }
export default Login


