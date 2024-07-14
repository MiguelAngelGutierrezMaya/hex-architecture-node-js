import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options): Promise<boolean> {
        const {dbName, mongoUrl} = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            })

            console.log('Connected to the database')
            return true
        } catch (error) {
            console.error(error)
            throw new Error('Error connecting to the database')
        }
    }
}