 export const dataForCreatingEmployee = {
    departments: [],
    heads: [],
    positions: [],
    rights: []
};


// export default function (state, action) {
//     switch (action.type) {
//         case 'add':
//             return [...state, action.payload]

//         default:
//             return state
//     }
// }


export default function (state, action) {
    switch (action.type) {
        case 'add_departments':
            return [...state, action.payload]

        default:
            return state
    }
}