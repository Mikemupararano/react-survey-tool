import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';

const SurveyForm = () => {
  const initialQuestions = [
    { id: 1, type: 'text', label: 'Company Name', value: '' },
    { id: 2, type: 'text', label: 'Contact Person', value: '' },
    { id: 3, type: 'email', label: 'Email Address', value: '' },
    { id: 4, type: 'text', label: 'Phone Number', value: '' },
    { id: 5, type: 'select', label: 'Type of Products/Services Offered', options: ['Raw Materials', 'Finished Goods', 'Services', 'Other'], value: '' },
    { id: 6, type: 'number', label: 'Number of Employees', value: '' },
    { id: 7, type: 'number', label: 'Years in Business', value: '' },
    { id: 8, type: 'number', label: 'Annual Revenue', value: '' },
    { id: 9, type: 'select', label: 'Do you have a sustainability policy?', options: ['Yes', 'No'], value: '' },
    { id: 10, type: 'textarea', label: 'If yes, please provide a brief overview of your sustainability policy.', value: '' },
    { id: 11, type: 'select', label: 'How do you measure your environmental impact?', options: ['Carbon Footprint', 'Water Usage', 'Waste Management', 'Energy Consumption', 'Other'], value: '' },
    { id: 12, type: 'textarea', label: 'Please provide any metrics related to your environmental impact measurements.', value: '' }
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [productQuestions, setProductQuestions] = useState([{ id: 1, name: '', description: '', materials: '', recycled: '', origin: '' }]);

  const handleInputChange = (e, id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, value: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleProductChange = (e, id, field) => {
    const updatedProducts = productQuestions.map((product) => {
      if (product.id === id) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    setProductQuestions(updatedProducts);
  };

  const addQuestion = () => {
    const newQuestion = { id: questions.length + 1, type: 'text', label: '', value: '' };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const changeQuestionType = (id, type) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, type: type, value: '', options: type === 'select' ? ['Option 1', 'Option 2'] : undefined };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addProduct = () => {
    const newProduct = { id: productQuestions.length + 1, name: '', description: '', materials: '', recycled: '', origin: '' };
    setProductQuestions([...productQuestions, newProduct]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      general: questions,
      products: productQuestions
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/survey`, formData);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <Form.Group key={question.id}>
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter question label"
                  value={question.label}
                  onChange={(e) => handleInputChange(e, question.id)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  as="select"
                  value={question.type}
                  onChange={(e) => changeQuestionType(question.id, e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="select">Select</option>
                </Form.Control>
              </Col>
              <Col md={4}>
                <Button variant="danger" onClick={() => removeQuestion(question.id)}>Remove</Button>
              </Col>
            </Row>
            {question.type === 'textarea' ? (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={question.label}
                value={question.value}
                onChange={(e) => handleInputChange(e, question.id)}
              />
            ) : question.type === 'select' ? (
              <Form.Control
                as="select"
                value={question.value}
                onChange={(e) => handleInputChange(e, question.id)}
              >
                <option value="">Select...</option>
                {question.options && question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            ) : (
              <Form.Control
                type={question.type}
                placeholder={question.label}
                value={question.value}
                onChange={(e) => handleInputChange(e, question.id)}
              />
            )}
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={addQuestion}>Add Question</Button>
        <h4 className="mt-4">Product Information</h4>
        {productQuestions.map((product) => (
          <div key={product.id}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(e, product.id, 'name')}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.description}
                    onChange={(e) => handleProductChange(e, product.id, 'description')}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Material Composition</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.materials}
                    onChange={(e) => handleProductChange(e, product.id, 'materials')}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Percentage of Recycled Materials Used</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.recycled}
                    onChange={(e) => handleProductChange(e, product.id, 'recycled')}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Country of Origin</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.origin}
                    onChange={(e) => handleProductChange(e, product.id, 'origin')}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="secondary" onClick={addProduct}>Add More Products</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default SurveyForm;


