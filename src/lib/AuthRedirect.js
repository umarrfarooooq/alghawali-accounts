import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VerifyStaffToken } from '@/lib/VerifyStaffToken'
import CustomLoading from '@/components/ui/CustomLoading';

const AuthRedirect = ({ children, requireAuth, redirectTo }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { valid } = await VerifyStaffToken();
            setIsAuthenticated(valid);

            if (requireAuth && !valid) {
                router.push('/login');
            } else if (!requireAuth && valid) {
                router.push(redirectTo || '/');
            }
        };

        checkAuth();
    }, [router, requireAuth, redirectTo]);

    if (isAuthenticated === null) {
        return <div><CustomLoading fullScreen={true}/></div>;
    }

    return (requireAuth === isAuthenticated) ? children : null;
}

export default AuthRedirect;