import { userMutations } from "./types/user.schema";
import { clienteMutations } from "./types/cliente.schema";
import { frotaMutations } from "./types/frota.schema";
import { grupoItemMutations } from "./types/grupoitem.schema";
import { itensMutations } from "./types/itens.schema";
import { uploadMutations } from "./types/upload.schema";
import { vistoriaMutations } from "./types/vistoria.schema";

const Mutation = `
    type Mutation {
        ${userMutations},
        ${clienteMutations},
        ${frotaMutations},
        ${grupoItemMutations},
        ${itensMutations},
        ${uploadMutations},
        ${vistoriaMutations}
    }
`;

export { Mutation };
