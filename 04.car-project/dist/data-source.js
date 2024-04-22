"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map