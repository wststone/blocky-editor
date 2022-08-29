import { useEffect, useRef } from "react";
import { CursorState } from "blocky-data";
import { Editor, type EditorController } from "blocky-core";

export interface Props {
	controller: EditorController;

	/**
	 * If this flag is false,
	 * the editor will not create an empty
	 * block automatically when the editor is created.
	 */
	ignoreInitEmpty?: boolean;

	autoFocus?: boolean;
}

export function BlockyEditor(props: Props) {
	const { controller, ignoreInitEmpty, autoFocus } = props;
	const editorRef = useRef<Editor>();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const editor = editorRef.current;
		if (!containerRef.current) {
			throw new Error("ContainerRef not found!");
		}
		editorRef.current = Editor.fromController(
			containerRef.current,
			controller
		);
		if (ignoreInitEmpty !== true) {
			editorRef.current.initFirstEmptyBlock();
		}
		editorRef.current.render(() => {
			if (autoFocus) {
				controller.setCursorState(CursorState.collapse("title", 0));
			}
		});

		return () => {
			editor?.dispose();
			editorRef.current = undefined;
		};
	}, []);
  
	return <div ref={containerRef}></div>;
}
