import React, { HTMLAttributes } from "react";

export class Texture {

    public filename: string;
    public description: string;
    public keywords: Array<string>;
    public width: number;
    public height: number;
    public collision: boolean = true;
    public image: React.DetailedReactHTMLElement<HTMLAttributes<HTMLImageElement>, HTMLImageElement>;

    constructor(filename: string) {

        this.filename = filename;

        this.image = React.createElement(
            "img",
            {
                //id: ``;
                src: `/assets/textures/${filename}`,
                style: {
                    width: '100%',
                    height: '100%',
                },
                onLoad: (ev) => {

                    const imageElement = <HTMLImageElement>ev.target;
                    this.width = imageElement.naturalWidth;
                    this.height = imageElement.naturalHeight;
                }
            },
        );
    }
}
