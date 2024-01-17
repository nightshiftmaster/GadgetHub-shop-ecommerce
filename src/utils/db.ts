const { default: mongoose } = require("mongoose");

const connection = { isConnected: false };

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
