import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import './Login.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (!emailRegex.test(email)) {
      setError("Email invalide !");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Mot de passe doit contenir min 6 caractères, avec majuscule, minuscule et chiffre.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    // Save user data to local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { email: email.trim(), password: password.trim() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Inscription réussie !");
    setTimeout(() => navigate("/login"), 1500); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Inscription</h1>
        <p>Créez un compte pour accéder à vos workflows</p>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" required>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }}
              className="ant-input"
            />
          </Form.Item>

          <Form.Item label="Mot de passe" required>
            <Input.Password
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); setSuccess(""); }}
              className="ant-input-password"
            />
          </Form.Item>

          <Form.Item label="Confirmer le mot de passe" required>
            <Input.Password
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(""); setSuccess(""); }}
              className="ant-input-password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-btn" block>
            S'inscrire
          </Button>

          {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
          {success && <Alert message={success} type="success" showIcon style={{ marginTop: 16 }} />}
        </Form>

        <div className="signup" style={{ marginTop: 12 }}>
          Déjà un compte ?{" "}
          <Button type="link" onClick={() => navigate("/login")}>
            Se connecter
          </Button>
        </div>
      </div>

      <div className="image-section" aria-hidden="true" />
    </div>
  );
}

export default Register;