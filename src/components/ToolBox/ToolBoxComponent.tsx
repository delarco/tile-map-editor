import { ToolContext, ToolContextType } from "../../context/ToolContext";
import { SelectionTool } from "../../tools/SelectionTool";
import { SetCollisionTool } from "../../tools/SetCollisionTool";
import { Tool } from "../../tools/Tool";
import "./ToolBoxComponent.css"
import React, { useEffect } from "react";

const tools: Array<Tool> = [
    new SelectionTool(),
    new SetCollisionTool(),
    //new SetTextureTool(),
];

const ToolBoxComponent = () => {

    const { tool: selectedTool, selectTool } = React.useContext(ToolContext) as ToolContextType;

    useEffect(() => {

        selectTool(tools[0]);
    }, []);

    return (
        <div className='toolbox-container'>
            <h3>Tool Box</h3>
            <hr />
            <ul className="tools">
                {
                    tools.map((tool, index) =>
                        <li key={index}
                            className={tool == selectedTool ? 'selected' : ''}
                            onClick={() => selectTool(tool)}>
                            {tool.name}
                        </li>
                    )
                }
            </ul>
            {
                tools.map((tool, index) => 
                <React.Fragment key={index}>
                    {tool.domElement}
                </React.Fragment>
                )
            }
        </div>
    );
}

export default ToolBoxComponent;
