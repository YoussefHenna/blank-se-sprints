export interface Course {
    name : string
    description : string
    instructorsId : number[]
    id : number
}

export enum Grade {
    APlus=11,
    A=10,
    AMinus=9,
    BPlus=8,
    B=7,
    BMinus=6,
    CPlus=5,
    C=4,
    CMinus=3,
    DPlus=2,
    D=1,
    F=0,
}
