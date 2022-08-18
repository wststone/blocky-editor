import { Component } from "preact";
import "./panel.scss";

export interface PanelProps {
  children?: any;
}

export class Panel extends Component<PanelProps> {
  render(props: PanelProps) {
    return (
      <div className="blocky-command-panel-container">{props.children}</div>
    );
  }
}

export class PanelValue extends Component<PanelProps> {
  render(props: PanelProps) {
    return <div className="blocky-command-value">{props.children}</div>;
  }
}
