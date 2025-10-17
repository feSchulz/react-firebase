import styles from "./Login.module.css"
import { useAuthentication } from "../../hooks/UseAthentication";
import { useState, useEffect } from "react";

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {     
      email,
      password
    };
    
    const res = await login(user);
    console.log(res);  


  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o loguin para ultilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail de usuario"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="insira sua senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
       
        {!loading && <button className="btn"> Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            {" "}
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login