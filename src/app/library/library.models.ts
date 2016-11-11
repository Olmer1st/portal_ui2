export enum SideBarState {
    Opened = 0,
    Closed = 1,
    Disabled = 2
}

export interface TreeInfo {
    totalIds: number;
    totalBooks: number;
    maxLevel: number;
    treeData: Node[];
}

export interface GenreGroup {
    details: GenreInfo;
    genres: GenreInfo[];
}

export interface GenreInfo {
    gid: number;
    code: string;
    gdesc: string;
    edesc: string;
}

export interface Node {
    id: string;
    title: string;
    type: NodeType;
    level: number;
    collapsed: boolean;
    bookInfo: BookInfo;
    parent: string;
    hidden: boolean;
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
