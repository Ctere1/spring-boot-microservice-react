export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        // For Spring Boot back-end
        return { Authorization: "Bearer " + user.accessToken };

    } else {
        return {};
    }
}