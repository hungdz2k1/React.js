import { useState } from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";

function QuoteForm() {
  const [quoteList, setQuoteList] = useState([]);

  const handleFormSubmit = async (formData) => {
    const { num } = formData;
    const response = await fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num }),
    });
    const data = await response.json();
    setQuoteList(data);
  };

  return (
    <div style={{overflow: 'hidden'}}>
      <Form style={{flexDirection: 'row',alignItems: 'baseline',gap: '1em'}} onFinish={handleFormSubmit}>
        <Form.Item label="Number of quotes" name="num">
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get Quotes
          </Button>
        </Form.Item>
      </Form>
      {quoteList.length > 0 && (
        <Row gutter={16} className="card-container">
          {quoteList.map((quote, index) => (
            <Col style={{display: 'flex', alignItems: 'stretch',marginBottom: '2em'}} span={8} key={index}>
              <Card style={{width: '100%'}} title={quote.author}>{quote.quote}</Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default QuoteForm;