import { userMutations } from './types/user.schema';
import { personMutations } from './types/person.schema';
import { qualificationsMutations } from './types/qualifications.schema';

const Mutation = `
    type Mutation {
        ${userMutations},
        ${personMutations},
        ${qualificationsMutations}             
    }
`;

export { Mutation };
