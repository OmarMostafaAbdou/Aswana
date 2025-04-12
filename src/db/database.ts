// db/Database.ts
import mongoose from 'mongoose';



const {DbUrl}=require("../Configs/Configs")

export default class Database {
  private static instance: Database;
  private readonly uri: string = DbUrl || 'mongodb://127.0.0.1:27017/Aswana';

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log('MongoDB connected successfully ✅');
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    console.error('MongoDB connection error ❌:', error);
    process.exit(1); 
  }
}
