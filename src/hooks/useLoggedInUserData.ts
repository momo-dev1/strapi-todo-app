import { useState, useEffect } from 'react';

interface IUserData {
    jwt: string;
}

const useLoggedInUserData = () => {
    // State to store user data
    const [userData, setUserData] = useState<IUserData>({ jwt: "" });

    useEffect(() => {
        // Function to retrieve user data from localStorage
        const getLoggedInUserData = () => {
            const userDataString = localStorage.getItem("loggedInUser");
            const parsedUserData = userDataString ? JSON.parse(userDataString) : null;
            setUserData(parsedUserData);
        };

        // Initial call to get user data when the component mounts
        getLoggedInUserData();

        // Subscribe to changes in "loggedInUser" localStorage key
        window.addEventListener('storage', getLoggedInUserData);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', getLoggedInUserData);
        };
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

    // Return the user data
    return userData;
};

export default useLoggedInUserData;
