class Navigate {
    static getBaseUrl () {
        let getUrl = window.location;
        return (getUrl.protocol + "//" + getUrl.host);
    }

    static navigateTo (route) {
        window.location.href = Navigate.getBaseUrl() + "/" + route;
    }
}