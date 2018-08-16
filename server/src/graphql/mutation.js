import { userMutations } from './types/user.schema';
import { clienteMutations } from './types/cliente.schema';
import { frotaMutations } from './types/frota.schema';
import { grupoItemMutations } from './types/grupoitem.schema';
import { itensMutations } from './types/itens.schema';

const Mutation = `
    type Mutation {
        ${userMutations},
        ${clienteMutations},
        ${frotaMutations},
        ${grupoItemMutations},
        ${itensMutations}
    }
`;

export { Mutation };
