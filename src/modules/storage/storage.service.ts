import { ConflictException, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { UUID } from "crypto";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
    remove(path: string) {
        try {
            fs.unlinkSync(path);
        } catch (error) {
            console.log(`Path ${path} does not exist`);
        }
    }

    save(path: string, file: Express.Multer.File) {
        // if (!fs.existsSync(path)) {
        //     throw new ConflictException('Đường dẫn không tồn tại');
        // }

        fs.writeFileSync(path, file.buffer);
    }

    generateFileName(originalName: string) {
        return Date.now().toString() + '_' + originalName;
    }

    async getFileByPath(filePath: string): Promise<StreamableFile> {
        const fullPath = path.join(process.cwd(), filePath);

        if (!fs.existsSync(fullPath)) {
            throw new NotFoundException('File does not exist');
        }

        const fileStream = fs.createReadStream(fullPath);
        return new StreamableFile(fileStream);
    }
}