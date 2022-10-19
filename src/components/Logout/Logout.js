import { useEffect, useContext } from "react";
import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { auth, onLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout(auth.accessToken)
        .then(() => {
            onLogout();
            navigate('/');
        })
        .catch(() => {
            navigate('/');
        })
    });

    return null;
}