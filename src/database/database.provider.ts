import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../common/contants';
import { databaseConfig } from './database.config';
import { Customer } from 'src/modules/user/customer.entity';
import { SPSO } from 'src/modules/user/spso.entity';
import { Printer } from 'src/modules/printer/printer.entity';
import { Document } from 'src/modules/document/document.entity';
import { Feedback } from 'src/modules/feedback/feedback.entity';
import { SPSPOnFeedback } from 'src/modules/feedback/spso_on_feedback.entity';
import { PrintingOrder } from 'src/modules/printing_order/printing_order.entity';
import { PurchasingPagesOrder } from 'src/modules/purchasing_pages_order/purchasing_pages_order.entity';
import { PrinterLocation } from 'src/modules/printer/printer_location.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([SPSO, Customer, Printer, Document, Feedback, SPSPOnFeedback, PrintingOrder, PurchasingPagesOrder, PrinterLocation]);
      await sequelize.sync();

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        await sequelize.sync();
        console.log('Database synchronized successfully');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      
      return sequelize;
    },
  },
];
