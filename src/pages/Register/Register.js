import { useAuthentication } from "../../hooks/UseAthentication";
import { db } from "../../firebase/config"
import { useState, useEffect } from "react";
import styles from "./Register.module.css";


const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswor, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      displayName,
      email,
      password
    };
    if (password !== confirmPasswor) {
      setError("As senhas precisam ser iguais!!")
      return;
    };
    const res = await createUser(user);
    console.log(res);  


  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.register}>
      <h1>Cadastre-se para Postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome de usuario"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </label>
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
        <label>
          <span>Comfirmação de Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPasswor}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
          />
        </label>
        {!loading && <button className="btn"> Cadastrar</button>}
        {loading && <button className="btn" disabled> Aguarde...</button>}
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
