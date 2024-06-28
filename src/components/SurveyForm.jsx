import React, { useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import './SurveyForm.css'; // Custom CSS for full-width form

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
  const [showModal, setShowModal] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState('text');
  const [newQuestionLabel, setNewQuestionLabel] = useState('');

  const handleInputChange = (e, id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, value: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: newQuestionType,
      label: newQuestionLabel,
      value: '',
      options: newQuestionType === 'select' ? ['Option 1', 'Option 2'] : undefined
    };
    setQuestions([...questions, newQuestion]);
    setNewQuestionLabel('');
    handleCloseModal();
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      general: questions
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
          <Form.Group key={question.id} className="mb-3 full-width">
            <Form.Label>{question.label}</Form.Label>
            {question.type === 'textarea' ? (
              <Form.Control
                as="textarea"
                rows={3}
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
                value={question.value}
                onChange={(e) => handleInputChange(e, question.id)}
              />
            )}
            <Button variant="danger" onClick={() => removeQuestion(question.id)} className="mt-2">Remove</Button>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={handleShowModal} className="mt-3">Add Question</Button>
        <Button variant="primary" type="submit" className="mt-3">Submit</Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Question Type</Form.Label>
            <Form.Control as="select" value={newQuestionType} onChange={(e) => setNewQuestionType(e.target.value)}>
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="select">Select</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Question Label</Form.Label>
            <Form.Control
              type="text"
              value={newQuestionLabel}
              onChange={(e) => setNewQuestionLabel(e.target.value)}
              placeholder="Enter your question"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SurveyForm;


