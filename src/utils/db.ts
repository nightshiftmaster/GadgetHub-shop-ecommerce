const { default: mongoose } = require("mongoose");

const connection = { isConnected: false };

export const connect = async () => {
  try {
    if (connection?.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);

    connection.isConnected = db.connections[0].readyState;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
