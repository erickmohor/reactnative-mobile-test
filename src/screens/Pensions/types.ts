export interface IPensions {
        id: number,
        name: string,
        type: string,
        minimumValue: number,
        tax: number,
        redemptionTerm: number,
        profitability: number,
}

export type PensionsStyle = {
        verticalAlign?: "flex-start" | "center" | "flex-end"
        horizontalAlign?: "flex-start" | "center" | "flex-end"
}