import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff",
    }}
  >
    <h1
      style={{
        fontSize: "32px",
        color: "#000000",
        textAlign: "center",
        marginBottom: "20px",
        fontWeight: "bolder",
      }}
    >
      tienditamaker
    </h1>
    <h1
      style={{
        fontSize: "24px",
        color: "#000000",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      ¡gracias por tu compra, {firstName}!
    </h1>
    <p
      style={{
        fontSize: "16px",
        color: "#333333",
        lineHeight: "1.5",
        marginBottom: "20px",
      }}
    >
      nos complace informarte que tu compra ha sido procesada con éxito. ahora
      puedes acceder a todas las funcionalidades de nuestra plataforma:
    </p>
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <a
        href="https://www.tienditamaker.com/dashboard"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#000000",
          color: "#ffffff",
          textDecoration: "none",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
      >
        acceder al dashboard
      </a>
    </div>
    <div style={{ marginBottom: "30px" }}>
      <h2
        style={{
          fontSize: "20px",
          color: "#000000",
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        ¿cómo funciona tienditamaker?
      </h2>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://res.cloudinary.com/do3k4ocu4/image/upload/v1731396360/hj0yfm49tnrgcuigtmbm.gif"
          alt="logo de tienditamaker"
          style={{
            display: "block",
            width: "296px",
            height: "166px",
            margin: "0 auto 20px",
          }}
        />
        <a
          href="https://youtube.com"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#ffffff",
            color: "#000000",
            textDecoration: "none",
            fontWeight: "bold",
            border: "2px solid #000000",
            borderRadius: "5px",
          }}
        >
          ver video demo
        </a>
      </div>
    </div>
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "5px",
        marginBottom: "30px",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          color: "#000000",
          marginTop: "0",
          marginBottom: "15px",
        }}
      >
        información importante:
      </h3>
      <ul style={{ paddingLeft: "20px", margin: "0", color: "#333333" }}>
        <li style={{ marginBottom: "10px" }}>
          guarda este email como referencia de tu compra.
        </li>
        <li style={{ marginBottom: "10px" }}>
          si tienes problemas para acceder, contacta a nuestro soporte.
        </li>
        <li style={{ marginBottom: "10px" }}>
          recuerda cambiar tu contraseña regularmente para mayor seguridad.
        </li>
        <li style={{ marginBottom: "10px" }}>
          visita nuestra sección de faq para respuestas a preguntas comunes.
        </li>
      </ul>
    </div>
    <div style={{ textAlign: "center", color: "#666666", fontSize: "14px" }}>
      <p style={{ marginBottom: "10px" }}>
        ¿necesitas ayuda? contáctanos en{" "}
        <a
          href="mailto:soporte@tienditamaker.com"
          style={{ color: "#000000", textDecoration: "underline" }}
        >
          soporte@tienditamaker.com
        </a>
      </p>
      <p style={{ fontSize: "12px" }}>
        © {new Date().getFullYear()} tienditamaker. todos los derechos
        reservados.
      </p>
    </div>
  </div>
);
