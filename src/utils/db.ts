const { default: mongoose } = require("mongoose");

const connection = { isConnected: false };

//@Todo: vlad medvede - не в коем случае не храни пароль и желательно и имя db сервера в хардкоде!,
//@Todo: не важно что это тестовый проект ткое увидят пройдут мимо сразу используй
// `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.lrcjkhf.mongodb.net/shop_database?retryWrites=true&w=majority`
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
// создай файл .env.local и добавь туда переменные окружения файл добавь в .gitignore
// хочешь в readme.md укажи эти данные но как я понял для прода и так ты не используешь эту базу
/// так точно делать нельзя звалят сразу =))
export const connect = async () => {
  try {
    if (connection?.isConnected) {
      return;
    }
    const db = await mongoose.connect(
      `mongodb+srv://nightshiftmaster:Vlad19820708@cluster0.lrcjkhf.mongodb.net/shop_database?retryWrites=true&w=majority`
    );

    connection.isConnected = db.connections[0].readyState;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
