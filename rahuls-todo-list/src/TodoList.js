import React, { useState } from 'react';
import { Form, Button, ListGroup, Tab, Row, Col } from 'react-bootstrap';
import todoItems from './todoItems'; // Ensure this imports your todoItems correctly
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState(todoItems);
  const [newTodoTitle, setNewTodoTitle] = useState(''); // State for new todo title
  const [newDueDate, setNewDueDate] = useState(''); // State for new todo due date

  // Custom color coding logic based on due dates
  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = Math.abs(dueDateObj - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  // Handle adding a new todo
  const handleAddTodo = (event) => {
    event.preventDefault(); // Prevent form submission
    if (newTodoTitle && newDueDate) {
      const newTodo = {
        title: newTodoTitle,
        description: 'New Todo Description', // Default description
        dueDate: newDueDate,
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle(''); // Clear input
      setNewDueDate(''); // Clear input
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
      <h1 className="text-center">Assignment 2: ToDo List</h1>

      <Row>
        {/* Form Section with Green Background */}
        <Col md={4}>
          <div className="p-4 bg-success rounded">
            <Form onSubmit={handleAddTodo}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">ToDo Item</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Add todo item" 
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)} // Update new title
                  required // Make it a required field
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white" htmlFor="dueDate">Due Date</Form.Label>
                <Form.Control 
                  id="dueDate" // Add an id to the input field
                  type="date" 
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)} // Update new due date
                  required // Make it a required field
                />
              </Form.Group>
              <Button variant="primary" className="btn-block" type="submit">
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
                      className={`list-group-item-${getVariant(todo.dueDate)} text-white`}
                    >
                      {todo.title + " - Incorrect Title"} {/* Change to deliberately fail test */}
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

export default TodoList;
