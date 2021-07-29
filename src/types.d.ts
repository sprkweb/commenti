declare interface UserInfo {
    username: string;
}

declare interface CommentInfo {
    id: string
    dateCreated: string
    dateEdited: string
    author?: UserInfo
    text: string
    children?: GQLConnection<CommentInfo>
}

declare interface GQLConnection<NodeType> {
    pageInfo?: {
        endCursor?: string
        hasNextPage?: boolean
    },
    edges?: Array<{
        node?: NodeType
        cursor?: string
    }>
}
