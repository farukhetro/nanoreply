
const GBP_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const REVIEW_API_BASE = 'https://mybusiness.googleapis.com/v4';

export interface GBPAccount {
    name: string; // "accounts/123456"
    accountName: string;
    type: string;
}

export interface GBPLocation {
    name: string; // "locations/123456"
    title: string;
    storeCode?: string;
    languageCode?: string;
    phoneNumbers?: any;
    categories?: any;
    metadata?: any;
}

export async function getAccessToken(refreshToken: string, clientId: string, clientSecret: string) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export async function listLocations(accessToken: string, accountName: string) {
    // accountName e.g. "accounts/1109..."
    // Initial call to get accounts if accountName is not specific?
    // Assume accountName is "accounts/{accountId}"

    // Note: We might need to handle pagination
    const response = await fetch(`${GBP_API_BASE}/${accountName}/locations?readMask=name,title,storeCode,metadata`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        // fallback or error
        const err = await response.text();
        console.error("GBP List Locations Error:", err);
        throw new Error(`GBP Error: ${err}`);
    }

    const data = await response.json();
    return data.locations || [];
}

export async function listAccounts(accessToken: string) {
    const response = await fetch(`${GBP_API_BASE}/accounts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to list accounts ${await response.text()}`);
    }

    const data = await response.json();
    return data.accounts || [];
}

export async function replyToReview(accessToken: string, reviewName: string, replyText: string) {
    // reviewName e.g. "accounts/{accId}/locations/{locId}/reviews/{reviewId}"
    const response = await fetch(`${REVIEW_API_BASE}/${reviewName}/reply`, {
        method: 'PUT', // or POST? Usually PUT for update/create reply
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment: replyText
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to reply: ${await response.text()}`);
    }

    return await response.json();
}
