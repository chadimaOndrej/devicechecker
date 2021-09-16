export interface PropsType {
    onLogout?: () => void
    readonly user?: {
        readonly id: string
        readonly name: string
        readonly type: string
        readonly model: string
        readonly vendor: string
        readonly os: string
        readonly osVersion: string
    }
}
