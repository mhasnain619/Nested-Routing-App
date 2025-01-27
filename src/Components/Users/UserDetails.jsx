import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Button, Grid } from '@mui/material';
import userImg from '../../assets/userimg.png';

import {
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon,
    Language as LanguageIcon,
} from '@mui/icons-material';
import './UserDetails.css';

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        getData();
    }, [id]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-details-container">
            <Card className="user-card">
                <Grid container spacing={3}>
                    {/* User Avatar and Basic Info */}
                    <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                        <Avatar alt={userData.name} src={userImg} className="user-avatar" />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h3" fontWeight="bold">
                            {userData.name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {userData.username} | {userData.company.name}
                        </Typography>
                        <Grid container spacing={2} marginTop={0}>
                            <Grid item>
                                <Button variant="contained" color="primary" size="medium" className="public-profile-btn">
                                    View Public Profile
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" size="medium" className="send-message-btn">
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Additional User Details */}
                <CardContent className="card-content">
                    <Grid container spacing={1}>
                        {/* Company Details */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="section-title">
                                🏢 Company Details:
                            </Typography>
                            <Typography variant="body2" className="section-detail">
                                <BusinessIcon className="section-icon" fontSize="small" />
                                {userData.company.name}
                            </Typography>
                            <Typography variant="subtitle1">{userData.company.catchPhrase}</Typography>
                        </Grid>

                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="section-title">
                                🌐 Contact Information:
                            </Typography>
                            <Typography variant="body2" className="section-detail">
                                <EmailIcon className="section-icon" fontSize="small" />
                                {userData.email}
                            </Typography>
                            <Typography variant="body2" className="section-detail">
                                <PhoneIcon className="section-icon" fontSize="small" />
                                {userData.phone}
                            </Typography>
                            <Typography variant="body2" className="section-detail">
                                <LanguageIcon className="section-icon" fontSize="small" />
                                {userData.website}
                            </Typography>
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="section-title">
                                📍 Address:
                            </Typography>
                            <Typography variant="body2" className="section-detail">
                                <LocationOnIcon className="section-icon" fontSize="small" />
                                {`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDetails;
