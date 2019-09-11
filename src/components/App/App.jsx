import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Draft from "./../Draft/Draft";
import SplitterLayout from "react-splitter-layout";
import "./App.css";
import "react-splitter-layout/lib/index.css";

function App() {
  return (
    <SplitterLayout
      primaryIndex={1}
      secondaryInitialSize={250}
      secondaryMinSize={250}
    >
      <div>
        <Draft />
      </div>
      <div>Pane 2</div>
    </SplitterLayout>
  );
}

export default App;
