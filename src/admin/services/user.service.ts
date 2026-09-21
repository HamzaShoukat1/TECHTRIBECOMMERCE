import { ApiClient } from '../../app/hooks/ApiClient'

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || 'http://localhost:8000'

type BackendUser = {
    _id?: string
    id?: string
    FirstName?: string
    LastName?: string
    email?: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

function normalizeUser(user: BackendUser): any {
    const firstName = user.FirstName ?? user.FirstName ?? ''
    const lastName = user.LastName ?? ''
    const email = user.email ?? ''
    const normalizedRole = user.role?.toUpperCase() ?? 'USER'
    return {
        id: user._id ?? user.id ?? '',
        firstName,
        lastName,
        username: email ? email.split('@')[0] : '',
        email,
        role: normalizedRole as 'ADMIN' | 'USER',
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
        updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
    }
}

export async function getAllUsers(): Promise<any[]> {
    const users = await ApiClient(`${BackenedUrl}/auth/all-users`, {
        method: 'GET',
    }) as BackendUser[]

    return (users ?? []).map(normalizeUser)
}
