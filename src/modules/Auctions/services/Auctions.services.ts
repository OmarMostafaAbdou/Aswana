import { injectable } from "tsyringe";
import AuctionModel, { IAuction } from "../model/Auction.model";
import { auctionData } from "types/user";

injectable()
class AuctionService {

  async createAuction(data:auctionData): Promise<IAuction> {
    const {
        

     
    } = data;     

    const auction= new AuctionModel({
    });
 
     await auction.save();
    return auction;
  }


  async getAuctionById(id: string) {
  }

  async updateAuction(id: string, updateData: any) {
  }

  async deleteAuction(id: string) {
  }

  async getAllAuctions() {
  }
}