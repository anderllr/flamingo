import { userQueries } from "./types/user.schema";
import { frotaQueries } from "./types/frota.schema";
import { clienteQueries } from "./types/cliente.schema";
import { grupoItemQueries } from "./types/grupoitem.schema";
import { itensQueries } from "./types/itens.schema";

const Query = `
    type Query {
        ${userQueries},
        ${frotaQueries},
        ${clienteQueries},
        ${grupoItemQueries},
        ${itensQueries}
    }
`;

export { Query };
