const userObjectConstructor = (profile) => {
    return {
        [profile.googleId]: {    
            googleId: profile.googleId,
            role: 'user',
            profile: {
                imageUrl:   profile.imageUrl,
                email:      profile.email,
                name:       profile.name,
                givenName:  profile.givenName,
                familyName: profile.familyName
            },
            devices: {
                laptops: {},
                monitors: {}
            }
        }
    }
}

export default userObjectConstructor;