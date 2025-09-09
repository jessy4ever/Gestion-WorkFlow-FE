import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    const emailClean = email.trim();
    const passwordClean = password.trim();

    if (!emailRegex.test(emailClean)) {
      setError("Email invalide !");
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === emailClean && u.password === passwordClean);

    if (user) {
      navigate("/home"); // Redirect to the correct route for HomePage.js
    } else {
      setError("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Connexion</h1>
        <p>Connectez-vous pour accéder à vos workflows</p>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" required>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="ant-input"
            />
          </Form.Item>

          <Form.Item label="Mot de passe" required>
            <Input.Password
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="ant-input-password"
            />
          </Form.Item>

          <Button type="link" htmlType="submit" className="login-btn" block>
            Se connecter
          </Button>

          {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}

          <div className="signup" style={{ marginTop: 12 }}>
            Pas de compte ?{" "}
            <Button type="link" onClick={() => navigate("/register")}>
              S'inscrire
            </Button>
          </div>
        </Form>
      </div>

      <div className="image-section" aria-hidden="true" />
    </div>
  );
}

export default Login;