import { userQueries } from './types/user.schema';
import { personQueries } from './types/person.schema';
import { qualificationsQueries } from './types/qualifications.schema';

const Query = `
    type Query {
        ${userQueries},
        ${personQueries},
        ${qualificationsQueries}                
    }
`;

export { Query };
