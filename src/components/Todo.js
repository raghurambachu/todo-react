import React from "react";

class Todo extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleCheck(e) {
    this.props.handleCheck(e);
  }
  handleClose(e) {
    this.props.handleClose(e);
  }
  render() {
    return (
      <li className="todo-item py-3 px-2 text-lg">
        <article
          className="todo relative flex items-center"
          data-id={this.props.todo.id}
        >
          <div className="checkbox-holder">
            <div className="round">
              <input
                type="checkbox"
                id={"checkbox" + this.props.todo.id}
                onChange={this.handleCheck}
                checked={this.props.todo.checked}
              />
              <label htmlFor={"checkbox" + this.props.todo.id}></label>
            </div>
          </div>
          <div className={"todo-content text-gray-700 "}>
            <p
              className={
                this.props.todo.checked ? "line-through text-gray-400" : ""
              }
            >
              {this.props.todo.content}
            </p>
          </div>
          <span
            onClick={this.handleClose}
            className="todo-close cursor-pointer absolute right-0 mr-4 text-2xl text-red-300 -translate-y-1/2 hover:text-red-500"
          >
            &times;
          </span>
        </article>
      </li>
    );
  }
}

export default Todo;
