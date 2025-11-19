import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import logo from '../../assets/logo.webp'
import Loading from "../../Shared/Loading/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const Invoice = () => {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['purchases', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/purchases?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const purchases = orders[orders.length - 1];

  // =============== PDF DOWNLOAD FIXED ===============
  const downloadPDF = () => {
    const invoice = document.getElementById("invoice");

    html2canvas(invoice, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.save("invoice.pdf");
      })
      .catch((err) => console.log("PDF Error:", err));
  };

  return (
    <div style={{ padding: "20px" }}>

      <div
        id="invoice"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "6px"
        }}
      >
        {/* Logo and Title */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <img src={logo} alt="Logo" width="100" />

          <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
            Invoice
          </h2>
        </div>

        {/* User Info */}
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
            User Information:
          </h3>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
        </div>

        <p>Date: {new Date().toLocaleString()}</p>

        {/* Purchase Table */}
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>
          Purchase Details:
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px"
          }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Item</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Qty</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
            </tr>
          </thead>

          <tbody>
            {purchases?.products?.map((product, index) => (
              <tr key={product._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.productName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.quantity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${product.price}
                </td>
              </tr>
            ))}

            <tr style={{ background: "#f7f7f7" }}>
              <td
                colSpan="3"
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  fontWeight: "bold",
                  textAlign: "right"
                }}
              >
                Total Price:
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  fontWeight: "bold"
                }}
              >
                ${purchases?.totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={downloadPDF}
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {/* Download Invoice as PDF */}
          <Link to='/'>Go to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default Invoice;
