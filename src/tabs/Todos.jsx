import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Todo } from 'components';
import { setLocalStorage, getLocalStorage } from '../service/localeStorage';

const LOCAL_STOR_KEY = 'todos';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidMount() {
    const localStorValue = getLocalStorage(LOCAL_STOR_KEY, []);
    this.setState({ todos: localStorValue });
  }

  componentDidUpdate(_, prevState) {
    const { todos } = this.state;

    if (prevState.todos.length !== todos.length || prevState.todos !== todos) {
      setLocalStorage(LOCAL_STOR_KEY, todos);
    }
  }

  handleFormSubmit = task => {
    const newTodo = {
      id: nanoid(),
      text: task,
    };

    this.setState(({ todos }) => ({
      todos: [...todos, newTodo],
    }));
  };

  handleRemoveTodo = idToRemove => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== idToRemove),
    }));
  };

  handleEdit = id => {
    const { todos, isEditing } = this.state;

    if (isEditing) {
      this.handleCancel();
    }
    const curTodo = todos.find(todo => todo.id === id);
    this.setState({ isEditing: true, currentTodo: curTodo });
  };

  handleCancel = () => {
    this.setState({ isEditing: false, currentTodo: {} });
  };

  handleInputEditChange = text => {
    this.setState(({ currentTodo }) => ({
      currentTodo: { ...currentTodo, text: text },
    }));
  };

  handleSubmitChange = () => {
    const { currentTodo } = this.state;

    this.setState(({ todos }) => ({
      todos: todos.map(todos =>
        todos.id === currentTodo.id ? { ...todos, ...currentTodo } : todos
      ),
    }));
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;

    return (
      <>
        {!isEditing && <SearchForm onSubmit={this.handleFormSubmit} />}

        {isEditing && (
          <EditForm
            onCancel={this.handleCancel}
            onChange={this.handleInputEditChange}
            onUpdate={this.handleSubmitChange}
            currentTodo={currentTodo}
          />
        )}
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                id={id}
                index={index}
                handleRemoveTodo={this.handleRemoveTodo}
                handleEdit={this.handleEdit}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
