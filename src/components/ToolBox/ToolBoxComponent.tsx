import { SelectionTool } from "../../tools/SelectionTool";
import { SetCollisionTool } from "../../tools/SetCollisionTool";
import { Tool } from "../../tools/Tool";
import "./ToolBoxComponent.css"
import React from "react";

interface Props {

    onToolSelected: (tool: Tool) => void,
}

interface State {
    selectedTool: Tool,
}

const tools: Array<Tool> = [
    new SelectionTool(),
    new SetCollisionTool(),
    /*{ label: 'SET WALL', },
    { label: 'SET CEILING', },
    { label: 'SET FLOOR', },*/
];

class ToolBoxComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const defaultTool = tools[0];
        this.state = { selectedTool: defaultTool, };
        this.props.onToolSelected(defaultTool);
    }

    selectTool(tool: Tool): void {

        this.setState({ selectedTool: tool })
        this.props.onToolSelected(tool);
    }

    render() {
        return (
            <div className='toolbox-container'>
                <h3>Tool Box</h3>
                <hr />
                <ul className="tools">
                    {
                        tools.map((tool, index) =>
                            <li key={index}
                                className={tool == this.state.selectedTool ? 'selected' : ''}
                                onClick={() => this.selectTool(tool)}>
                                {tool.name}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default ToolBoxComponent;
