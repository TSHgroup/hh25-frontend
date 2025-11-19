import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { authenticatedFetch } from "../../utils/api";

interface DashboardNavbarProps {
    onMenuClick: () => void;
}

interface UserResponse {
    account: {
        _id: string;
        email: string;
        emailVerified: boolean;
        name: {
            givenName: string;
            familyName: string;
            _id: string;
        };
    };
    profile: {
        _id: string;
        account: string;
        displayName: string;
        language: string;
        goals: string[];
        createdAt: string;
        updatedAt: string;
    };
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await authenticatedFetch('/api/v1/user/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const getDisplayName = () => {
        if (!userData?.account) return 'User';
        const { givenName, familyName } = userData.account.name;
        return `${givenName} ${familyName}`;
    };

    const getInitials = () => {
        if (!userData?.account) return 'U';
        const { givenName, familyName } = userData.account.name;
        return `${givenName.charAt(0)}${familyName.charAt(0)}`.toUpperCase();
    };

    const getEmail = () => {
        return userData?.account?.email || '';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-lg hover:bg-gray-100 transition md:hidden"
                        aria-label="Toggle sidebar">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">OdpalGadkę</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                            {loading ? (
                                <div className="hidden md:block text-right">
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ) : userData ? (
                                <div className="hidden md:block text-right">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {getDisplayName()}
                                    </div>
                                    <div className="text-xs text-gray-500">{getEmail()}</div>
                                </div>
                            ) : null}
                            <div
                                className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition">
                                {loading ? '...' : getInitials()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;