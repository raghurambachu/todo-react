import React from "react";
import Todos from "./Todos";

class App extends React.Component {
  render() {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center">
        <h2 className="text-6xl font-medium text-red-300  mt-8 ">todos</h2>
        <Todos />
      </div>
    );
  }
}

export default App;
