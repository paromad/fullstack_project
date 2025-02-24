const baseUrl = 'http://127.0.0.1:8000/api/'

export async function apiService(path, params = {}, useAuth = true) {
    const access = window.localStorage.getItem('ACCESS')

    const { headers = {}, ...otherParams } = params

    if (access && useAuth) {
        headers['Authorization'] = `Bearer ${access}`
    }

    const response = await fetch(baseUrl + path, {
        headers,
        ...otherParams,
    })

    if (response.status === 401) {
        const refreshResponse = await fetch(
            baseUrl + `token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: window.localStorage.getItem('REFRESH'),
                }),
            }
        )

        const newAccess = (await refreshResponse.json()).access
        window.localStorage.setItem('ACCESS', newAccess)
        headers['Authorization'] = `Bearer ${newAccess}`

        const response = await fetch(baseUrl + path, {
            headers,
            ...otherParams,
        })

        try {
            const data = await response.json()
            return data
        } catch {}
    } else {
        try {
            const data = await response.json()
            return data
        } catch {}
    }
}
