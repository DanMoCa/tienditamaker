import * as React from "react";

interface EmailTemplateTwoProps {
  firstName: string;
  // orderNumber: string;
  // products: { name: string; quantity: number; price: number }[];
}

export const EmailTemplateTwo: React.FC<Readonly<EmailTemplateTwoProps>> = ({
  firstName,
  // orderNumber,
  // products,
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
      nos complace confirmar que hemos recibido tu pedido. pronto procesaremos
      tu compra y te enviaremos los detalles de envío.
    </p>
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "5px",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          color: "#000000",
          marginTop: "0",
          marginBottom: "15px",
        }}
      >
        resumen de tu pedido:
      </h2>
      <p style={{ fontSize: "16px", color: "#333333", marginBottom: "10px" }}>
        {/* número de pedido: <strong>{orderNumber}</strong> */}
        número de pedido: <strong>123</strong>
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#000000", color: "#ffffff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>producto</th>
            <th style={{ padding: "10px", textAlign: "center" }}>cantidad</th>
            <th style={{ padding: "10px", textAlign: "right" }}>precio</th>
          </tr>
        </thead>
        <tbody>
          {/* {products.map((product, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #cccccc" }}>
              <td style={{ padding: "10px", textAlign: "left" }}>
                {product.name}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {product.quantity}
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                ${product.price.toFixed(2)}
              </td>
            </tr>
          ))} */}
        </tbody>
        <tfoot>
          <tr style={{ fontWeight: "bold" }}>
            <td style={{ padding: "10px", textAlign: "right" }} colSpan={2}>
              total:
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>
              {/* $
              {products
                .reduce(
                  (sum, product) => sum + product.quantity * product.price,
                  0
                )
                .toFixed(2)} */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div style={{ marginBottom: "30px" }}>
      <h3 style={{ fontSize: "18px", color: "#000000", marginBottom: "15px" }}>
        próximos pasos:
      </h3>
      <ol style={{ paddingLeft: "20px", margin: "0", color: "#333333" }}>
        <li style={{ marginBottom: "10px" }}>
          procesaremos tu pedido en las próximas 24 horas.
        </li>
        <li style={{ marginBottom: "10px" }}>
          recibirás un email con los detalles de envío y el número de
          seguimiento.
        </li>
        <li style={{ marginBottom: "10px" }}>
          puedes revisar el estado de tu pedido en cualquier momento en tu
          cuenta.
        </li>
      </ol>
    </div>
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <a
        href="https://www.tienditamaker.com/mi-cuenta"
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
        ver mi pedido
      </a>
    </div>
    <div style={{ textAlign: "center", color: "#666666", fontSize: "14px" }}>
      <p style={{ marginBottom: "10px" }}>
        ¿tienes alguna pregunta? contáctanos en{" "}
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
