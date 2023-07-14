import { useState } from "react";
import { Form, Input, Button, Card, Row, Col, Modal } from "antd";
import { useTranslation } from "react-i18next";

function QuoteForm() {
  const { t } = useTranslation();
  const [quoteList, setQuoteList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (formData) => {
    const { num } = formData;
    try {
      const response = await fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuoteList(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "left", marginBottom: "1em" }}>
        Quotes
      </h1>
      <Form
        style={{ flexDirection: "row", alignItems: "baseline", gap: "1em" }}
        onFinish={handleFormSubmit}
      >
        <Form.Item label={t("quote.number")} name="num">
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("quote.get")}
          </Button>
        </Form.Item>
      </Form>
      {quoteList.length > 0 && (
        <Row gutter={16} className="card-container">
          {quoteList.map((quote, index) => (
            <Col
              style={{
                display: "flex",
                alignItems: "stretch",
                marginBottom: "2em",
              }}
              span={8}
              key={index}
            >
              <Card style={{ width: "100%" }} title={quote.author}>
                {quote.quote}
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title={t("modal.title")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{errorMessage === "Unauthenticated" ? t("modal.authError") : t("modal.content")}</p>
      </Modal>
    </div>
  );
}

export default QuoteForm;