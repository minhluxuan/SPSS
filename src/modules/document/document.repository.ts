import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Document } from './document.entity';
import { SEQUELIZE } from 'src/common/contants';
import { Sequelize } from 'sequelize';
import { Customer } from '../user/customer.entity';

@Injectable()
export class DocumentRepository {
  private documentModel: typeof Document;
  private customerModel: typeof Customer

  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {
    this.documentModel = this.sequelize.model('Document') as typeof Document;
    this.customerModel = this.sequelize.model('Customer') as typeof Customer;
  }

  async getDocumentById(id: string): Promise<Document | null> {
    try {
      return await this.documentModel.findByPk(id)
    } catch (error) {
      console.error('Error at DocumentRepository.getDocumentById', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDocumentsByPage(pageSize: number, offset: number): Promise<Document[]> {
    try {
      return await this.documentModel.findAll(
        {
          limit: pageSize,
          offset: offset
        }
      )
    } catch (error) {
      console.error('Error at DocumentRepository.getDocumentsByPage', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createDocument(data: Partial<Document>): Promise<Document> {
    try {
      return await this.documentModel.create(data);
    } catch (error) {
      console.error('Error at DocumentRepository.createDocument', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateDocument(availableDocument: Document, data: Partial<Document>): Promise<Document> {
    try {
      availableDocument.update(data);
      return availableDocument;
    } catch (error) {
      console.error('Error at DocumentRepository.updateDocument', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      await this.documentModel.destroy({ where: { id } });
    } catch (error) {
      console.error('Error at DocumentRepository.deleteDocument', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUser(id:string): Promise<any> {
    try {
      return this.customerModel.findByPk(id)
    } catch (error) {
      console.error('Error at DocumentRepository.findUser', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}