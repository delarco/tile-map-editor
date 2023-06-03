import React, { HTMLAttributes } from "react";

export class Texture {

    public filename: string;
    public description: string;
    public keywords: Array<string>;
    public width: number;
    public height: number;
    public collision: boolean = true;
    public domElement: React.DetailedReactHTMLElement<HTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    public image: HTMLImageElement;

    constructor(filename: string) {

        this.filename = filename;

        this.domElement = React.createElement(
            "img",
            {
                //id: ``;
                src: `/assets/textures/${filename}`,
                style: {
                    width: '100%',
                    height: '100%',
                },
                onLoad: (ev) => {

                    this.image = <HTMLImageElement>ev.target;
                    this.width = this.image.naturalWidth;
                    this.height = this.image.naturalHeight;
                }
            },
        );
    }
}
