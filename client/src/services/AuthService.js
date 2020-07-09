export default {
    login: (user) => {
        return fetch("/user/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status !== 400 || res.status !== 401) {
                    return res.json();
                } else {
                    return res.json({
                        message: { msgBody: "Error" },
                        msgError: true,
                    });
                }
            })
            .then((data) => data);
    },
    register: (user) => {
        return fetch("/user/signup", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data);
    },
    logout: () => {
        return fetch("/user/logout")
            .then((res) => res.json())
            .then((data) => data);
    },

    isAuthenticated: () => {
        return fetch("/user/authenticated").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return {
                    isAuthenticated: false,
                    user: { username: "" },
                };
            }
        });
    },

    getUsertype: (username) => {
        return fetch(`/user/usertype/${username}`).then((res) => {
            return res.json().then((data) => {
                console.log(data.usertype);
                return data.usertype;
            });
        });
    },

    getLastLogin: (username) => {
        console.log(username);
        return fetch(`/user/lastlogin/${username}`).then((res) => {
            return res.json().then((data) => {
                console.log(data.lastlogin);
                return data.lastlogin;
            });
        });
    },
};
