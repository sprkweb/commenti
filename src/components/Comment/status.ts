export enum CommentStatus {
    Normal,
    Deleted,
    EditMode
}

export function valueIfExists<T>(status: CommentStatus, value: T): T | false {
    return (status != CommentStatus.Deleted) && value;
}
