

export async function fetchProfile(profileId) {
    return fetch(`/api/profile/${profileId}`, {mode: "cors"})
    .then(res => res.json());
}