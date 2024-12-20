import { FC, ReactNode } from "react";

export interface Theme {
    styles?: { [key: string]: string }; // SCSS module
    layout?: FC<{ children: ReactNode }>; // Layout component type
    header?: FC; // Optional Header component
    sidebar?: FC; // Optional Sidebar component
    footer?: FC; // Optional Footer component
}