export type NotificationTypes = {
    id: string
    message: string | null
    description: string | null
    type: string | null
}

export type SetNotificationType = {
    message: string | null
    description: string | null
    type?: string | null
}

export type DisplayNotification = {
    message: string | null
    description: string | null
    type: string | null
}
