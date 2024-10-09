import React, { useState } from 'react';
import { Form, Button, ListGroup, Tab, Row, Col } from 'react-bootstrap';
import todoItems from './todoItems';
import './App.css';

function App() {
  const [todos, setTodos] = useState(todoItems);

  // Custom color coding logic based on specific requirements
  const getVariant = (index) => {
    switch (index) {
      case 0:
        return 'danger'; // Maroon for the first item
      case 1:
        return 'warning'; // Light yellow for the second item
      case 2:
        return 'success'; // Light green for the third item
      case 3:
        return 'primary'; // Light blue for the fourth item
      default:
        return ''; // Default no color
    }
  };

  // Handle description editing
  const handleDescriptionEdit = (index, event) => {
    const newTodos = [...todos];
    newTodos[index].description = event.target.innerText;
    setTodos(newTodos);
  };

  // Handle due date editing
  const handleDateEdit = (index, event) => {
    const newTodos = [...todos];
    newTodos[index].dueDate = event.target.value;
    setTodos(newTodos);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Assignment 2: Rahul's ToDo List</h1>
      
      {/* Add the "Learn React" link here */}
      <div className="text-center mb-4">
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </div>

      <Row>
        {/* Form Section with Green Background */}
        <Col md={4}>
          <div className="p-4 bg-success rounded">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">ToDo Item</Form.Label>
                <Form.Control type="text" placeholder="Add todo item" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Due Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Button variant="primary" className="btn-block">
                Add Todo
              </Button>
            </Form>
          </div>
        </Col>

        {/* Todo List and Tab Content */}
        <Col md={8}>
          <Tab.Container defaultActiveKey="#link0">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todos.map((todo, index) => (
                    <ListGroup.Item
                      action
                      href={`#link${index}`}
                      key={index}
                      className={`bg-${getVariant(index)} text-white`}  // Color applied here
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todos.map((todo, index) => (
                    <Tab.Pane eventKey={`#link${index}`} key={index}>
                      <h4>{todo.title}</h4>
                      <p
                        contentEditable
                        onBlur={(e) => handleDescriptionEdit(index, e)}
                      >
                        {todo.description}
                      </p>
                      <Form.Control
                        type="date"
                        value={todo.dueDate}
                        onChange={(e) => handleDateEdit(index, e)}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
