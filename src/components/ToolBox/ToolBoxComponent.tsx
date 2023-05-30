import "./ToolBoxComponent.css"
import React from "react";

interface Props {

}

interface State {
    selectedTool: { label: string, },
}

const tools = [
    { label: 'SELECTION', },
    { label: 'SET COLLISION', },
    { label: 'SET WALL', },
    { label: 'SET CEILING', },
    { label: 'SET FLOOR', },
];

class ToolBoxComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedTool: tools[0]
        };
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
                                onClick={() => this.setState({ selectedTool: tool })}>
                                {tool.label}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default ToolBoxComponent;
