export type Fields = {
    name?: string
    label?: string,
    placeholder?: string,
}

export type Content = {
    formName: string,
    fomrTitle: string,
    fields: Fields[]
}

export type Form = {
    id: number,
    ownerID: string,    
    content: Content,
    published: boolean,
    submission: number,
    shareUrl: string,
}