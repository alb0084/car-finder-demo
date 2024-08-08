const BASE_URL = 'http://localhost:3030';


//########are in authForm
export const login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    return response.json();
};

export const googleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
};

//####### are in HomeScreen
// Fetch automobiles with pagination
export const fetchAutomobiles = async (page, itemsPerPage) => {
    const response = await fetch(`${BASE_URL}/api/automobiles?page=${page}&limit=${itemsPerPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch automobiles');
    }

    return response.json();
};

// Save a search
export const saveSearch = async (searchDetails) => {
    const response = await fetch(`${BASE_URL}/api/saved-searches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(searchDetails),
    });

    if (!response.ok) {
        throw new Error('Error while saving the search');
    }

    return response.json();
};

// Delete a saved search
export const deleteSearch = async (id) => {
    const response = await fetch(`${BASE_URL}/api/saved-searches/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to delete search');
    }

    return response.json();
};

//########### Are in SlideBar
export const fetchSavedSearches = async () => {
    const response = await fetch(`${BASE_URL}/api/saved-searches`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch saved searches');
    }

    return response.json();
};

export const deleteSavedSearch = async (searchId) => {
    const response = await fetch(`${BASE_URL}/api/saved-searches/${searchId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error during deletion of saved search');
    }

    return response.json();
};

export const shareSavedSearch = async (searchToShare, email) => {
    const response = await fetch(`${BASE_URL}/api/share-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            searchId: searchToShare.id,
            email: email,
            details: searchToShare,
        }),
    });

    if (!response.ok) {
        throw new Error('Error during sharing the saved search');
    }

    return response.json();
};

export const logout = async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error during logout');
    }

    return {response: {ok:response.ok}}
};