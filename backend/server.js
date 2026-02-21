const app = require('./app');
const env = require('./config/env');
const { sequelize, Role } = require('./models');
const roles = require('./utils/roles');

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();

  for (const name of Object.values(roles)) {
    await Role.findOrCreate({ where: { name } });
  }

  app.listen(env.port, () => {
    console.log(`SmartSchool ERP API running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Boot failure', error);
  process.exit(1);
});
