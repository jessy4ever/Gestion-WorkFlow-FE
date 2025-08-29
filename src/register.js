import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, Typography } from "antd";
import { users } from "./users";

const { Title, Text } = Typography;

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
    if (users.find(u => u.email === email)) {
      setError("Cet email existe déjà !");
      return;
    }
    users.push({ email, password });
    setSuccess("Inscription réussie !");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f0fc 0%, #b3d1f3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 32,
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 8px 32px rgba(21,101,192,0.12)",
          border: "1px solid #b3d1f3",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -32,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1565c0",
            color: "#fff",
            borderRadius: "50%",
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            boxShadow: "0 2px 8px #b3d1f3",
            border: "4px solid #e3f0fc",
          }}
        >
          <span role="img" aria-label="register">📝</span>
        </div>
        <Title level={2} style={{ textAlign: "center", color: "#1565c0", marginTop: 40 }}>
          Inscription
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" required>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }}
              style={{
                borderRadius: 8,
                border: "1px solid #b3d1f3",
                background: "#e3f0fc",
              }}
            />
          </Form.Item>
          <Form.Item label="Mot de passe" required>
            <Input.Password
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); setSuccess(""); }}
              style={{
                borderRadius: 8,
                border: "1px solid #b3d1f3",
                background: "#e3f0fc",
              }}
            />
          </Form.Item>
          <Form.Item label="Confirmer le mot de passe" required>
            <Input.Password
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(""); setSuccess(""); }}
              style={{
                borderRadius: 8,
                border: "1px solid #b3d1f3",
                background: "#e3f0fc",
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              marginBottom: 16,
              background: "linear-gradient(90deg, #1565c0 0%, #b3d1f3 100%)",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            S'inscrire
          </Button>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
          {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />}
        </Form>
        <Text style={{ display: "block", textAlign: "center", marginTop: 8 }}>
          Déjà un compte ?{" "}
          <Button
            type="link"
            onClick={() => navigate("/")}
            style={{ color: "#1565c0", fontWeight: 600 }}
          >
            Se connecter
          </Button>
        </Text>
      </div>
    </div>
  );
}

export default Register;