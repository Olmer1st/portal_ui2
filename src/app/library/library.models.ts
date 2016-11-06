export enum SideBarState {
    Opened = 0,
    Closed = 1,
    Disabled = 2
}

export interface TreeInfo {
    totalIds: number;
    totalBooks: number;
    treeData: Node[];
}
export interface Node {
    id: number;
    title: string;
    type: NodeType;
    level: number;
    collapsed:boolean;
    bookInfo: BookInfo;
}

export enum NodeType {
    None = 0,
    Book = 1,
    Author = 2,
    Serie = 3
}

export interface BookInfo {
    series: string;
    size: number;
    serno: number;
    lang: string;
    del: any;
    path: string;
    file: number;
    date: string;
    ext: string;
    genre: string;
}


export interface Author {
    aid: number;
    fullname: string;
}

export interface ToolBarButton {
    key: string;
    isActive: boolean;
    customInfo: any;
}
