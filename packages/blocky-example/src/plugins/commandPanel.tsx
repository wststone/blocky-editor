import { Component, ComponentChild } from "preact";
import { makePreactFollowWidget } from "blocky-preact";
import { TextBlockName, type IPlugin } from "blocky-core";
import "./commandPanel.scss";

class CommandPanel extends Component {
  render(): ComponentChild {
    return <div className="blocky-command-panel-container">Command</div>;
  }
}

export function makeCommandPanelPlugin(): IPlugin {
  return {
    name: "command-panel",
    onInitialized(editor) {
      editor.keyDown.on((e: KeyboardEvent) => {
        if (e.key !== "/") {
          return;
        }
        const blockElement = editor.controller.getBlockElementAtCursor();
        if (!blockElement) {
          return;
        }
        if (blockElement.nodeName !== TextBlockName) {
          return;
        }
        editor.insertFollowWidget(
          makePreactFollowWidget(() => <CommandPanel />)
        );
      });
    },
  };
}
