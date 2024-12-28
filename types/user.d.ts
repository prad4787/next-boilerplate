// {
//     "message": "Logged in successfully",
//     "data": {
//         "access_token": "17|MwfXIhHXHzourXCjDmCiVuDXYmb0fT8fw3BbTJtJa55af075",
//         "refresh_token": "18|h4qQ3LngnyvsuPlLpGvuStbEL8PHnEifU0k9kZmGbbe7f357",
//         "type": "Bearer",
//         "user": {
//             "id": 1,
//             "full_name": "admin",
//             "email": "admin@gmail.com",
//             "email_verified_at": null,
//             "profile_image": null,
//             "created_at": null,
//             "updated_at": null
//         }
//     }
// }

export interface AuthUser {
    id: string;
    full_name: string;
    email: string;
    email_verified_at: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
}