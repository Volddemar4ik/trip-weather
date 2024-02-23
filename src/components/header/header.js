import React, { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../../requests'
import './style.css'

export default function Header() {
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})

    async function getUserGoogleProfileData(token) {
        const res = await googleAuth(token)

        if (res?.id) {
            setProfile(res)
        }
    }

    const loginGoogleAuth = useGoogleLogin({
        onSuccess: tokenResponse => setUser(tokenResponse),
        onError: error => console.log('Login Failed:', error),
    })

    function logouthGoogleAuth() {
        googleLogout()
        setProfile({})
        localStorage.removeItem('googleAuthToken')
    }

    useEffect(() => {
        const localToken = localStorage.googleAuthToken

        if (!localToken && user.access_token) {
            localStorage.setItem('googleAuthToken', JSON.stringify(user?.access_token))
            getUserGoogleProfileData(user?.access_token)
        }

        if (localToken) {
            getUserGoogleProfileData(JSON.parse(localToken))
        }
    }, [user])

    return (
        <div className="header">
            {profile?.id
                ? <Avatar
                    profile={profile}
                    logouthGoogleAuth={logouthGoogleAuth}
                />
                : <Login loginGoogleAuth={loginGoogleAuth} />
            }
        </div>
    )
}

function Login({ loginGoogleAuth }) {

    return (
        <button
            className="button__login"
            onClick={loginGoogleAuth}
        >
            <span className="material-symbols-outlined">
                person
            </span>

            <p>login</p>
        </button>
    )
}

function Avatar(props) {
    const { profile, logouthGoogleAuth } = props

    return (
        <button
            className="avatar"
            onClick={logouthGoogleAuth}
            title='Logout'
        >
            {profile?.id &&
                <div className="avatar__name">
                    <p>Hello, {profile?.given_name}</p>

                    <span>(click for logout)</span>
                </div>
            }

            <img
                src={profile?.picture}
                alt={profile?.name}
            />
        </button>
    )
}