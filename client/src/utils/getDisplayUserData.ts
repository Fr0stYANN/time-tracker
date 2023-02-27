// import {User} from 'types/userTypes';
//
// export type DisplayUserType = {
//     key: number
//     firstname: string
//     lastname: string
//     email: string
//     employmentDate?: string
//     workType: string
// }
//
// export type DataIndex = keyof DisplayUserType;
//
// const getDisplayUserData = (users: User[]): DisplayUserType[] => {
//     const displayData: DisplayUserType[] = [];
//
//     for (const user of users) {
//         displayData.push({
//             key: user.id,
//             firstname: user.firstname,
//             lastname: user.lastname,
//             email: user.email,
//             employmentDate: user.employmentDate,
//             workType: user.workType.name
//         });
//     }
//
//     return displayData;
// }
//
// export default getDisplayUserData;
