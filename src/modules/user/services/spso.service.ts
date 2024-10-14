import { Inject, Injectable } from "@nestjs/common";
import { SPSO_REPOSITORY } from "src/common/contants";
import { SPSO } from "../spso.entity";
import { UUID } from "crypto";

@Injectable()
export class SpsoService {
    constructor(@Inject(SPSO_REPOSITORY) private readonly spsoRepository: typeof SPSO) {}

    async updateLastLogin(id: UUID) {
        return this.spsoRepository.update({
            lastLogin: new Date()
        }, { where: { id }});
    }

    async findOneById(id: UUID) {
        const spso = await this.spsoRepository.findByPk(id);
        if (spso) {
            delete spso.dataValues.password;
            return spso.dataValues;
        }

        return null;
    }
}