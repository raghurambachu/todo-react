import React from "react";
import Todo from "./Todo";
import { FaChevronDown } from "react-icons/fa";

function randomGenerator(len = 10) {
  let pattern = "a";
  for (let i = 0; i < len; i++) {
    pattern += Math.floor(Math.random() * len);
  }
  return pattern;
}

class Todos extends React.Component {
  constructor() {
    super();
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTodoInput = this.handleTodoInput.bind(this);
    this.handleClickOnToggler = this.handleClickOnToggler.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.showCurrentTodos = this.showCurrentTodos.bind(this);
    this.editContent = this.editContent.bind(this);
    this.state = {
      activeTab: "all",
      todos:
        (localStorage.todos && JSON.parse(localStorage.getItem("todos"))) || [],
      allChecked: false,
      inputText: "",
    };
  }

  handleAddTodo(e) {
    if (e.keyCode === 13) {
      const content = e.target.value;
      const todo = {
        content: content[0].toUpperCase() + content.slice(1).toLowerCase(),
        checked: false,
        id: randomGenerator(),
      };
      // e.target.value = "";
      this.setState(
        function (prevState) {
          return {
            todos: prevState.todos.concat(todo),
            inputText: "",
          };
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );
    }
  }

  handleCheck(e) {
    const article = e.target.parentElement.parentElement.parentElement;
    const todoId = article.dataset.id;
    let todos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    this.setState(
      function (prevState) {
        return {
          todos: [...todos],
        };
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  handleClose(e) {
    const todoItemArticle = e.target.parentElement;
    const todoId = todoItemArticle.dataset.id;
    let todos = this.state.todos.map((todo) => todo);
    todos = todos.filter((todo) => todo.id !== todoId);
    this.setState(
      function () {
        return {
          todos: [...todos],
        };
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }
  showCurrentTodos() {
    const { activeTab, todos } = this.state;
    switch (activeTab) {
      case "all":
        return todos.map((todo) => todo);
      case "active":
        return todos.filter((todo) => !todo.checked);
      case "completed":
        return todos.filter((todo) => todo.checked);
      default:
        return;
    }
  }

  handleClickOnToggler(e) {
    this.setState(
      (prevState) => {
        return {
          todos: prevState.todos.map((todo) => ({
            ...todo,
            checked: !prevState.allChecked,
          })),
          allChecked: !prevState.allChecked,
        };
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  handleClearCompleted(e) {
    let todos = this.state.todos.filter((todo) => !todo.checked);
    this.setState(
      function (prevState) {
        return {
          activeTab: "all",
          todos: [...todos],
        };
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  handleTodoInput(e) {
    const inputValue = e.target.value;
    this.setState(function () {
      return {
        inputText: inputValue,
      };
    });
  }

  editContent(e) {
    console.log("Double Clicked");
  }

  render() {
    const todos = this.showCurrentTodos();
    return (
      <div className="todos shadow-xl bg-white before:shadow-2xl ">
        <div className="todo-add  flex">
          <span
            className="flex justify-center items-center toggle-checkbox"
            onClick={this.handleClickOnToggler}
          >
            <FaChevronDown className="text-gray-500" />
          </span>
          <input
            className="w-full px-8 py-4 pl-1 text-xl font-thin focus:outline-none focus:text-gray-800 todo-input"
            type="text"
            placeholder="What needs to be done ?"
            onKeyDown={this.handleAddTodo}
            onChange={this.handleTodoInput}
            value={this.state.inputText}
          />
        </div>
        <ul className="todo-list divide-y border-t border-b">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              editContent={this.editContent}
              handleClose={this.handleClose}
              handleCheck={this.handleCheck}
            />
          ))}
        </ul>
        {this.state.todos.length > 0 && (
          <div className="todo-status text-xs  sm:text-sm  text-gray-500 p-4 py-2 flex justify-between items-center">
            <p>
              {this.state.todos.filter((todo) => !todo.checked).length} item
              left
            </p>
            <div className="action">
              <button
                className={
                  this.state.activeTab === "all"
                    ? "todo-all mx-1 sm:mx-2 border border-red-200 px-2 focus:outline-none py-0 rounded-md"
                    : "todo-all mx-1 sm:mx-2 focus:outline-none hover:border hover:border-red-200"
                }
                onClick={() => this.setState({ activeTab: "all" })}
              >
                All
              </button>
              <button
                className={
                  this.state.activeTab === "active"
                    ? "todo-active mx-1 sm:mx-2 border border-red-200 px-2 focus:outline-none py-0 rounded-md"
                    : "todo-active mx-1 sm:mx-2 focus:outline-none hover:border hover:border-red-200 "
                }
                onClick={() => this.setState({ activeTab: "active" })}
              >
                Active
              </button>
              <button
                className={
                  this.state.activeTab === "completed"
                    ? "todo-completed mx-1 sm:mx-2 border border-red-200 px-2 focus:outline-none py-0 rounded-md"
                    : "todo-completed mx-1 sm:mx-2 focus:outline-none hover:border hover:border-red-200"
                }
                onClick={() => this.setState({ activeTab: "completed" })}
              >
                Completed
              </button>
            </div>
            {this.state.todos.filter((todo) => todo.checked).length > 0 && (
              <button
                className="todo-clear-completed"
                onClick={this.handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Todos;
